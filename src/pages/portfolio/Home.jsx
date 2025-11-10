import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../../components/portfolio/Hero";
import FeaturedProjects from "../../components/portfolio/FeaturedProjects";
import Skills from "../../components/portfolio/Skills";

import { delay } from "../../utils/helpers";
import { getAllProjectsAPI } from "../../api";
import CoreValues from "../../components/portfolio/CoreValues";
import { useState } from "react";
import Testimonials from "../../components/portfolio/Testimonials";
import { Helmet } from "react-helmet-async";

// export async function homeLoader() {
//   try {
//     // await delay(1000);
//     const response = await getAllProjectsAPI();
//     const featuredProjects = response.data.filter(
//       (project) => project.featured
//     );
//     const skills = [
//       {
//         category: "Frontend",
//         skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
//       },
//       {
//         category: "Backend",
//         skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
//       },
//     ];
//     return {
//       featuredProjects,
//       hero,
//       skills, // Add mock skills data
//     };
//   } catch (error) {
//     console.error("Home loader error:", error);
//     throw new Error("Failed to load home data");
//   }
// }

export default function Home() {
  // const { hero, featuredProjects, skills } = useLoaderData();

  return (
    <>
      <Helmet>
        <title>Uday Rana | Full Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Uday Rana – Full Stack Developer specializing in React, Node.js, TailwindCSS and modern web development."
        />
        <link rel="canonical" href="https://uday-rana-portfolio.vercel.app/" />

        <meta property="og:title" content="Uday Rana | Full Stack Developer" />
        <meta
          property="og:description"
          content="Explore my projects, skills and experience."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen "
      >
        <Hero />
        <CoreValues />
        <FeaturedProjects />
        <Skills />
        {/* <Testimonials /> */}
      </motion.main>
    </>
  );
}
