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
        const users = await UserModel.find().select("-password"); // exclude password

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found", success: false });
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

        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password did not match", success: false });
        }

        // Proceed with update if password is correct
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
// const getUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await UserModel.findById(id).select("-password"); // Exclude password

//         if (!user) {
//             return res.status(404).json({ message: "User not found", success: false });
//         }

//         res.status(200).json({ success: true, user });
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", success: false });
//     }
// };


// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, age, dateOfBirth, gender, about } = req.body;

//         const updatedUser = await UserModel.findByIdAndUpdate(
//             id,
//             { name, age, dateOfBirth, gender, about },
//             { new: true, runValidators: true }
//         ).select("-password");

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found", success: false });
//         }

//         res.status(200).json({ message: "User updated successfully", success: true, user: updatedUser });
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", success: false });
//     }
// };


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



// const login=async (req,res)=>{
//     try{
//         const {email,password}=req.body;
//         const user =await UserModel.findOne({email});
//         const errorMsg= "Authentication failed, email or password is incorrect";
//         if(!user)
//         {
//             res.json({message: errorMsg ,success:false});
//             return(res.status(403));
//         }
//         const isPassEqual= await bcrypt.compare(password,user.password);
//         if(!isPassEqual)
//         {
//             res.json({message: errorMsg ,success:false});
//             return(res.status(403));
//         }
//         const jwtToken= jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
//         res.status(200).json({message:"Login Success", success:true,jwtToken,email, name:user.name});

//     }
//     catch (err){
//         res.status(500).json({message:"Internal Server error", success:false});
//     }
// }