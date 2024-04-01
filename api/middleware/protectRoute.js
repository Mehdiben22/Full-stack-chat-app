import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async(req,res,next) => {
    try {
        //get the cookie instead of cookieParser
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({error:"Unauthorized - No Token Provided"})
        }
        //decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
          return res.status(401).json({error : "Unauthorized -Invalid Token"});
        }
        //find the user cookie and remove the password
        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(404).json({error:"User not Found"})
        }

        req.user = user
        //after we run all this things before we gonna run the next function in the messageRoute
        next();

    }catch(error) {
        console.log("Error in protectRoute middleware", error.message)
        res.status(500).json({error:"Internal server error"});
    }
}

export default protectRoute;