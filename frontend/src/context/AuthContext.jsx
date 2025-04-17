import { createContext } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const AUTH_API = import.meta.env.AUTH_URL

  const userRegister = async (registerData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/register`, registerData, {
        withCredentials: true,
      })
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
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return <AuthContext.Provider value={{ userRegister, userLogin }}>{children}</AuthContext.Provider>
}
