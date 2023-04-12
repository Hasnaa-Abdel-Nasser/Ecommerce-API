import Joi from 'joi';

export const createBrandSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),  
})

export const updateBrandSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),  
    _id : Joi.string().hex().length(24).required(),
});

export const BrandSchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
})

