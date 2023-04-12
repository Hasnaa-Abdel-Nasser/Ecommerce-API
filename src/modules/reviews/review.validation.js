import Joi from 'joi';

export const createReviewSchema = Joi.object({
    rating:Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(3).required(),  
    userId : Joi.string().hex().length(24).required(),
    productId: Joi.string().hex().length(24).required(),
})

export const updateReviewSchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
    rating:Joi.number().min(1).max(5),
    comment: Joi.string().min(3),  
    userId : Joi.string().hex().length(24).required(),
    productId: Joi.string().hex().length(24).required(),
});

export const ReviewSchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
})

