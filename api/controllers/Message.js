const Message = require('../models/Message.js');
const User = require('../models/User.js');
const GroupChat = require('../models/GroupChat.js');

const MessageController = {
    create: async (req, res, next) => {
        try {
            const {senderId, revGroupId, text, attachments} = req.body;
            const existSender = await User.findById(senderId);
            if (!existSender) 
                return res.status(400).json({success: false, message:"Người gửi tin nhắn không tồn tại."});
            const existGroupChat = await GroupChat.findById(revGroupId);
            if (!existGroupChat) 
                return res.status(400).json({success: false, message:"Nhóm nhận tin nhắn không tồn tại."});
            if (text.trim() == "") 
                return res.status(400).json({success: false, message:"Nội dung tin nhắn rỗng."});
            const newMessage = new Message({
                revGroupId: revGroupId,
                senderId: senderId,
                text: text,
                attachments: attachments
            });
            await newMessage.save();
            res.status(200).json({success: true, message: "Tạo tin nhắn thành công"});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Interval server error!"});
        }
    },
    changeReadStatus:  async (req, res, next) => {
        try {
            const {messageId} = req.body;
            let existMessage = Message.findById(messageId);
            if (!existMessage) 
                return res.status(400).json({success: false, message:"Tin nhắn không tồn tại."});
            const {senderId, revGroupId, ...other} = existMessage; 
            const existSender = await User.findById(senderId);
            if (!existSender) 
                return res.status(400).json({success: false, message:"Người gửi tin nhắn không tồn tại."});
            const existGroupChat = await GroupChat.findById(revGroupId);
            if (!existGroupChat) 
                return res.status(400).json({success: false, message:"Nhóm nhận tin nhắn không tồn tại."});
            existMessage.isRead=true;
            await existMessage.save();
            res.status(200).json({success: true, message: "Cập nhật trạng thái đã xem thành công"});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Interval server error!"});
        }
    },
    changeVisible: async (req, res, next) => {
        try {
            const {messageId, visiblestatus} = req.body;
            let existMessage = Message.findById(messageId);
            if (!existMessage) 
                return res.status(400).json({success: false, message:"Tin nhắn không tồn tại."});
            const {senderId, revGroupId, ...other} = existMessage; 
            const existSender = await User.findById(senderId);
            if (!existSender) 
                return res.status(400).json({success: false, message:"Người gửi tin nhắn không tồn tại."});
            const existGroupChat = await GroupChat.findById(revGroupId);
            if (!existGroupChat) 
                return res.status(400).json({success: false, message:"Nhóm nhận tin nhắn không tồn tại."});
            existMessage.visible_status = visiblestatus
            await existMessage.save();
            res.status(200).json({success: true, message: "Cập nhật trạng thái hiển thị thành công"});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Interval server error!"});
        }
    },
    getByGroupChat: async(req, res, next) => {
        try {
            const existGroupChat = await GroupChat.findById(req.params.groupId);
            if (!existGroupChat) 
                return res.status(400).json({success: false, message:"Group chat không tồn tại."});
            const historyMessage = await Message.find({revGroupId: groupId, visible_status: 'visible'}).sort({createdAt: -1}).skip(0+(req.params.page*200)).limit(200).populate("senderId", "fullname avatar")
            res.status(200).json({success: true, historyMessage})
        }catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Interval server error!"});
        }
    }
};
module.exports = MessageController;