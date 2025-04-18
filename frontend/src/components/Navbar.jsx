import React from "react"
import { Link } from "react-router"

export default function Navbar() {
  return (
    <header className='w-full bg-gray-800 shadow-lg'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-6 py-3'>
        <div className='text-2xl font-bold tracking-tight text-white drop-shadow-md'>Book-Store</div>
        <nav>
          <ul className='flex space-x-6'>
            <li>
              <Link to='/' className='text-white hover:text-yellow-300 font-medium transition-colors duration-200'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/books' className='text-white hover:text-yellow-300 font-medium transition-colors duration-200'>
                Books
              </Link>
            </li>
            <li>
              <Link to='/about' className='text-white hover:text-yellow-300 font-medium transition-colors duration-200'>
                About
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='text-white hover:text-yellow-300 font-medium transition-colors duration-200'
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className='flex space-x-3'>
          <Link
            to='/login'
            className='px-4 py-2 rounded-full bg-white text-indigo-600 font-semibold shadow hover:bg-yellow-300 hover:text-indigo-900 transition-colors duration-200'
          >
            Login
          </Link>
          <Link
            to='/register'
            className='px-4 py-2 rounded-full bg-yellow-300 text-indigo-900 font-semibold shadow hover:bg-white hover:text-indigo-600 transition-colors duration-200'
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  )
}
