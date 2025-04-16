import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected successfully✨")
  } catch (error) {
    console.error("MongoDB connection unsuccessfully🐸")
    console.error("Error details:", error)
    process.exit(1)
  }
}

export default connectDB
