import React, { useContext } from "react"
import { Link } from "react-router"
import { BookContext } from "../context/BookContext"

export default function AdminBook() {
  const { getAdminBook, deleteBook } = useContext(BookContext)

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-gray-50 min-h-screen'>
      {getAdminBook.length === 0 ? (
        <div className='col-span-full text-center text-gray-400 text-lg'>No books found.</div>
      ) : (
        getAdminBook.map((book) => (
          <div
            key={book._id}
            className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col overflow-hidden'
          >
            <div className='w-full aspect-[3/2] bg-gray-100 flex items-center justify-center'>
              <img src={book.image} alt={book.title} className='max-w-full max-h-44 object-contain' />
            </div>
            <div className='p-5 flex flex-col flex-1'>
              <h5 className='text-lg font-semibold mb-2 text-gray-900'>{book.title}</h5>
              <p className='text-gray-600 text-sm mb-3 flex-1'>{book.description}</p>
              <p className='text-blue-600 font-medium text-base mb-4'>${book.price}</p>
              <div className='flex gap-3'>
                <Link
                  to={`/update-book/${book._id}`}
                  className='px-4 py-2 rounded-md bg-blue-600 text-white text-base hover:bg-blue-800 transition'
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(book._id)}
                  className='px-4 py-2 rounded-md bg-red-600 text-white text-base hover:bg-red-800 transition'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
