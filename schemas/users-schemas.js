import Joi from "joi";

import { emailRegexp } from "../constants/index.js";
import { userSubscriptionsEnum } from "../constants/index.js";

const userSignupSchema = Joi.object ({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string()
        .default("starter")
        // .validate(...userSubscriptionsEnum),
    // token: Joi.string().default(null),
});

const userSigninSchema = Joi.object ({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const userSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        // .valid(...userSubscriptionsEnum)
        .required(),
});

export default {
    userSignupSchema,
    userSigninSchema,
    userSubscriptionSchema,
};