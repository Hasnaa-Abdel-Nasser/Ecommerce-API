import Jwt from "jsonwebtoken";

const userAuth = (req , res , next) => {
    const token = req.header('token');
    Jwt.verify(token , '123##456' , async function (err,decoded) {
        if(err){
            res.json({message: "ERROR" , err})
        }else{
            req.userEmail = decoded.email;
            next();
        }
    })
}

export default userAuth;
