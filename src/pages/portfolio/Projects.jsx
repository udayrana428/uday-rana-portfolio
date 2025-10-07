import { useLoaderData } from "react-router-dom";
import ProjectGrid from "../../components/portfolio/ProjectGrid";
import ProjectFilter from "../../components/portfolio/ProjectFilter";
import { useEffect, useState } from "react";

import { delay } from "../../utils/helpers";
import { getAllProjectsAPI } from "../../api";
import { IoMdArrowDropright } from "react-icons/io";

// export async function projectsLoader() {
//   try {
//     const response = await getAllProjectsAPI();
//     return {
//       projects: response.data,
//       categories: ["All", "Web Development", "Mobile Apps", "UI/UX Design"],
//     };
//   } catch (error) {
//     throw new Error("Failed to load projects");
//   }
// }

export default function Projects() {
  // const { projects, categories } = useLoaderData();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([
    "All",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter(
          (project) => String(project.category).toLocaleLowerCase() === filter
        );

  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoading(true);
      const response = await getAllProjectsAPI();
      if (response) setProjects(response.data);
      setIsLoading(false);
    };
    fetchAllProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-36">
      <h2 className="text-xl md:text-xl tracking-[.5rem] font-bold mb-4 flex items-center justify-center text-gray-300">
        <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
        PROJECTS
      </h2>
      <ProjectFilter
        categories={categories}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <ProjectGrid projects={filteredProjects} isLoading={isLoading} />
    </div>
  );
}
