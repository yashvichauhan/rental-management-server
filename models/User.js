const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')

// Function to convert values to lowercase
const lowercaseTransform = function (value) {
    return value.toLowerCase();
};

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter an first name!'],
        unique: false,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: [true, 'Please enter an last name!'],
        unique: false,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email!'],
        unique: true,
        lowercase: true,
        validator: [isEmail, 'Please enter a valid email!']
    },
    password: {
        type: String,
        required: [true, 'Please enter password!'],
        minlength: [6, 'Min length of password is 6']
    },
    roleId: {
        type: String,
        enum: ['landownwer','buyer', 'renter', 'admin', 'agent'],
        transform: lowercaseTransform,
        required: true
    }
})

// salting and hashing the password
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login =  async function(email, password)
{
    const user = await this.findOne({email});
    if(user)
    {
       const isAuth = await bcrypt.compare(password, user.password);
       if(isAuth)
       {
        return user;
       }
       throw Error('Incorrect password')
    }
    else{
        throw Error('Incorrect email')
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;