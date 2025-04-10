import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Welcome to your dashboard</h1>
        <p className="text-gray-500">Uyo/school/@teachable.com</p>
      </div>

      <div className="grid gap-6">
        <Card
          title="Add other admins"
          description="Manage admins for your school system."
          tags={["Admin", "Users", "Management"]}
          onClick={() => navigate("/add-admin")}
        />
        <Card
          title="Add classes"
          description="Create and manage your school's classes."
          tags={["Classes", "Courses", "Schedule"]}
          onClick={() => navigate("/add-class")}
        />
        <Card
          title="Add students"
          description="Enroll new students into your system."
          tags={["Students", "Enrollment", "Registration"]}
          onClick={() => navigate("/students")}
        />
      </div>
    </div>
  )
}

function Card({ title, description, tags, onClick }) {
  return (
    <div onClick={onClick} className="manga-card p-6 cursor-pointer hover:bg-gray-50 transition">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="flex gap-2 mt-2">
          {tags.map((tag, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
