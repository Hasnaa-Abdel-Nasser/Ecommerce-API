import Joi from 'joi';

export const newSubcategorySchema = Joi.object({
    name:Joi.string().min(3).required(),
    categoryId : Joi.string().hex().length(24).required(),
});

export const updateSubcategorySchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
    name:Joi.string().min(3).required(),
    categoryId : Joi.string().hex().length(24).required(),
});

export const subcategorySchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
})

