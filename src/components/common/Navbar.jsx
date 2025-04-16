import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="bg-transparent absolute w-full z-50">
      <div className="container mx-auto md:px-52">
        <div className="flex justify-around items-center h-24 tracking-widest font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-200"
                : "text-gray-200 hover:text-yellow-200"
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-200"
                : "text-gray-200 hover:text-yellow-200"
            }
          >
            ABOUT
          </NavLink>
          <Link
            to="/"
            className="text-5xl transform -translate-y-2 text-white font-bold "
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              U
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              R
            </motion.span>
          </Link>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-200"
                : "text-gray-200 hover:text-yellow-200"
            }
          >
            PROJECTS
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-200"
                : "text-gray-200 hover:text-yellow-200"
            }
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
