import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <aside
      className={`
          bg-surface p-4 min-h-screen transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
          max-md:fixed max-md:top-0 max-md:left-0 max-md:h-screen max-md:w-40 max-md:z-50
        `}
    >
      <div
        onClick={handleShowSidebar}
        className="absolute -right-10 top-40 bg-surface text-4xl rounded-r-full p-2 md:hidden"
      >
        {showSidebar ? (
          <FaChevronLeft className="" />
        ) : (
          <FaChevronRight className="" />
        )}
      </div>
      <div className="text-xl font-bold mb-8">Admin Dashboard</div>
      <nav className="space-y-2">
        <NavLink
          to="/admin"
          end
          onClick={() => setShowSidebar(false)}
          className={({ isActive }) =>
            `block p-2 rounded-lg ${
              isActive ? "bg-surfaceAlt" : "hover:bg-background"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/projects"
          onClick={() => setShowSidebar(false)}
          className={({ isActive }) =>
            `block p-2 rounded-lg ${
              isActive ? "bg-surfaceAlt" : "hover:bg-background"
            }`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/admin/profile"
          onClick={() => setShowSidebar(false)}
          className={({ isActive }) =>
            `block p-2 rounded-lg ${
              isActive ? "bg-surfaceAlt" : "hover:bg-background"
            }`
          }
        >
          Profile
        </NavLink>
        <button
          onClick={handleLogout}
          className="block w-full text-left p-2 rounded-lg hover:bg-background"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
