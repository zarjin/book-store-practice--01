import React, { useContext, useState } from "react"
import { BookContext } from "../context/BookContext"

export default function CreateBook() {
  const { createBook } = useContext(BookContext)

  const [images, setImages] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("image", images)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)

    try {
      await createBook(formData)
    } catch (error) {
      console.error("Error creating book:", error)
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-900 text-white p-4'>
      <div className='w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6'>
        <h1 className='text-2xl font-semibold mb-4 text-center'>Create Book</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <label className='flex flex-col'>
            <span className='mb-1 text-sm font-medium text-gray-400'>Upload Image</span>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setImages(e.target.files[0])}
              className='text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            />
          </label>

          <label className='flex flex-col'>
            <span className='mb-1'>Title</span>
            <input
              type='text'
              placeholder='Enter book title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </label>

          <label className='flex flex-col'>
            <span className='mb-1'>Description</span>
            <textarea
              placeholder='Enter book description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-24'
            />
          </label>

          <label className='flex flex-col'>
            <span className='mb-1'>Price (USD)</span>
            <input
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </label>

          <button type='submit' className='mt-2 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition'>
            Create
          </button>
        </form>
      </div>
    </div>
  )
}
