import userModel from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import sendEmail from "../../email/email.validation.js";
import { AppError } from "../../utils/response.error.js";
import Jwt from "jsonwebtoken";
import { catchError } from "../../middleware/catch.errors.js";
import {
  signUpSchema,
  signInSchema,
} from "../../middleware/user.validation.js";
import cloudinary from "../../utils/cloudinary.js";
import * as dotenv from 'dotenv';
dotenv.config()
export const signUp = catchError(async (req, res, next) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    next(new AppError(error.details[0].message, 400));
  }
  const { name, email, password, phoneNumber } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    next(new AppError("Email already exists", 400));
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS)); //salt value to be dynamically generated for each user.(More Security)
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
  });
  await newUser.save();
  sendEmail({ email: email, code: "email" });
  res.status(201).json({ message: "successful" });
});

export const signIn = catchError(async (req, res) => {
  const { error } = signInSchema.validate(req.body);
  if (error) {
    next(new AppError(error.details[0].message, 400));
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      sendEmail({ email: email, code: "email" });
      return res.status(201).json({ message: "successful" });
    }
  }
  next(new AppError("Incorrect email or password", 400));
});

export const forgetPassword = catchError(async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) next(new AppError("User not found", 400));
  let code = nanoid(4);
  await user.updateOne({ email }, { code });
  sendEmail({ email, code });
});

export const profilePic = catchError(async (req, res) => {
  if (!req.file) next(new AppError("Upload Image only", 400));
  const result = await cloudinary.uploader.upload(req.file.path,{ folder: "user" });
  req.body.profileImage = result.url;
  await userModel.updateOne(
    { email: req.userEmail },
    req.body
  );
  res.status(200).json({ message: "successful" });
});

export const emailVerified = catchError(async (req, res, next) => {
  const { token } = req.params;
  Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) next(new AppError(err, 400));
    await userModel.updateOne({ email: decoded.email }, { verified: true });
    return res.status(200).json({ message: "success" });
  });
});

export const codeVerified = catchError(async (req, res, next) => {
  const { token } = req.params;
  const { code, newPassword } = req.body;
  if (token) next(new AppError("invalid token", 400));
  Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) next(new AppError(err, 400));
    const user = await userModel.findOne({ email: decoded.email, code });
    if (!user) next(new AppError("invalid Inputs", 400));
    const salt = await bcrypt.genSalt(10); //salt value to be dynamically generated for each user.(More Security)
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await userModel.updateOne(
      { email: decoded.email },
      { password: hashedPassword }
    );
    return res.status(200).json({ message: "success" });
  });
});

export const newPassword = catchError(async (req, res, next) => {
  const { password, newPassword } = req.body;
  const user = await userModel.findOne({ email:req.userEmail});
  if (password == newPassword && bcrypt.compareSync(user.password , password))
    next(new AppError("Please enter other password", 400));
  const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS)); //salt value to be dynamically generated for each user.(More Security)
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await userModel.updateOne(
    { email: req.userEmail },
    { password: hashedPassword }
  );
  return res.status(200).json({ message: "success" });
});

export const deleteAccount = catchError(async(req , res )=>{
  await userModel.deleteOne({email : req.userEmail});
  return res.status(200).json({ message: "success" });
});

export const getUser = catchError(async(req , res)=>{
  const user = await userModel.findOne({ email: req.userEmail});
  if(!user) next(new AppError("Invalid token", 400));
  res.status(200).json({ message: "success"})
})