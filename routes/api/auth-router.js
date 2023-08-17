import express  from "express";
import authController from "../../controllers/auth-controller.js";
import usersSchemas from "../../schemas/users-schemas.js";
import { validateBody, authenticate, upload } from "../../middlewares/index.js";

export const authRouter = express.Router();

authRouter.post("/signup", validateBody(usersSchemas.userSignupSchema), authController.signup);

authRouter.get("/verify/:verificationCode", authController.sendVerifyEmail);

authRouter.post("/verify", validateBody(usersSchemas.userEmailSchema),authController.resendVerifyEmail);

authRouter.post("/signin", validateBody(usersSchemas.userSigninSchema),authController.signin);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch("/",validateBody(usersSchemas.userSubscriptionSchema), authenticate, authController.updateSubscription);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);