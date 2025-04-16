import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"

import connectedDB from "./config/connectedDB.js"
import authRouter from "./routes/auth.routes.js"
import bookRouter from "./routes/book.routes.js"
const app = express()

connectedDB()

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello Backend")
})

app.use("/api/auth", authRouter)
app.use("/api/book", bookRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("Backend is running")
})
