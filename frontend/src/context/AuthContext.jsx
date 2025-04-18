import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const AUTH_API = import.meta.env.AUTH_URL

  const [Authentication, setAuthentication] = useState(false)

  const userRegister = async (registerData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/register`, registerData, {
        withCredentials: true,
      })
      setAuthentication(true)
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const userLogin = async (loginData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/login`, loginData, {
        withCredentials: true,
      })
      setAuthentication(true)
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const userLogout = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/logout`, { withCredentials: true })
      setAuthentication(false)
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const isAuthentication = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/isAuthentication`, { withCredentialstu: true })
      setAuthentication(data.authentication)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isAuthentication()
  }, [])

  return (
    <AuthContext.Provider value={{ userRegister, userLogin, userLogout, Authentication }}>
      {children}
    </AuthContext.Provider>
  )
}
