
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


import './App.css'
import AppRouter from "./Router"; //import your Router file.jsx
import { AuthProvider } from '../context/AuthContext.jsx'
function App() {


  return (
  <AuthProvider>
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App
