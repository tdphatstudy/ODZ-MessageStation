const express = require('express');
const router = express.Router();
const Messenge = require('../models/Messenge.js');
const User = require('../models/User.js');
const GroupChat = require('../models/GroupChat.js');

const MessengeController = {
    create: async (req, res, next) => {
        try {
            const {senderId, revGroupId, text, attachments} = req.body;
            const existSender = await User.findById(senderId);
            if (!existSender) 
                return res.status(400).json({success: false, messenge:"Người gửi tin nhắn không tồn tại."});
            const existGroupChat = await GroupChat.findById(revGroupId);
            if (!existGroupChat) 
                return res.status(400).json({success: false, messenge:"Nhóm nhận tin nhắn không tồn tại."});
            if (text.trim() == "") 
                return res.status(400).json({success: false, messenge:"Nội dung tin nhắn rỗng."});
            const newMessage = new Messenge({
                revGroupId: revGroupId,
                senderId: senderId,
                text: text,
                attachments: attachments
            });
            await newMessage.save();
            res.status(200).json({success: true, messenge: "Tạo tin nhắn thành công"});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: "Interval server error!"});
        }
    },
    changeReadStatus:  async (req, res, next) => {
        try {
            const {messengeId} = req.body;
            let existMessenge = Messenge.findById(messengeId);
            if (!existMessenge) 
                return res.status(400).json({success: false, messenge:"Tin nhắn không tồn tại."});
            const {senderId, revGroupId, ...other} = existMessenge; 
            const existSender = await User.findById(senderId);
            if (!existSender) 
                return res.status(400).json({success: false, messenge:"Người gửi tin nhắn không tồn tại."});
            const existGroupChat = await GroupChat.findById(revGroupId);
            if (!existGroupChat) 
                return res.status(400).json({success: false, messenge:"Nhóm nhận tin nhắn không tồn tại."});
            existMessenge.isRead=true;
            await existMessenge.save();
            res.status(200).json({success: true, messenge: "Cập nhật trạng thái đã xem thành công"});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: "Interval server error!"});
        }
    },
    changeVisible: async (req, res, next) => {
        try {
            const {messengeId, visiblestatus} = req.body;
            let existMessenge = Messenge.findById(messengeId);
            if (!existMessenge) 
                return res.status(400).json({success: false, messenge:"Tin nhắn không tồn tại."});
            const {senderId, revGroupId, ...other} = existMessenge; 
            const existSender = await User.findById(senderId);
            if (!existSender) 
                return res.status(400).json({success: false, messenge:"Người gửi tin nhắn không tồn tại."});
            const existGroupChat = await GroupChat.findById(revGroupId);
            if (!existGroupChat) 
                return res.status(400).json({success: false, messenge:"Nhóm nhận tin nhắn không tồn tại."});
            existMessenge.visible_status = visiblestatus
            await existMessenge.save();
            res.status(200).json({success: true, messenge: "Cập nhật trạng thái hiển thị thành công"});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: "Interval server error!"});
        }
    },
    getByGroupChat: async(req, res, next) => {
        try {
            const existGroupChat = await GroupChat.findById(req.params.groupId);
            if (!existGroupChat) 
                return res.status(400).json({success: false, messenge:"Group chat không tồn tại."});
            const historyMessenge = await Messenge.find().sort({createdAt: -1}).skip(0+(req.params.page*200)).limit(200).populate("senderId", "fullname avatar")
            res.status(200).json({success: true, historyMessenge})
        }catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: "Interval server error!"});
        }
    }
};
module.exports = MessengeController;