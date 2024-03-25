const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const createToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: 3 * 24 * 60 * 60} );
}

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=> {
            if(err)
            {
                console.log(err.message)
                res.status(401).json({message: "Invalid email or password!"});
            }
            else
            {
                console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.status(400).json({message: "Invalid token!"});
    }
}

const authAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=> {
            if(err)
            {
                console.log(err.message)
                res.status(401).json({message: "Invalid email or password!"});
            }
            else
            {
                const user =  User.findById(decodedToken.id)
                .then((data) => {
                    if(data.roleId == "admin"){
                        console.log("Admin access granted:", decodedToken)
                        next();
                    }else{
                        res.status(401).json({message: "User is unauthorized!"});
                    }
                })
                .catch((err) => {
                    res.status(401).json({message: err.message});
                })
            }
        })
    }
    else{
        res.status(401).json({message: "Invalid token!"});
    }
}


module.exports = { createToken, requireAuth, authAdmin}