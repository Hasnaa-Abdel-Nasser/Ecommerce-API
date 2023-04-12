import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().min(5).max(50).required(),
    phoneNumber: joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(50).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')),
    rePassword: joi.ref('password')
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(50).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
});

export {
    signUpSchema,
    signInSchema
}

