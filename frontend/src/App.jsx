import React from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"
import { BookProvider } from "./context/BookContext"
import AdminBook from "./pages/AdminBook"
import BookUpdate from "./pages/BookUpdate"
import CreateBook from "./pages/CreateBook"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import StoreBook from "./pages/StoreBook"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <BookProvider>
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route path='/' element={<StoreBook />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/create-book' element={<CreateBook />} />
              <Route path='/update-book/:id' element={<BookUpdate />} />
              <Route path='/admin-book' element={<AdminBook />} />
            </Routes>
          </BookProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
