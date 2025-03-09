const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],
    },
    about: {
        type: String,
        maxlength: 5000,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
    },
}, { timestamps: true });

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;





// const mongoose=require("mongoose");
// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     name:{
//         type: String,
//         required: true,
//     },
//     email:{
//         type: String,
//         required: true,
//         unique:true,
//     },
//     password:{
//         type: String,
//         required: true,
     
//     }
// });

// const UserModel=mongoose.model('Users',UserSchema);
// module.exports =UserModel;