import express from "express"
import { createBook, deleteBook, getAdminData, getAllBookData, updateBook } from "../controllers/book.controller.js"

import upload from "../config/multer.js"
import authenticationMiddleware from "../middlewares/authentication.middleware.js"

const bookRouter = express.Router()

bookRouter.post("/create-book", authenticationMiddleware, upload.single("image"), createBook)
bookRouter.post("/update-book/:id", authenticationMiddleware, upload.single("image"), updateBook)
bookRouter.delete("/delete-book/:id", authenticationMiddleware, deleteBook)
bookRouter.get("/get-admin-book", authenticationMiddleware, getAdminData)
bookRouter.get("/get-all-book", authenticationMiddleware, getAllBookData)

export default bookRouter
