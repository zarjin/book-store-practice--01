import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
  {
    bookImage: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds `createdAt` and `updatedAt`
  }
)

const Book = mongoose.model("Book", bookSchema)

export default Book
