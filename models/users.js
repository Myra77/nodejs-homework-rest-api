import {Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./index.js";

// import { emailRegexp } from "../constants/user-constants.js";
import { userSubscriptionsEnum } from "../constants/userSubscriptionsEnum.js";
const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: Object.values(userSubscriptionsEnum),
        default: userSubscriptionsEnum.STARTER
    },
    token: {
        type: String,
        default: null,
    },
}, {versionKey: false, timestamps: true});

userSchema.pre("findOneAndUpdate", handleUpdateValidate);
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

export const User = model("user", userSchema);