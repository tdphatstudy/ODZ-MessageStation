const GroupChat = require('../models/GroupChat.js');
const User = require("../models/User.js");

const GroupChatController = {
    createRelationshipGroup: async(req, res, next) => {
        try {
            const {user1, user2} = req.body;
            const existUser1 = await User.findById(user1);
            if (!existUser1) 
                return res.status(400).json({success: false, message: `${existUser1.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser1.account_status != "activity") 
                return res.status(400).json({success: false, message: `Tài khoản ${existUser1.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`});
            const existUser2 = await User.findById(user2);
            if (!existUser2) 
                return res.status(400).json({success: false, message: `${existUser2.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser2.account_status != "activity") 
                return res.status(400).json({success: false, message: `Tài khoản ${existUser2.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`});
            const relationshipGroup = new GroupChat({
                name: {name_type: 'refs'},
                avatar: 'default.png',
                members: [user1, user2]
            });
            await relationshipGroup.save();
            res.status(200).json({success: false, message: "Tạo relationship group thành công!"});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Interval server error!"})
        }
    },
    createPublicGroup: async(req, res, next) => {
        try {
            const {nameGroup, avatarUri, members, host} = req.body;
            members.forEach(async(element) => {
                let existUser = await User.findById(element);
                if (!existUser) 
                    return res.status(400).json({success: false, message: `${existUser.fullname} không tồn tại để thực hiện thao tác này.`});
                if (existUser.account_status != "activity") 
                    return res.status(400).json({success: false, message: `Tài khoản ${existUser.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`}); 
            });
            const publicGroup = new GroupChat({
                name: {name_type: 'normal', content_name: nameGroup},
                avatar: avatarUri,
                members: members,
                admins: [host],
                type: "Public"
            });
            await publicGroup.save();
            res.status(200).json({success: false, message: "Tạo public group thành công!"});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Interval server error!"})
        }
    }, 
    addMember: async(req, res, next) => {
        try{
            const {groupid, newMember} = req.body;
            let existGroup = await GroupChat.findById(groupid);
            if (!existGroup) 
                return res.status(400).json({success: false, message: `Nhóm không tồn tại để thực hiện thao tác này.`})
            if (existGroup.type != "Public") 
                return res.status(400).json({success: false, message: `Nhóm không phải là Public để thực hiện thao tác này.`})
            const existUser = await User.findById(newMember);
            if (!existUser) 
                return res.status(400).json({success: false, message: `${existUser.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser.account_status != "activity") 
                return res.status(400).json({success: false, message: `Tài khoản ${existUser.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`}); 
            existGroup.members.push(newMember);
            await existGroup.save();
            res.status(200).json({success: false, message: "Thêm user vào group thành công!"});
        } catch(error) {
            console.log(error);
            res.status(500).json({success: false, message: "Interval server error!"})
        }
    },
    addAdmin: async(req, res, next) => {
        try{
            const {groupid, newAdmin} = req.body;
            let existGroup = await GroupChat.findById(groupid);
            if (!existGroup) 
                return res.status(400).json({success: false, message: `Nhóm không tồn tại để thực hiện thao tác này.`})
            if (existGroup.type != "Public") 
                return res.status(400).json({success: false, message: `Nhóm không phải là Public để thực hiện thao tác này.`})
            const existUser = await User.findById(newAdmin);
            if (!existUser) 
                return res.status(400).json({success: false, message: `${existUser.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser.account_status != "activity") 
                return res.status(400).json({success: false, message: `Tài khoản ${existUser.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`}); 
            const existMember = existGroup.members.some((value) => {
                return value == newAdmin;
            });
            if (existMember == false) 
                return res.status(400).json({success: false, message: `${existUser.fullname} không phải là thành viên của group.`});
            existGroup.admins.push(newAdmin);
            await existGroup.save();
            res.status(200).json({success: false, message: "Thêm user vào group thành công!"});
        } catch(error) {
            console.log(error);
            res.status(500).json({success: false, message: "Interval server error!"})
        }
    }
}
module.exports = GroupChatController;