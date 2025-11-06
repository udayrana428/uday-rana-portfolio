import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-transparent absolute w-full z-50">
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center h-24 tracking-widest font-semibold">
          <Link to="/" className="text-5xl transform -translate-y-2 ">
            Logo
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex space-x-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-brand hover:text-brandDark"
                  : " hover:text-brand"
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-brand" : " hover:text-brand"
              }
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? "text-brand" : " hover:text-brand"
              }
            >
              PROJECTS
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-brand" : " hover:text-brand"
              }
            >
              CONTACT
            </NavLink>
          </div>

          {/* Hamburger */}
          <button className="md:hidden  text-2xl" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
            className="fixed top-0 right-0 h-full w-full transform bg-surface flex flex-col items-start justify-center  space-y-12 px-10"
          >
            <div className="flex justify-between absolute top-20 left-0 px-5 w-full">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-5xl transform -translate-y-2 "
              >
                Logo
              </Link>
              {/* Hamburger */}
              <button className="md:hidden  text-2xl" onClick={toggleMenu}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {["home", "about", "projects", "contact"].map((item, index) => (
              <NavLink
                key={item}
                to={item === "home" ? "/" : `/${item}`}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-5xl w-full ${
                    isActive ? "text-brand" : " hover:text-brand"
                  }`
                }
              >
                {item.toUpperCase()}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
