import Joi from 'joi';

export const newProductSchema = Joi.object({
    title: Joi.string().min(3).max(20).required(),
    price: Joi.number().min(1).required(),
    priceAfterDiscount: Joi.number().min(0).required(),
    discription: Joi.string().min(5).required(),
    ratingCount: Joi.number().min(0).required(),
    ratingAvg:Joi.number().min(0).required(),
    quantity: Joi.number().min(0).required(),
    categoryId:Joi.string().hex().length(24).required(),
    subcategoryId:Joi.string().hex().length(24).required(),
    brandId:Joi.string().hex().length(24).required(),
})

export const updateProductSchema = Joi.object({ 
    _id : Joi.string().hex().length(24).required(),
    title: Joi.string().min(3).max(20),
    price: Joi.number().min(1),
    priceAfterDiscount: Joi.number().min(0),
    discription: Joi.string().min(5),
    ratingCount: Joi.number().min(0),
    ratingAvg:Joi.number().min(0),
    quantity: Joi.number().min(0),
    categoryId:Joi.string().hex().length(24),
    subcategoryId:Joi.string().hex().length(24),
    brandId:Joi.string().hex().length(24),
});

export const productSchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
}); // delete & product



