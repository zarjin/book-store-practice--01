import React from "react";
import { BrowserRouter, Routes, Route } from "react-router"

import {AuthProvider} from "./context/AuthContext"

export default function App() {
  return <>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}/>
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  </>;
}
