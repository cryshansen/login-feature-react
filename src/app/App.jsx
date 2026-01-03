import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


import './App.css'
import AppRouter from "./Router"; //import your Router file.jsx

function App() {


  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
