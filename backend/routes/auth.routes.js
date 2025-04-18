import express from "express"
import { userRegister, userLogin, userLogout, isAuthentication } from "../controllers/auth.controller.js"

import authenticationMiddleware from "../middlewares/authentication.middleware.js"

const authRouter = express.Router()

authRouter.post("/register", userRegister)
authRouter.post("/login", userLogin)
authRouter.get("logout", authenticationMiddleware, userLogout)
authRouter.get("/isAuthentication", authenticationMiddleware, isAuthentication)

export default authRouter
