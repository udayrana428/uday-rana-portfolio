import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { IoMdArrowDropright } from "react-icons/io";
import { useState } from "react";

export default function FeaturedProjects({ projects }) {
  const [scrollIndex, setScrollIndex] = useState(0);
  return (
    <section className="py-20 bg-[_#02071E] text-white" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-base tracking-[.5rem] font-bold mb-4 flex items-center text-gray-300">
            <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
            PORTFOLIO
          </h2>
          {/* <p className="text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and
            experience
          </p> */}
        </div>
        <div className="flex items-center gap-8 overflow-x-scroll scrollbar-hide">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`min-w-[20rem] ${
                scrollIndex === index
                  ? "h-[30rem] min-w-[30rem]"
                  : "h-72 min-w-[20rem]"
              } bg-[_#080D26] rounded-lg shadow-lg overflow-hidden p-5 border-2 border-gray-500`}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className={`w-full ${
                  scrollIndex === index ? "h-[70%]" : "h-36"
                } object-cover`}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                {/* <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div> */}
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex md:justify-end -mt-12 md:mr-10 ">
          <Button>
            <Link to="/projects">MORE PROJECTS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
