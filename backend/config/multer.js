import multer from "multer"
import { createCloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "./cloudinary.js"
const storage = new createCloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "book-store-data",
    format: ["png", "jpg", "jpeg"],
  },
})
const upload = multer({ storage: storage })
export default upload
