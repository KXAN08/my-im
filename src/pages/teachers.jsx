import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Menu as MenuIcon } from "lucide-react"

function Teachers() {
  const [showForm, setShowForm] = useState(false)
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("teacherList")
    if (stored) {
      setTeachers(JSON.parse(stored))
    }
  }, [])

  const handleAddTeacher = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newTeacher = {
      id: Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      class: formData.get("class"),
      subject: formData.get("subject"),
      gender: formData.get("gender"),
      age: formData.get("age"),
      about: formData.get("about"),
    }

    const list = [...teachers, newTeacher]
    setTeachers(list)
    localStorage.setItem("teacherList", JSON.stringify(list))
    setShowForm(false)
  }

  return (
    <div className="flex">
      <ProSidebar collapsed>
        <Menu iconShape="square">
          <MenuItem icon={<MenuIcon />}>Dashboard</MenuItem>
        </Menu>
      </ProSidebar>

      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-semibold">Teachers</h1>
          <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Teacher
          </button>
        </div>

        {showForm ? (
          <div className="p-6">
            <form onSubmit={handleAddTeacher} className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Name" required />
              <input name="email" placeholder="Email" required />
              <input name="phone" placeholder="Phone" required />
              <input name="password" placeholder="Password" required />
              <input name="class" placeholder="Class" />
              <input name="subject" placeholder="Subject" />
              <select name="gender">
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <input name="age" placeholder="Age" type="number" />
              <textarea name="about" placeholder="About" rows={3} className="col-span-2" />
              <button type="submit" className="col-span-2 bg-green-500 text-white py-2 rounded">Submit</button>
            </form>
          </div>
        ) : (
          <div className="px-6">
            <input placeholder="Search for a teacher" className="w-full border p-2 rounded" />
          </div>
        )}

        <div className="p-6">
          {teachers.length === 0 ? (
            <p>No teachers yet.</p>
          ) : (
            <ul className="space-y-2">
              {teachers.map(t => (
                <li key={t.id}>
                  <Link to={`/teacher/${t.id}`} className="text-blue-600 hover:underline">
                    {t.name} - {t.email}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Teachers
