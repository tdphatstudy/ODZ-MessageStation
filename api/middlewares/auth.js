const jwt = require('jsonwebtoken');
const user = require('../models/User.js');

const authToken = async(res, req, next) => {
    try {
        const token = req.cookies.auth_token;
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userData = decoded;
        next();
    }
    catch(error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Authentication has failed!" });
    }
}