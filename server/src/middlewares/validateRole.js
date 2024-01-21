const jwt = require('jsonwebtoken');
const userModel = require('../models/Users');

const validateRole = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findOne({ _id: decoded.userID });

        if (!user) {
            throw new Error();
        }

        if(user.role==='user'){
            return res.status(401).json({Message:"Unauthorized To Write Blog !"});
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ Message: 'Authentication failed' });
    }
};

module.exports = validateRole;
