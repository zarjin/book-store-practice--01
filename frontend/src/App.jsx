import React from "react"
import { BrowserRouter, Routes, Route } from "react-router"

import { AuthProvider } from "./context/AuthContext"
import { BookProvider } from "./context/BookContext"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <BookProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<h1>Home</h1>} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
            </Routes>
          </BookProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
