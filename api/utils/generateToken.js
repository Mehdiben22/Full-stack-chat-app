import jwt  from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
 const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    //expires in 15days
    expiresIn : '15d'
 }) 

 res.cookie("jwt" , token ,{
    //make the cookie a little bit secure maxage : 15 days,24hours,60minutes,60seconds,1000 mseconds
    maxAge : 15 * 24 * 60 * 60 * 1000,
    httpOnly : true, //onlyaccessebale http  prevent xxs attacks cross-site scripting attacks
    sameSite : "strict", //prevents attacks too
    //if we are in the developement is gonna be false but if we are in production it will be true 
    secure : process.env.NODE_ENV != "development",
 })
}

export default generateTokenAndSetCookie;