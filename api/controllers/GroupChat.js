const express = require('express');
const router = express.Router();
const GroupChat = require('../models/GroupChat.js');
const User = require("../models/User.js");

const GroupChatController = {
    createRelationshipGroup: async(req, res, next) => {
        try {
            const {user1, user2} = req.body;
            const existUser1 = await User.findById(user1);
            if (!existUser1) 
                return res.status(400).json({success: false, messenge: `${existUser1.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser1.account_status != "activity") 
                return res.status(400).json({success: false, messenge: `Tài khoản ${existUser1.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`});
            const existUser2 = await User.findById(user2);
            if (!existUser2) 
                return res.status(400).json({success: false, messenge: `${existUser2.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser2.account_status != "activity") 
                return res.status(400).json({success: false, messenge: `Tài khoản ${existUser2.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`});
            const relationshipGroup = new GroupChat({
                name: {name_type: 'refs'},
                avatar: 'default.png',
                members: [user1, user2]
            });
            relationshipGroup.save();
            res.status(200).
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: "Interval server error!"})
        }
    },
}