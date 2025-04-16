import { useLoaderData } from "react-router-dom";
import ProjectGrid from "../../components/portfolio/ProjectGrid";
import ProjectFilter from "../../components/portfolio/ProjectFilter";
import { useState } from "react";

import { delay } from "../../utils/helpers";
import { getAllProjectsAPI } from "../../api";
import { IoMdArrowDropright } from "react-icons/io";

export async function projectsLoader() {
  try {
    const response = await getAllProjectsAPI();
    return {
      projects: response.data,
      categories: ["All", "Web Development", "Mobile Apps", "UI/UX Design"],
    };
  } catch (error) {
    throw new Error("Failed to load projects");
  }
}

export default function Projects() {
  const { projects, categories } = useLoaderData();
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter(
          (project) => String(project.category).toLocaleLowerCase() === filter
        );

  return (
    <div className="container mx-auto px-4 py-36 bg-[_#02071E] text-white">
      <h2 className="text-xl md:text-base tracking-[.5rem] font-bold mb-4 flex items-center text-gray-300">
        <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
        PROJECTS
      </h2>
      <ProjectFilter
        categories={categories}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <ProjectGrid projects={filteredProjects} />
    </div>
  );
}
