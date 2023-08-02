import express  from "express";
import authController from "../../controllers/auth-controller.js";
import usersSchemas from "../../schemas/users-schemas.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { authenticate } from "../../middlewares/authenticate.js";

// import {
//     signin,
//     signup,
//     signout,
//     getCurrent,
//     updateSubscription,
// } from "../../controllers/auth-controller.js";

// import {
//     userSignupSchema,
//     userSigninSchema,
//     userSubscriptionSchema,
// } from "../../schemas/users-schemas.js";

export const authRouter = express.Router();

authRouter.post("/signup", validateBody(usersSchemas.userSignupSchema), authController.signup);

authRouter.post("/signin", validateBody(usersSchemas.userSigninSchema),authController.signin);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch("/",validateBody(usersSchemas.userSubscriptionSchema), authenticate, authController.updateSubscription);