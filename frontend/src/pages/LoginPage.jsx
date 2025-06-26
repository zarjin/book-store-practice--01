import React, { useContext, useState } from "react"
import { Link } from "react-router"
import { AuthContext } from "../context/AuthContext"
import SocialLogin from "../components/SocialLogin"

export default function LoginPage() {
  const { userLogin } = useContext(AuthContext)

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loginData = {
      email: Email,
      password: Password,
    }
    await userLogin(loginData)
  }

  return (
    <main className='w-full h-screen flex items-center justify-center text-white bg-gray-950'>
      <div className='fromContainer w-full max-w-md px-4'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Login</h1>

        <form className='flex flex-col gap-4 mb-6' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
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
              type='password'
              placeholder='Enter your password'
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-3 bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 outline-none'
              required
            />
          </div>

          <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-medium transition-colors duration-200'>
            Login
          </button>
        </form>

        {/* Social Login Component */}
        <SocialLogin />

        <p className='mt-6 text-center text-gray-400'>
          Don't have an account?{" "}
          <Link to='/register' className='text-blue-400 hover:text-blue-300 transition-colors'>
            Register here
          </Link>
        </p>
      </div>
    </main>
  )
}
