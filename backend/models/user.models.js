import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: {
    type: Boolean,
    default: false,
  },
})

const userModels = mongoose.model("user", userSchema)

export default userModels
