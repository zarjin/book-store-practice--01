import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"

import connectedDB from "./config/connectedDB.js"
import authRouter from "./routes/auth.routes.js"

const app = express()

connectedDB()

app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("Backend is running")
})
