import Joi from 'joi';

export const userValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'User name is required',
            'string.min': 'User name must be at least {#limit} characters long',
            'string.max': 'User name must be at most {#limit} characters long',
            'any.required': 'User name is required',
        }),
    phone: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Phone is required',
            'any.required': 'Phone is required',
        }),
    profilePic: Joi.string()
        .trim()
        .optional()
        .messages({
            'string.empty': 'Profile picture must be a valid string',
        })
});