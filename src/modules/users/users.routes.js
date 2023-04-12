import express from 'express';
import * as endPoints from './users.controller.js';
import userAuth from '../../middleware/auth.js';
import {fileUpload} from '../../utils/files.uploads.js';
const userRouter = express.Router();

userRouter.post('/signUp',endPoints.signUp);

userRouter.post('/signIn',endPoints.signIn);

userRouter.post('/forgetpassword' , endPoints.forgetPassword);

userRouter.post('/emailverified/:token',endPoints.emailVerified);

userRouter.post('/codeverify/:token',endPoints.codeVerified);

userRouter.put('/changepassword' , userAuth , endPoints.newPassword);

userRouter.put('/profilepicture',userAuth ,fileUpload('profile'), endPoints.profilePic);

userRouter.delete('/deleteaccount' , userAuth , endPoints.deleteAccount);

userRouter.get('/profile' , userAuth , endPoints.getUser);

export default userRouter;