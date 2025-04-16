import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-8">Admin Dashboard</div>
      <nav className="space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `block p-2 rounded-lg ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/projects"
          className={({ isActive }) =>
            `block p-2 rounded-lg ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `block p-2 rounded-lg ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          Profile
        </NavLink>
        <button
          onClick={handleLogout}
          className="block w-full text-left p-2 rounded-lg hover:bg-gray-700"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
