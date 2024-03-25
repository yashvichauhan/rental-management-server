require('dotenv').config()
const User = require('../models/User');
const { createToken } = require('../utils/utils');

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000})
        res.status(201).json({user: user._id})
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.signUpUser = async (req, res) => {
    try{
        const {email, password,roleId} = req.body
        const user = await User.create({email, password, roleId})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000})
        res.status(201).json({user: user._id})
    }catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
};