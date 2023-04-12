import Joi from 'joi';

export const createCategorySchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),  
})

export const updateCategorySchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),  
    _id : Joi.string().hex().length(24).required(),
});

export const CategorySchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
})

