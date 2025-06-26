import express from "express"
import { isAuthentication, userLogin, userLogout, userRegister } from "../controllers/auth.controller.js"
import passport from "../config/passport.js"
import jwt from "jsonwebtoken"

import authenticationMiddleware from "../middlewares/authentication.middleware.js"

const authRouter = express.Router()

authRouter.post("/register", userRegister)
authRouter.post("/login", userLogin)
authRouter.get("/logout", authenticationMiddleware, userLogout)
authRouter.get("/isAuthentication", authenticationMiddleware, isAuthentication)

// Facebook OAuth routes
authRouter.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }))
authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    // Redirect to frontend
    res.redirect(process.env.FRONTEND_URL || "http://localhost:3000")
  }
)

// Instagram OAuth routes
authRouter.get("/instagram", passport.authenticate("instagram"))
authRouter.get(
  "/instagram/callback",
  passport.authenticate("instagram", { failureRedirect: "/login" }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    // Redirect to frontend
    res.redirect(process.env.FRONTEND_URL || "http://localhost:3000")
  }
)

export default authRouter
