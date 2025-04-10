import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddTeacher() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    class: "",
    gender: "",
    subject: "",
    age: "",
    about: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTeacher = { id: Date.now(), ...formData }
    const list = JSON.parse(localStorage.getItem("teacherList")) || []
    list.push(newTeacher)
    localStorage.setItem("teacherList", JSON.stringify(list))
    navigate("/teachers")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Add teacher</h1>
        <button type="submit" form="add-teacher-form" className="btn-primary">
          Save
        </button>
      </div>

      <form id="add-teacher-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="p-2 border rounded-md" />
          <input name="class" value={formData.class} onChange={handleChange} placeholder="Class" className="p-2 border rounded-md" />
          <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required className="p-2 border rounded-md" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded-md">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <select name="subject" value={formData.subject} onChange={handleChange} className="p-2 border rounded-md">
            <option value="">Subject</option>
            <option>Math</option>
            <option>English</option>
            <option>Physics</option>
          </select>
          <input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Age" className="p-2 border rounded-md" />
        </div>
        <textarea name="about" value={formData.about} onChange={handleChange} rows={4} placeholder="About" className="w-full p-2 border rounded-md" />
      </form>
    </div>
  )
}

export default AddTeacher
