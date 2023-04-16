const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const sercurityTools = require("argon2");
const sendEmail = require('../helper/Email/Email.js');


const PasswordValidate = (password) => {
    const regexPass = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$';
    if (regexPass.test(password)) {
        return true;
    }
    return false
}


const UserController = {
    get: async(req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).json({success: true, message: "Lấy User thành công.", users});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    getByStatusAccount: async(req, res, next) => {
        try {
            if (!User.schema.path('account_status').enumValues.includes(req.params.status))
                return res.status(400).json({success: false, message: "Tham số không hợp lệ."});
            const users = await User.find({account_status: req.params.status});
            res.status(200).json({success: true, message: "Lấy User thành công.", users});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    getByOnlineStatus: async(req, res, next) => {
        try {
            if (!User.schema.path('online_status').enumValues.includes(req.params.status))
                return res.status(400).json({success: false, message: "Tham số không hợp lệ."});
            const users = await User.find({online_status: req.params.status});
            res.status(200).json({success: true, message: "Lấy User thành công.", users});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    getById: async(req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json({success: true, message: "Lấy User thành công.", user: user});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    create: async(req, res, next) => {
        try {
            const {fullname, username, password, repassword, gmail, role} = req.body;
            if (!username || !password) 
                return res.status(400).json({success: false, message: 'Quên thông tin username hoặc password.'});
            if (!fullname) 
                return res.status(400).json({success: false, message: 'Họ & Tên là trường bắt buộc.'});
            if (password != repassword) 
                return res.status(400).json({success: false, message: 'Password và repassword không trùng khớp'});
            if (!role || !User.schema.path('role').enumValues.includes(role)) {
                return res.status(400).json({success: false, message: "Role không phù hợp hoặc không tồn tại."});
            }
            const gmailValidate  = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com*$/;
            if (!gmailValidate.test(gmail)) 
                return res.status(400).json({success: false, message: 'Gmail không hợp lệ!'});
            const existUser = await User.findOne({username: username});
            if (existUser) return res.status(400).json({success: false, message: "Username đã tồn tại!"});
            const existGmail = await User.findOne({gmail: gmail});
            if (existGmail) return res.status(400).json({success: false, message: "Gmail đã tồn tại!"});
            const hashPass = await sercurityTools.hash(password);
            const newUser = new User({
                fullname,
                username,
                password: hashPass,
                gmail,
                role
            });
            await newUser.save();
            res.status(200).json({sucess: true, message: "Tạo tài khoản thành công. Vui lòng vào gmail để xác nhận."});
           

        }catch(error) {  
            console.log(error);
            return res.status(500).json({success: false, message: 'Internal server error'});
        }

    },
    changeRole: async (req, res, next) => {
        try {
            const {username, role} = req.body;
            if (!role || !User.schema.path('role').enumValues.includes(role)) {
                return res.status(400).json({success: false, message: "Role mới không phù hợp hoặc không tồn tại."});
            }
            let existUser = await User.findOne({username: username});
            if (!existUser) return res.status(404).json({success: false, message: `Tài khoản với username là ${username} không tồn tại.`});
            existUser.role = role;
            existUser.update_at = Date.now;
            await existUser.save();
            res.status(200).json({success: true, message: "Thay quyền thành công."})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error!"});
        }
    },
    changeAccountStatus: async (req, res, next) => {
        try {
            const {username, status} = req.body;
            if (!role || !User.schema.path('account_status').enumValues.includes(status)) {
                return res.status(400).json({success: false, message: "Status mới không phù hợp hoặc không tồn tại."});
            }
            let existUser = await User.findOne({username: username});
            if (!existUser) return res.status(404).json({success: false, message: `Tài khoản với username là ${username} không tồn tại.`});
            if (existUser.account_status === "inactivity" && status === 'active') 
                return res.status(400).json({success: false, message: "Tài khoản chỉ có thể kích hoạt thủ công bằng cách xác nhận qua mã xác nhận, được gửi thông qua gmail mà người dùng đã đăng ký."});
            const old_status = existUser.account_status;
            existUser.account_status = status;
            existUser.update_at = Date.now;
            await existUser.save();
            const data = {fullname: existUser.fullname};
            if (status === "lock") sendEmail(existUser.gmail,'lock', data);
            if (old_status === "lock" && status === 'active') sendEmail(existUser.gmail,'unlock', data);
            res.status(200).json({success: true, message: "Thay trạng thái tài khoản thành công."});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error!"});
        }
    }, 
    changeOnlineStatus: async (req, res, next) => {
        try {
            const {username, status} = req.body;
            if (!role || !User.schema.path('online_status').enumValues.includes(status)) {
                return res.status(400).json({success: false, message: "Status mới không phù hợp hoặc không tồn tại."});
            }
            let existUser = await User.findOne({username: username});
            if (!existUser) return res.status(404).json({success: false, message: `Tài khoản với username là ${username} không tồn tại.`});
            existUser.status = status;
            existUser.update_at = Date.now;
            await existUser.save();
            res.status(200).json({success: true, message: "Thay trạng thái thành công."});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error!"});
        }
    },
    updateInfo: async(req, res, next) => {
        try {
            const {username, gmail, zalo, fb, outlook, twitter, linkedin, github, phone} = req.body;
            let existUser = await User.findOne({username: username});
            if (!existUser) return res.status(404).json({success: false, message: `Tài khoản với username là ${username} không tồn tại.`});
            if (gmail) existUser.gmail = gmail;
            if (zalo) existUser.zalo = zalo;
            if (fb) existUser.fb = fb;
            if (outlook) existUser.outlook = outlook;
            if (twitter) existUser.twitter = twitter;
            if (linkedin) existUser.linkedin = linkedin;
            if (github) existUser.github = github;
            if (phone) existUser.phone = phone;
            await existUser.save();
            res.status(200).json({success: true, message: "Cập nhật thông tin thành công."});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error!"});
        }
    },
    updateAvatar: async(req, res, next) => {
        try {
            const {username, avatar} = req.body;
            let existUser = await User.findOne({username: username});
            if (!existUser) return res.status(404).json({success: false, message: `Tài khoản với username là ${username} không tồn tại.`});
            existUser.avatar = avatar;
            await existUser.save();

            res.status(200).json({success: true, message: "Cập nhật ảnh đại diện thành công."});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error!"});
        }
    }
}

module.exports = UserController;