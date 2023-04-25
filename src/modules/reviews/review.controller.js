import reviewModel from '../../../database/models/review.model.js';
import productModel from '../../../database/models/product.model.js';
import {AppError} from '../../utils/response.error.js';
import { catchError } from '../../middleware/catch.errors.js';

export const addReview = catchError(async(req , res,next)=>{
    const {rating , comment , userId , productId} = req.body;
    const review = await reviewModel.findOne({userId , productId});
    if(review)  next(new AppError('this user already add rating' , 400));
    await reviewModel.insertMany(req.body);
    const product = await productModel.findById(productId);
    let totalRating = ((product.ratingCount * product.ratingAvg) + rating)/(product.ratingCount+1);
    product.ratingCount += 1;
    product.ratingAvg = totalRating;
    product.save();
    res.status(200).json({message: 'success'});
});

export const editReview = catchError(async(req , res , next)=>{
    const {_id , rating , comment , userId , productId} = req.body;
    const review = await reviewModel.findOne({userId , productId});
    if(!review)  next(new AppError('Not found Review' , 400));
    await findByIdAndUpdate(_id , {rating , comment});
    res.status(200).json({message: 'success'});
});

export const deleteReview = catchError(async(req , res , next)=>{
    const{_id} = req.body;
    const review = await reviewModel.findByIdAndDelete(_id);
    if(!review) next(new AppError('Not found Review' ,400));
    const product = await productModel.findById(review.productId);
    let totalRating = (((product.ratingCount-1) * product.ratingAvg) - rating)/(product.ratingCount-1);
    product.ratingCount -= 1;
    product.ratingAvg = totalRating;
    product.save();
    res.status(200).json({message: 'success'});
});

export const getReviews = catchError(async(req , res , next)=>{
    const reviews = await reviewModel.find();
    res.status(200).json({message: "success" , reviews});
});

