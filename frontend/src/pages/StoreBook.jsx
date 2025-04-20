import React, { useContext } from "react"
import { BookContext } from "../context/BookContext"

export default function StoreBook() {
  const { allBookData } = useContext(BookContext)

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white py-8 px-4'>
      <div className='max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {allBookData.map((book) => (
          <div
            key={book.id || book.title}
            className='bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300'
          >
            <img src={book.image} alt={book.title} className='w-full h-64 object-cover rounded-xl mb-4 shadow-md' />
            <h2 className='text-xl font-bold mt-2 text-center'>{book.title}</h2>
            <p className='text-gray-300 text-sm mt-2 line-clamp-3 text-center'>{book.description}</p>
            <p className='text-lg font-semibold mt-4 text-indigo-400'>Price: ${book.price}</p>
            <button className='mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold shadow transition-colors duration-200'>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
