import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router" // Corrected import
import { AuthContext } from "../context/AuthContext"

export default function RegisterPage() {
  const { userRegister } = useContext(AuthContext)
  const navigate = useNavigate() // Added for navigation
  const [loading, setLoading] = useState(false) // Loading state

  // Combined form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await userRegister(formData)
      navigate("/login") // Redirect after successful registration
    } catch (error) {
      // Errors are already handled in AuthContext, but we can add additional handling here
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='w-full h-screen flex items-center justify-center text-white bg-gray-950'>
      <div className='fromContainer w-full max-w-md px-4'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Create Account</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='space-y-2'>
            <label htmlFor='username' className='block text-sm font-medium'>
              Username
            </label>
            <input
              id='username'
              name='username'
              type='text'
              placeholder='Enter username'
              value={formData.username}
              onChange={handleChange}
              className='w-full p-3 bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 outline-none'
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Enter email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-3 bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 outline-none'
              required
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='password' className='block text-sm font-medium'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Enter password'
              value={formData.password}
              onChange={handleChange}
              className='w-full p-3 bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 outline-none'
              required
              minLength='6'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full p-3 rounded font-medium ${
              loading ? "bg-blue-700 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className='mt-6 text-center text-gray-400'>
          Already have an account?{" "}
          <Link to='/login' className='text-blue-400 hover:text-blue-300 transition-colors'>
            Sign in here
          </Link>
        </p>
      </div>
    </main>
  )
}
