import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false }, // Make password optional for social login
  admin: {
    type: Boolean,
    default: false,
  },
  // Facebook authentication fields
  facebookId: { type: String, unique: true, sparse: true },
  profilePicture: { type: String },
  authProvider: {
    type: String,
    enum: ['local', 'facebook'],
    default: 'local'
  },
})

const userModels = mongoose.model("user", userSchema)

export default userModels
