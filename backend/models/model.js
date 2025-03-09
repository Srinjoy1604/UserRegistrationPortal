const mongoose = require("mongoose");
require('dotenv').config()
const Mongo_url = process.env.MONGO_URI;



const connectDB = async () => {
    try {
        await mongoose.connect(Mongo_url);
        console.log('MongoDB connected successfully')
    } catch (err) {
        console.error('MongoDB connection error:', err.message)
        process.exit(1)
    }
};

module.exports = connectDB