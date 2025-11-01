"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { getFeaturedProjectsAPI } from "../../api";
import ProjectCardSkeleton from "../common/ProjectCardSkeleton";

export default function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth the motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.3,
  });

  // Map progress -> horizontal movement
  const x = useTransform(
    smoothProgress,
    [0, 1],
    [0, -(featuredProjects.length - 1) * 320] // width of each card + gap
  );

  // Memoize cards
  const projectCards = useMemo(
    () =>
      featuredProjects.map((project, index) => (
        <Link key={project._id || index} to={`/projects/${project._id}`}>
          <motion.div
            key={project._id || index}
            className="flex-shrink-0 w-72 h-96 bg-[#080D29] rounded-2xl overflow-hidden border border-gray-700 shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={project.mainImage.url || "/placeholder.svg"}
              alt={project.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-white flex flex-col justify-between h-[calc(100%-12rem)]">
              <div>
                <h3 className="font-semibold text-lg text-yellow-200 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {project.description}
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-yellow-200 text-black rounded text-xs font-medium hover:bg-yellow-300 transition"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 border border-gray-400 text-gray-300 rounded text-xs hover:bg-gray-700 transition"
                  >
                    Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </Link>
      )),
    [featuredProjects]
  );

  // useEffect(async () => {
  //   // Filter projects to only show those with liveUrl
  //   const projects = await getAllProjectsAPI();
  //   const filteredProjects = projects.filter((project) => project.liveUrl);
  //   setFeaturedProjects(filteredProjects);
  // }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const response = await getFeaturedProjectsAPI().then((res) => res.data);
      if (response.success === true) {
        setFeaturedProjects(response.data.projects);
      }
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  // if (isLoading) return;

  return (
    <section ref={containerRef} className="relative h-[300vh] " id="projects">
      {/* Sticky viewport section */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
        <h2 className="text-xl md:text-xl tracking-[.5rem] font-bold mb-4 flex items-center justify-center text-gray-300">
          <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
          FEATURED PROJECTS
        </h2>

        {/* Horizontal sliding cards */}
        <div className="relative w-full h-[400px] overflow-visible">
          <motion.div
            style={{ x }}
            className="flex items-center gap-16 absolute left-1/2 transform -translate-x-1/2"
          >
            {/* {projectCards} */}
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton />)}
            {!isLoading && projectCards}
          </motion.div>
        </div>

        {/* Button */}
        <div className="mt-10">
          <Button onClick={() => navigate("/projects")}>MORE PROJECTS</Button>
        </div>
      </div>
    </section>
  );
}
