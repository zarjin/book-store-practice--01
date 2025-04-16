import express from "express"
import {
  adminBook,
  createBook,
  deleteBook,
  getBook,
  updateBook,
} from "../controllers/book.controller.js"
const bookRouter = express.Router()

bookRouter.post("/create", createBook)
bookRouter.post("/update", updateBook)
bookRouter.post("/delte", deleteBook)
bookRouter.post("/get-all-data", getBook)
bookRouter.post("/admin-book-data", adminBook)

export default bookRouter
