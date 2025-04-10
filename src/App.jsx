import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./pages/dashboard"
import TeachersList from "./pages/TeachersList"
import AddTeacher from "./pages/AddTeacher"
import TeacherProfile from "./pages/TeacherProfile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [])

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          </>
        ) : (
          <Route path="*" element={<MainLayout setAuth={setIsAuthenticated} />} />
        )}
      </Routes>
    </Router>
  )
}

function MainLayout({ setAuth }) {
  return (
    <div className="flex h-screen bg-background-paper">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onLogout={() => {
            localStorage.removeItem("token")
            setAuth(false)
          }}
        />
        <main className="flex-1 overflow-auto p-6 bg-background">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teachers" element={<TeachersList />} />
            <Route path="/teachers/add" element={<AddTeacher />} />
            <Route path="/teachers/:id" element={<TeacherProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
