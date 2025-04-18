import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const BookContext = createContext()

export const BookProvider = ({ children }) => {
  const BOOK_API = import.meta.env.BOOK_URL

  const [book, setBook] = useState([])
  const [adminBooks, setAdminBooks] = useState([])

  const createBook = async (bookData) => {
    try {
      const { data } = await axios.post(`${BOOK_API}/create`, bookData, { withCredentials: true })
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const updateBook = async (bookData, id) => {
    try {
      const { data } = await axios.put(`${BOOK_API}/update/${id}`, bookData, { withCredentials: true })
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBook = async (id) => {
    try {
      const { data } = await axios.delete(`${BOOK_API}/delete/${id}`, { withCredentials: true })
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllBooks = async () => {
    try {
      const { data } = await axios.get(`${BOOK_API}/get-all-data`, { withCredentials: true })
      setBook(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAdminBooks = async () => {
    try {
      const { data } = await axios.get(`${BOOK_API}/admin-book-data`, { withCredentials: true })
      setAdminBooks(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBooks()
    getAdminBooks()
  }, [])

  return (
    <BookContext.Provider value={{ createBook, updateBook, deleteBook, book, adminBooks }}>
      {children}
    </BookContext.Provider>
  )
}
