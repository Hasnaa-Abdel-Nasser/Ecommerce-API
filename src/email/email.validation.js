import nodemailer from 'nodemailer';
import {html} from './email.verify.html.js'
import Jwt  from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config();

const sendEmail =async(option)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    });
    let token = Jwt.sign({email: option.email} , process.env.JWT_SECRET);
    console.log(token);
    let info = await transporter.sendMail({
        from: `"ChkOut" <${process.env.EMAIL}>`,
        to: option.email,
        subject: "ChkOut E-Commerce",
        html:html(token)
    });
}
export default sendEmail