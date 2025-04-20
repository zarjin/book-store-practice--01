import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

export const BookContext = createContext()

export const BookProvider = ({ children }) => {
  const BOOK_API = import.meta.env.VITE_BOOK_URL

  const [allBookData, setAllBookData] = useState([])
  const [getAdminBook, setGetAdminBook] = useState([])

  if (!BOOK_API) {
    console.warn("BOOK_API is not defined in your .env file")
  }

  const createBook = async (bookData) => {
    try {
      const { data } = await axios.post(`${BOOK_API}/create-book`, bookData, {
        withCredentials: true,
      })
      toast.success(data.message)
    } catch (error) {
      console.error("Book creation failed:", error)
      toast.error(error.response?.data?.message || error.message || "Something went wrong")
    }
  }

  const updateBook = async (bookData, id) => {
    try {
      const { data } = await axios.put(`${BOOK_API}/update-book/${id}`, bookData, { withCredentials: true })
      toast.success(data.message)
      getAllBookData()
      getAdminBookData()
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const deleteBook = async (id) => {
    try {
      const { data } = await axios.delete(`${BOOK_API}/delete-book/${id}`, { withCredentials: true })
      toast.success(data.message)
      getAllBookData()
      getAdminBookData()
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getAllBookData = async () => {
    try {
      const { data } = await axios.get(`${BOOK_API}/get-all-book`, { withCredentials: true })
      setAllBookData(data.data)
    } catch (error) {
      toast.error(error)
    }
  }

  const getAdminBookData = async () => {
    try {
      const { data } = await axios.get(`${BOOK_API}/get-admin-book`, { withCredentials: true })
      setGetAdminBook(data.data)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAllBookData()
    getAdminBookData()
  }, [])

  return (
    <BookContext.Provider value={{ createBook, updateBook, deleteBook, allBookData, getAdminBook }}>
      {children}
    </BookContext.Provider>
  )
}
