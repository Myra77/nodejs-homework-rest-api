import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js"
import { HttpError, cloudinary } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
// import Jimp from "jimp";

dotenv.config();
const { JWT_SECRET } = process.env;


const signup = async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);  
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL});

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
        subscription: newUser.subscription,
    });
};

const signin = async(req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "email or password invalid");
    };
    const passwordCompare = await bcrypt.compare( password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "email or password invalid")};
        const payload = {
            id: user._id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findOneAndUpdate({ _id: user._id }, { token });
    res.json({
        token,
        user: { email: user.email, subscription: user.subscription }, 
    });
};

const signout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    // if (!user) throw HttpError(401);
    res.json({
        message: "Signout success"
    })
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription, });
};

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(_id, { subscription });
    res.json({ message: `Status was updated to ${subscription}` });
};

const updateAvatar = async (req, res) => {
    try {
        const { path } = req.file;
        const { _id } = req.user;
        const { url: avatarURL } = await cloudinary.uploader.upload(path, {
            folder: "avatars",
        });
        await User.findByIdAndUpdate(_id, { avatarURL });
        fs.unlink(path);
        res.json({ avatarURL });
    }
    catch(error) {
        fs.unlink(path);
        throw error;
    }
};

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    signout: ctrlWrapper(signout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};