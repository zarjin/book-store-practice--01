import bookModels from "../models/book.models.js"

export const createBook = async (req, res) => {
  try {
    const { title, description, price } = req.body

    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields are required." })
    }

    const newBook = new bookModels({
      image: req.file ? req.file.path : "",
      title,
      description,
      price,
      createdBy: req.user, // assuming req.user is populated correctly
    })

    await newBook.save()

    res.status(201).json({ message: "Book created successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong. Please try again later." })
  }
}

export const updateBook = async (req, res) => {
  try {
    const { title, description, price } = req.body

    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields are required." })
    }

    const { id } = req.params

    const updateBook = await bookModels.findByIdAndUpdate(
      id,
      {
        image: req.file ? req.file.path : "",
        title,
        description,
        price,
      },
      { new: true }
    )

    await updateBook.save()

    res.status(201).json({ message: "Book Upadted successfully", book: updateBook })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong. Please try again later." })
  }
}

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params
    await bookModels.findByIdAndDelete(id)
    res.status(201).json({ message: "Book Deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong. Please try again later." })
  }
}

export const getAdminData = async (req, res) => {
  try {
    const userId = req.user
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" })
    }

    const data = await bookModels.find({ createdBy: userId })

    res.status(200).json({ message: "Book data fetched successfully", data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong. Please try again later." })
  }
}

export const getAllBookData = async (req, res) => {
  try {
    const data = await bookModels.find()

    res.status(200).json({ message: "Book data fetched successfully", data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong. Please try again later." })
  }
}
