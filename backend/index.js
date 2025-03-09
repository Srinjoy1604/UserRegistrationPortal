const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./models/model");
const UserRouter = require("./routes/UserRouter");
app.use(cors({
    origin: ["https://doc-vault-beta.vercel.app", "http://localhost:5173"], // Allow both origins
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}));
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());


app.use("/user", UserRouter);

app.get("/health", (req, res) => {
    res.send("Server ON");
});

app.listen(PORT, () => {
    console.log(`Server running at PORT:${PORT}`);
});

