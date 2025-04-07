import Joi from "joi";

export const userSchemaValidate = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
});


export const signinSchemaValidate = Joi.object({
    email: Joi.string().email().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(5).required(),
});


