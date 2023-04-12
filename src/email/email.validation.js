import nodemailer from 'nodemailer';
import {html} from './email.verify.html.js'
import Jwt  from "jsonwebtoken";

const sendEmail =async(option)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:"testy3832923@gmail.com",
            pass:"tgnoyxyuqnfmvvlt"
        }
    });
    let token = Jwt.sign({email: option.email} , '123##456');
    console.log(token);
    let info = await transporter.sendMail({
        from: '"ChkOut" <testy3832923@gmail.com>',
        to: option.email,
        subject: "ChkOut E-Commerce",
        html:html(token)
    });
}
export default sendEmail