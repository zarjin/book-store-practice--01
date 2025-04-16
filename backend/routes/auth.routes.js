import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
} from "../controllers/auth.controller.js";

import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.get("logout", authenticationMiddleware, userLogout);

export default authRouter;
