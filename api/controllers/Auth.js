const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const sendEmail = require('../helper/Email/Email.js');
const StringHandle = require('../helper/StringHandle/StringHandle.js');
const UserResoureManager = require('../helper/UserResoureManager/UserResoureManager.js');

const AuthController = {

    login: async(req, res, next) => {
        try {
            
            const {username, password} = req.body;
            
            
            if (!username) 
                return res.status(400).json({success: false, message: 'Vui lòng không bỏ trống Username.'});
            if (!password) 
                return res.status(400).json({success: false, message: 'Vui lòng không bỏ trống Password.'});
            
            const existUser = await User.findOne({username: username});
            if (!existUser) 
                return res.status(400).json({success: false, message: 'Username không tồn tại! Vui lòng kiểm tra lại!'});
            const confirmPwd = await argon2.verify(existUser.password, password);
            if (!confirmPwd) 
                return res.status(400).json({success: false, message: 'Mật khẩu sai! Vui lòng kiểm tra lại!'});
            const accessToken = jwt.sign({userId: existUser._id, username: existUser.username}, process.env.ACCESS_TOKEN_SECRET)
            if (existUser.account_status === "lock")
                return res.status(400).json({success: false, message: 'Tài khoản của bạn đã bị khóa! Liên hệ với chúng tôi để biết thêm chi tiết.'});
            if (existUser.account_status === "inactivity"){
                delete existUser.created_at;
                delete existUser.update_at;
                delete existUser.device_manager;
                delete existUser.password;
                delete existUser.old_passwords;
                delete existUser.auth_code;
                delete existUser._id;
                return res.cookie('auth_token', accessToken,{httpOnly: true, sameSite: 'strict'}).status(200).json({success: true, message: 'Đăng nhập lần đầu!', user: existUser});
            }
            
            if (existUser.account_status === "active")
                return res.cookie('auth_token', accessToken,{httpOnly: true, sameSite: 'strict'}).status(200).json({success: true, message: 'Đăng nhập thành công!'});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Interval server error!'});
        }
    }, 
    register: async(req, res, next) => {
        try {
            const {fullname, username, password, repassword, gmail} = req.body;
            if (!username || !password) 
                return res.status(400).json({success: false, message: 'Quên thông tin username hoặc password.'});
            if (!fullname) 
                return res.status(400).json({success: false, message: 'Họ & Tên là trường bắt buộc.'});
            if (password != repassword) 
                return res.status(400).json({success: false, message: 'Password và repassword không trùng khớp'});
            const gmailValidate  = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com*$/;
            if (!gmailValidate.test(gmail)) 
                return res.status(400).json({success: false, message: 'Gmail không hợp lệ!'});
            const existUser = await User.findOne({username: username});
            if (existUser) return res.status(400).json({success: false, message: "Username đã tồn tại!"});
            const existGmail = await User.findOne({gmail: gmail});
            if (existGmail) return res.status(400).json({success: false, message: "Gmail đã tồn tại!"});
            const hashPass = await argon2.hash(password);
            const auth_code = StringHandle.randomString(12);
            const newUser = new User({
                fullname,
                username,
                password: hashPass,
                gmail,
                auth_code
            });
            await newUser.save();
            await UserResoureManager.createUserResoureDirectory(newUser.username);
            const data = {fullname, auth_code}
            await sendEmail(newUser.gmail, 'register' ,data);
            res.status(200).json({sucess: true, message: "Đăng ký thành công. Vui lòng vào gmail để xác nhận."});

        }catch(error) {  
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    forgetPassword: async(req, res, next) => {
        try {
            const {username, gmail} = req.body;
            if (username =="" || gmail == '')
                return res.status(400).json({success: false, message: "Vui lòng không bỏ trống Username hoặc Gmail"})
            let existUser = await User.findOne({username: username, gmail: gmail});
            if (!existUser)
                return res.status(400).json({success: false, message: "Username và Gmail không trùng khớp"});
            const newPassword = StringHandle.randomString(16);
            const hashNewPass = await argon2.hash(newPassword);
            existUser.password = hashNewPass;
            existUser.update_at = new Date();
            await existUser.save();
            const data = {fullname: existUser.fullname, new_pass: newPassword};
            await sendEmail(existUser.gmail,'forget_password', data);
            return res.status(200).json({success: true, message: 'Mật khẩu mới đã được gửi vào gmail của bạn.'});
        }catch(error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    changePassword: async(req, res, next) => {
        try {
            const {username, newPassword, reNewPassword} = req.body;
            if (username!="" || newPassword!="" || reNewPassword!="")
                return res.status(400).json({success: false, message: "Vui lòng không bỏ trống các field"})
            let existUser = await User.findOne({username: username});
            if (!existUser)
                return res.status(400).json({success: false, message: "Tài khoản không tồn tại."});
            const hashNewPass = argon2.hash(newPassword);
            existUser.password = hashNewPass;
            existUser.update_at = new Date();
            await User.save();
            return res.status(200).json({success: true, message: 'Mật khẩu đã được cập nhật thành công.'});
        }catch(error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    confirmGmail: async(req, res, next) => {
        try {
            const {username ,auth_code} = req.body;
            const existUser = await User.findOne({username: username});
            if (!existUser) 
                return res.status(400).json({sucess: false, message: "Tài khoản không tồn tại."});
            if (auth_code != existUser.auth_code) 
                return res.status(400).json({sucess: false, message: "Mã xác nhận không đúng vui lòng thử lại."});
            existUser.auth_code = "";
            existUser.account_status = 'active';
            await existUser.save();
            res.status(200).json({sucess: false, message: "Xác nhận gmail thành công."});
        }catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        } 
    }, 
    me: async(req, res, next) => {
        try {
            const token = req.cookies.auth_token;
            if (!token) 
                return res.status(200).json({success: true, message: 'NO_TOKEN'});
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const existUser = await User.findOne({_id: decoded.userId, username: decoded.username});
            if (!existUser)
                return res.status(400).clearCookie('auth_token').json({success: false, message: 'Token có vấn đề vui lòng thử lại.'});
            if (existUser.account_status != 'active')
                return res.status(200).json({success: true, message: 'UNACTIVITY', user: existUser});
            
            let user = existUser.toObject();
            delete user.created_at;
            delete user.update_at;
            delete user.device_manager;
            delete user.password;
            delete user.old_passwords;
            delete user.auth_code;
            res.status(200).json({sucess: true, message: "SUCCESS", user: user});
        }catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        } 
    }, 
    
} 
module.exports = AuthController;