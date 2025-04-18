import express from "express"
import { adminBook, createBook, deleteBook, getBook, updateBook } from "../controllers/book.controller.js"
import authenticationMiddleware from "../middlewares/authentication.middleware.js"
import upload from "../config/multer.js"

const bookRouter = express.Router()

bookRouter.post("/create", authenticationMiddleware, upload.single("bookImage"), createBook)
bookRouter.put("/update/:id", authenticationMiddleware, upload.single("bookImage"), updateBook)
bookRouter.delete("/delete/:id", authenticationMiddleware, deleteBook)
bookRouter.get("/get-all-data", authenticationMiddleware, getBook)
bookRouter.get("/admin-book-data", authenticationMiddleware, adminBook)

export default bookRouter
