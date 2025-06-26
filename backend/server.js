import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import session from "express-session"
import passport from "./config/passport.js"

import connectedDB from "./config/connectedDB.js"
import authRouter from "./routes/auth.routes.js"
import bookRouter from "./routes/book.routes.js"

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

// Session configuration for passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
)

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/auth", authRouter)
app.use("/api/book", bookRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("Backend is running")
})
