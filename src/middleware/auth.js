import Jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()
const userAuth = (req , res , next) => {
    const token = req.header('token');
    Jwt.verify(token , process.env.JWT_SECRET , async function (err,decoded) {
        if(err){
            res.json({message: "ERROR" , err})
        }else{
            req.userEmail = decoded.email;
            next();
        }
    })
}

export default userAuth;
