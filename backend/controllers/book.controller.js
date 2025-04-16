import bookModels from "../models/book.models.js"

export const createBook = async (res, req) => {
  const { name, description, price } = req.body
  try {
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const createBy = req.user.id

    const book = await bookModels.create({
      bookImage: req.file ? req.file.path : "",
      description,
      price,
      createBy,
    })

    res.status(200).json(book)
  } catch (error) {
    console.error("Book Create error:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const updateBook = async (req, res) => {
  const { id } = req.params
  const { name, description, price } = req.body

  if (!name || !description || !price) {
    return res.status(400).json({ message: "All fields are required" })
  }

  try {
    const updatedBook = await bookModels.updateById({
      id,
      name,
      description,
      price,
    })

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" })
    }

    return res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    })
  } catch (error) {
    console.error("Book Update error:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const deleteBook = async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await bookModels.deleteById({ id })

    if (!deleted) {
      return res.status(404).json({ message: "Book not found" })
    }

    res.status(200).json({ message: "Book deleted successfully" })
  } catch (error) {
    console.error("Book delete error:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const getBook = async (req, res) => {
  try {
    const books = await bookModels.find()
    res.status(200).json(books)
  } catch (error) {
    console.error("Get book data error:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const adminBook = async (req, res) => {
  const createdBy = req.user.id

  try {
    const adminBooks = await bookModels.find({ createdBy })
    res.status(200).json(adminBooks)
  } catch (error) {
    console.error("Admin book data error:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}
