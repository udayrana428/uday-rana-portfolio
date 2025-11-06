import { CgProfile } from "react-icons/cg";
import {
  FaGithub,
  FaHome,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-text-secondary">
              Building amazing web experiences with modern technologies.
            </p>
          </div>
          <div className="grid grid-cols-2 ">
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-text-secondary hover:text-brand">
                    <FaHome className="mr-1 inline-block" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-text-secondary hover:text-brand"
                  >
                    <CgProfile className="mr-1 inline-block" />
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="text-text-secondary hover:text-brand"
                  >
                    <GoProject className="mr-1 inline-block" />
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-text-secondary hover:text-brand"
                  >
                    <FaPhone className="mr-1 inline-block" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/udayrana428"
                    target="_blank"
                    className="text-text-secondary hover:text-brand "
                  >
                    <FaGithub className="mr-1 inline-block" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/uday-rana-678879193/"
                    target="_blank"
                    className="text-text-secondary hover:text-brand"
                  >
                    <FaLinkedin className="mr-1 inline-block" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/udayrana428"
                    target="_blank"
                    className="text-text-secondary hover:text-brand"
                  >
                    <FaTwitter className="mr-1 inline-block" />
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-text-secondary text-center text-text-secondary">
          <p>&copy; 2025 Uday Rana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
