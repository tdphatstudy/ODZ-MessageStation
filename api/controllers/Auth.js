const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const AuthController = {
    login: async(req, res, next) => {
        try {
            const {username, password} = req.body;
            if (!username) 
                return res.status(400).json({success: false, message: 'Vui lòng không bỏ trống Username.'});
            if (!password) 
                return res.status(400).json({success: false, message: 'Vui lòng không bỏ trống Password.'});
            const hassPassword = await argon2.hash(password);
            const existUser = await User.find({username: username, password: hassPassword});
            if (!existUser) 
                return res.status(400).json({success: false, message: 'Username hoặc Password sai! Vui lòng kiểm tra lại!'});
            const accessToken = jwt.sign({userId: existUser._id}, process.env.ACCESS_TOKEN_SECRET)
            if (existUser.account_status === "lock")
                return res.status(400).json({success: false, message: 'Tài khoản của bạn đã bị khóa! Liên hệ với chúng tôi để biết thêm chi tiết.'});
            if (existUser.account_status === "inactivity")
                return res.cookie('auth_token', accessToken,{httpOnly: true, sameSite: 'strict'}).status(200).json({success: true, message: 'Đăng nhập lần đầu!'});
            if (existUser.account_status === "activity")
                return res.cookie('auth_token', accessToken,{httpOnly: true, sameSite: 'strict'}).status(200).json({success: true, message: 'Đăng nhập thành công!'});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Interval server error!'});
        }
    }, 
    register: async(res, req, next) => {
        try {
            const {fullname, username, password, repassword, gmail} = req.body;
            if (!username || !password) 
                return res.status(400).json({success: false, messenge: 'Quên thông tin username hoặc password.'});
            if (!fullname) 
                return res.status(400).json({success: false, messenge: 'Họ & Tên là trường bắt buộc.'});
            if (password != repassword) 
                return res.status(400).json({success: false, messenge: 'Password và repassword không trùng khớp'});
            const gmailValidate  = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com*$/;
            if (!gmailValidate.test(gmail)) 
                return res.status(400).json({success: false, messenge: 'Gmail không hợp lệ!'});
            const existUser = await User.findOne({username: username});
            if (existUser) return res.status(400).json({success: false, messenge: "Username đã tồn tại!"});
            const existGmail = await User.findOne({gmail: gmail});
            if (existGmail) return res.status(400).json({success: false, messenge: "Gmail đã tồn tại!"});
            const hashPass = await sercurityTools.hash(password);
            console.log(hashPass);
            const newUser = new User({
                fullname,
                username,
                password: hashPass,
                gmail
            });
            await newUser.save();
            res.status(200).json({sucess: true, messenge: "Đăng ký thành công. Vui lòng vào gmail để xác nhận."});

        }catch(error) {  
            console.log(error);
            return res.status(500).json({success: false, messenge: 'Internal server error'});
        }
    }

} 
module.exports = AuthController;