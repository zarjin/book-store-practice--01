import React from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"
import CreateBook from "./pages/CreateBook"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path='/' element={<h1>Home</h1>} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/create-book' element={<CreateBook />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
