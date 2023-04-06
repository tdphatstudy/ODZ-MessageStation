const express = require('express');
const router = express.Router();
const Relationship = require("../models/Relationship.js");
const { listenerCount } = require('../models/User.js');
const User = require("../models/User.js");

const relationshipController = {
    getAllByUser: async(req, res, next) => {
        try {
            const relationships = await Relationship.find({user1: req.params.id}).populate("user1").populate('user2');
            res.status(200).json({success: true, messenge: "Lấy Relationship thành công.", relationships});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: 'Internal server error'});
        }
    },
    getFriendByUser: async(req, res, next) => {
        try {
            const relationships = await Relationship.find({user1: req.params.id, status: 'friend'}).populate("user1").populate('user2');
            res.status(200).json({success: true, messenge: "Lấy Relationship thành công.", relationships});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: 'Internal server error'});
        }
    },
    getSendingByUser: async(req, res, next) => {
        try {
            const relationships = await Relationship.find({user1: req.params.id, status: 'sending'}).populate("user1").populate('user2');
            res.status(200).json({success: true, messenge: "Lấy Relationship thành công.", relationships});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: 'Internal server error'});
        }
    },
    getPendingByUser: async(req, res, next) => {
        try {
            const relationships = await Relationship.find({user1: req.params.id, status: 'pending'}).populate("user1").populate('user2');
            res.status(200).json({success: true, messenge: "Lấy Relationship thành công.", relationships});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: 'Internal server error'});
        }
    },
    create: async(req, res, next) => {
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
            const relationship = new Relationship({user1, user2, status: 'sending'});
            const two_way_relationship = new Relationship({user2, user1, status: 'pending'});
            await relationship.save();
            await two_way_relationship.save();
            res.status(200).json({success: true, messenge: "Lời kết bạn đã được gửi đi."});
        }catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: "Internal server error!"})
        }
    },
    accepted: async (req, res, next) => {
        try{
            const {user_res, user_accept} = req.body;
            const existUser1 = await User.findById(user_res);
            if (!existUser1) 
                return res.status(400).json({success: false, messenge: `${existUser1.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser1.account_status != "activity") 
                return res.status(400).json({success: false, messenge: `Tài khoản ${existUser1.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`});
                const existUser2 = await User.findById(user_accept);
            if (!existUser2) 
                return res.status(400).json({success: false, messenge: `${existUser2.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser1.account_status != "activity") 
                return res.status(400).json({success: false, messenge: `Tài khoản ${existUser2.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`});     
            let relationship = await Relationship.findOne({
                user1: user_res,
                user2: user_accept
            });
            let two_way_relationship = await Relationship.findOne({
                user2: user_res,
                user1: user_accept
            });
            if (!relationship || !two_way_relationship) {
                return res.status(400).json({success: false, messenge: "Thao tác không hợp lệ! Thông tin yêu cầu sai hoặc không tồn tại."});
            }
            relationship.status = "friend";
            two_way_relationship.status = "friend";
            await relationship.save();
            await two_way_relationship.save();
            res.status(200).json({success: true, messenge: "Hai user đã trở thành bạn bè"});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: "Internal server error!"});
        }
    },
    reject: async (req, res, next) => {
        try{
            const {user_res, user_accept} = req.body;
            const existUser1 = await User.findById(user_res);
            if (!existUser1) 
                return res.status(400).json({success: false, messenge: `${existUser1.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser1.account_status != "activity") 
                return res.status(400).json({success: false, messenge: `Tài khoản ${existUser1.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`});
                const existUser2 = await User.findById(user_accept);
            if (!existUser2) 
                return res.status(400).json({success: false, messenge: `${existUser2.fullname} không tồn tại để thực hiện thao tác này.`});
            if (existUser1.account_status != "activity") 
                return res.status(400).json({success: false, messenge: `Tài khoản ${existUser2.fullname} có thể chưa được kích hoạt hoặc đang bị khóa. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết`});     
            let relationship = await Relationship.findOne({
                user1: user_res,
                user2: user_accept,
                status: 'friend'
            });
            let two_way_relationship = await Relationship.findOne({
                user2: user_res,
                user1: user_accept,
                status: 'friend'
            });
            if (!relationship || !two_way_relationship) {
                return res.status(400).json({success: false, messenge: "Thao tác không hợp lệ! Thông tin yêu cầu sai hoặc không tồn tại."});
            }
            relationship.status = "unfriend";
            two_way_relationship.status = "unfriend";
            await relationship.save();
            await two_way_relationship.save();
            res.status(200).json({success: true, messenge: "Hai user đã trở thành bạn bè"});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messenge: "Internal server error!"});
        }
    }
}

module.exports = relationshipController;