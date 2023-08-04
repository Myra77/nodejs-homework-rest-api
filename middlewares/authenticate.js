import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { HttpError } from "../helpers/index.js";
import { User } from "../models/index.js";

dotenv.config();
const { JWT_SECRET  } = process.env;

export const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) throw HttpError(401);
    try {
        const { id } = jwt.verify(token, JWT_SECRET );
        const user = await User.findById(id);
        if (!user || !user.token || token !== user.token) {
            throw HttpError(401);
        }
        req.user = user;
        next();
    } catch {
        throw HttpError(401);
    }
};