import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const AUTH_API = import.meta.env.VITE_AUTH_URL

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const userRegister = async (registerData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/register`, registerData, {
        withCredentials: true,
      })
      // Check authentication status after registration
      await isAuthentication()
      toast.success(data.message)
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      toast.error(errorMessage)
      console.error(errorMessage)
    }
  }

  const userLogin = async (loginData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/login`, loginData, {
        withCredentials: true,
      })
      // Check authentication status after login
      await isAuthentication()
      toast.success(data.message)
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      toast.error(errorMessage)
      console.error(errorMessage)
    }
  }

  const userLogout = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/logout`, { withCredentials: true })
      setIsAuthenticated(false)
      toast.success(data.message)
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      toast.error(errorMessage)
      console.error(errorMessage)
    }
  }

  const isAuthentication = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/isAuthentication`, {
        withCredentials: true,
      })
      setIsAuthenticated(data.authentication)
    } catch (error) {
      setIsAuthenticated(false)
      console.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    isAuthentication()
  }, [])

  return (
    <AuthContext.Provider value={{ userRegister, userLogin, userLogout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
