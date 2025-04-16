import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../../components/portfolio/Hero";
import FeaturedProjects from "../../components/portfolio/FeaturedProjects";
import Skills from "../../components/portfolio/Skills";

import { delay } from "../../utils/helpers";
import { getAllProjectsAPI } from "../../api";
import CoreValues from "../../components/portfolio/CoreValues";

export async function homeLoader() {
  try {
    await delay(1000);
    const response = await getAllProjectsAPI();
    const featuredProjects = response.data.filter(
      (project) => project.featured
    );
    const hero = {
      title: "UDAY RANA",
      subtitle: "DESIGNER & DEVELOPER",
      description: "CODE. DESIGN. CREATE. REPEAT",
    };
    const skills = [
      {
        category: "Frontend",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Backend",
        skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
      },
    ];
    return {
      featuredProjects,
      hero,
      skills, // Add mock skills data
    };
  } catch (error) {
    console.error("Home loader error:", error);
    throw new Error("Failed to load home data");
  }
}

export default function Home() {
  const { hero, featuredProjects, skills } = useLoaderData();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Hero {...hero} />
      <CoreValues />
      <FeaturedProjects projects={featuredProjects} />
      {/* <Skills skills={skills} /> */}
    </motion.main>
  );
}
