import Joi from "joi";

export const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

export const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});