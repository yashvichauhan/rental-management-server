const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsersAdmin = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const { fullName, email, role } = req.body;

    try {
        const updateFields = {};
        if (fullName) updateFields.fullName = fullName;
        if (email) updateFields.email = email;
        if (role) updateFields.role = role;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select('-password');


        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ message: "Validation error", error: error.message });
        } else {
            res.status(500).json({ message: "Error updating user", error: error.message });
        }
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Failed to delete user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { fullName, email, role } = req.body;

        const tempPassword = 'Temp1234!';

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role,
            mustResetPassword: true
        });

        await newUser.save();

        const userToReturn = { ...newUser._doc };
        delete userToReturn.password;
        res.status(201).json(userToReturn);

    } catch (error) {
        console.error('Server error when creating user:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation Error", errors: error.errors });
        } else {
            return res.status(500).json({ message: "Error creating new user", error: error.message });
        }
    }
};

exports.toggleUserVerification = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.verified = !user.verified;
        await user.save();
        res.json({ message: "Verification status updated", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating verification status", error: error.toString() });
    }
};