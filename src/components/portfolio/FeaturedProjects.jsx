"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { getFeaturedProjectsAPI } from "../../api";
import ProjectCardSkeleton from "../common/ProjectCardSkeleton";
import { useFeaturedProjects } from "../../hooks/projects/useProjects";
import Header from "../common/Header";

export default function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading, error } = useFeaturedProjects();

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
            className="flex-shrink-0 w-72 h-96 bg-surface rounded overflow-hidden hover:border hover:shadow-lg hover:shadow-brand border-text-secondary "
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={`${project?.mainImage?.url}?w=400&f=webp&q=auto`}
              srcSet={`
                ${project?.mainImage?.url}?w=400&f=webp&q=auto 400w,
                ${project?.mainImage?.url}?w=800&f=webp&q=auto 800w,
                ${project?.mainImage?.url}?w=1200&f=webp&q=auto 1200w
              `}
              sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
              alt={project?.title}
              loading="lazy"
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)]">
              <div>
                <h3 className="font-semibold text-lg text-brand mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack.slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-background rounded-full text-sm"
                  >
                    {tech.trim()}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-1 bg-background rounded-full text-sm">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>
              {/* URL */}
              {/* <div className="flex gap-2 mt-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 border border-brand text-brand rounded rounded-xl text-xs font-medium hover:bg-brand hover:text-background transition"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 border border-text-primary  rounded rounded-xl text-xs"
                  >
                    Code
                  </a>
                )}
              </div> */}
            </div>
          </motion.div>
        </Link>
      )),
    [featuredProjects]
  );

  useEffect(() => {
    console.log("Data: ", data);
    if (data) {
      setFeaturedProjects(data.data.data.projects);
    }
  }, [data]);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     setIsLoading(true);
  //     const response = await getFeaturedProjectsAPI().then((res) => res.data);
  //     if (response.success === true) {
  //       setFeaturedProjects(response.data.projects);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchProjects();
  // }, []);

  // if (isLoading) return;

  if (featuredProjects.length === 0) return;

  return (
    <section ref={containerRef} className="relative h-[300vh] " id="projects">
      {/* Sticky viewport section */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
        <Header heading="Projects" subheading="Check out my work" />

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
