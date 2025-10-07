"use client";
import Button from "../common/Button";
import { IoMdArrowDropright } from "react-icons/io";
import { useRef, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

export default function FeaturedProjects({ projects }) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // ✅ detect section visibility (for fade-in)
  const inView = useInView(sectionRef, { amount: 0.2, once: true });

  // ✅ track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // ✅ smooth progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  console.log("featuer");

  // ✅ map progress -> translateX
  const x = useTransform(
    smoothProgress,
    [0, 1],
    [0, -(projects.length - 1) * 250]
  );

  // ✅ derive active index from scroll
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(smoothProgress, "change", (p) => {
    setActiveIndex(
      Math.min(Math.floor(p * projects.length), projects.length - 1)
    );
  });

  const projectCards = useMemo(
    () =>
      projects.map((project, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            style={{ scale: isActive ? 1.1 : 0.85 }}
            className={`flex-shrink-0 bg-[#080D26] rounded-lg shadow-lg overflow-hidden border-2 
              transition-all duration-300 ease-out
              ${
                isActive
                  ? "border-yellow-200 shadow-2xl shadow-yellow-200/20 w-80 h-96"
                  : "border-gray-500 w-64 h-80"
              }`}
          >
            <div className="relative h-full">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className={`w-full object-cover transition-all duration-300 ${
                  isActive ? "h-48" : "h-40"
                }`}
                loading="lazy"
                decoding="async"
              />
              <div className="p-4 h-full flex flex-col justify-between">
                <div>
                  <h3
                    className={`font-bold mb-2 text-white transition-all duration-300 ${
                      isActive ? "text-lg" : "text-base"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-gray-300 mb-4 transition-all duration-300 ${
                      isActive ? "text-sm line-clamp-3" : "text-xs line-clamp-2"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {isActive && (
                  <div className="flex gap-2 mt-auto opacity-100 transition-opacity duration-300">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-yellow-200 text-black rounded text-xs font-medium hover:bg-yellow-300 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 border border-gray-400 text-gray-300 rounded text-xs hover:bg-gray-700 transition-colors"
                      >
                        Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      }),
    [projects, inView, activeIndex]
  );

  return (
    <section
      ref={containerRef}
      className="py-20 h-[300vh] relative"
      id="projects"
    >
      <div
        ref={sectionRef}
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
      >
        <div className="container mx-auto px-4 py-5">
          <h2 className="text-xl md:text-xl tracking-[.5rem] font-bold mb-4 flex items-center justify-center text-gray-300">
            <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
            FEATURED PROJECTS
          </h2>

          <div className="relative w-full h-96 overflow-hidden">
            <motion.div
              style={{ x }}
              className="flex items-center gap-14 absolute left-1/2 transform -translate-x-1/2"
            >
              {projectCards}
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-yellow-200 w-6"
                    : "bg-gray-600 w-2"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={() => navigate("/projects")}>MORE PROJECTS</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
