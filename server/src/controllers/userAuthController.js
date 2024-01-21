const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const bcrypt = require('bcrypt');

const userModel = require('../models/Users');

const jwt = require('jsonwebtoken');



// -------------------------------------------- Register --------------------------------------------
const register = async (req, res) => {
    try {
        const { name, email, password, } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ Message: "Enter All Fields !" });
        }

        if (email.includes(' ')) {
            return res.status(400).json({ Message: "Enter Valid Email !" })
        }

        const findUser = await userModel.findOne({ email });

        if (findUser) {
            return res.status(400).json({ Message: "Already Exist !" })
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        if (req.body.role) {
            newUser.role = req.body.role
        }
        await newUser.save();

        res.status(201).json({ Message: "User Registered !", User: newUser })
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error !", Error: error.message });
    }
}

// -------------------------------------------- Login --------------------------------------------
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ Message: "Enter All Fields !" });
        }
        if (email.includes(' ')) {
            return res.status(400).json({ Message: "Enter Valid Email !" })
        }

        const findUser = await userModel.findOne({
            email,
            isDeleted: false,
        });
        if (!findUser) {
            return res.status(400).json({ Message: "Not Registered " })
        }

        const passwordMatch = await bcrypt.compare(password, findUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ Message: "Wrong Password !" })
        }


        const token = jwt.sign(
            { userID: findUser.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '4d' }
        );


        res.status(200).json({ Message: "Logged In", Token: token });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error !", Error: error.message });
    }
}

// -------------------------------------------- Export --------------------------------------------
module.exports = {
    register,
    login
}