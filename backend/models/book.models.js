import mongoose from "mongoose"

const bookSchema = mongoose.Schema({
  bookImage: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

const bookModels = mongoose.model("Book", bookSchema)

export default bookModels
