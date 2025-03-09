const jwt=require("jsonwebtoken");
require('dotenv').config();
const ensureAuthenticated=(req,res,next)=>{
    const auth= req.headers["authorization"];
    if(!auth){
        return(res.status(401).json({message: "Unauthorized , JWt token needed."}));
    }
    try{
        const decoded=jwt.verify(auth,process.env.JWT_SECRET);
        req.user= decoded;
        next();
    }
    catch(error)
    {
        return(res.status(401).json({message: "Unauthorized , JWt token missing or expired"}));
    }
}

module.exports={
    ensureAuthenticated,
}