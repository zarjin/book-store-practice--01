import React, { useContext, useState } from "react"
import { Link } from "react-router"
import { AuthContext } from "../context/AuthContext"

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
      <div className='fromContainer'>
        <h1 className='text-3xl font-bold mb-4'>Login</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className='p-2 bg-gray-800 rounded'
          />
          <input
            type='password'
            placeholder='Password'
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className='p-2 bg-gray-800 rounded'
          />
          <button type='submit' className='bg-blue-600 p-2 rounded'>
            Login
          </button>
        </form>
        <p className='mt-4 text-center'>
          Already have an account?{" "}
          <Link to='/register' className='text-blue-400 hover:underline'>
            Register here
          </Link>
        </p>
      </div>
    </main>
  )
}
