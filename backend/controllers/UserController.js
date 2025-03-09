const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { name, age, dateOfBirth, gender, about, password } = req.body;

        const existingUser = await UserModel.findOne({ name });
        if (existingUser) {
            return res.status(409).json({ message: "User already registered", success: false });
        }
       
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new UserModel({
            name,
            age,
            dateOfBirth,
            gender,
            about,
            password: hashedPassword,
        });
       
        await newUser.save();
    
        res.status(201).json({ message: "User registered successfully", success: true });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password"); 

        if (!users) {
            return res.status(404).json({ message: "No users found", success: false });
        }
        if (users.length === 0) {
            return res.status(202).json({ message: "No users found", success: false });
        }
        res.status(200).json({ success: true, users });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, dateOfBirth, gender, about, password } = req.body;

        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password did not match", success: false });
        }

     
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { name, age, dateOfBirth, gender, about },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({ message: "User updated successfully", success: true, user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error. Please enter valid fields. All fields mandatory", success: false });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


const getGenders = (req, res) => {
    res.json(["Male", "Female", "Other"]);
};

module.exports = { registerUser, getAllUsers, updateUser, deleteUser, getGenders };


