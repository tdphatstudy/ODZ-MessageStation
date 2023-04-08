const jwt = require('jsonwebtoken');
const user = require('../models/User.js');

const authToken = async(res, req, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch(error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Authentication has failed!" });
    }
}