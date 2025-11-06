import { useLoaderData } from "react-router-dom";
import ProjectGrid from "../../components/portfolio/ProjectGrid";
import { useEffect, useState } from "react";

import { delay } from "../../utils/helpers";
import { getAllProjectsAPI } from "../../api";
import { IoMdArrowDropright } from "react-icons/io";
import { useProjects } from "../../hooks/projects/useProjects";
import Header from "../../components/common/Header";

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
  // const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ category: "", page: 1, limit: 10 });

  const { data, isLoading, error, isError } = useProjects(filters);

  const [categories, setCategories] = useState([
    "All",
    "Frontend",
    "Backend",
    "FullStack",
  ]);
  // const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: category.toLowerCase() === "all" ? "" : category.toLowerCase(),
    }));
  };

  const projects = data?.data?.projects || [];

  // useEffect(() => {
  //   const fetchAllProjects = async () => {
  //     setIsLoading(true);
  //     const response = await getAllProjectsAPI(filters).then((res) => res.data);
  //     if (response.success === true) {
  //       setProjects(response.data.projects);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchAllProjects();
  // }, [filters]);

  return (
    <main className="container mx-auto px-4 py-36">
      <Header heading="Projects" subheading="Check out my projects" />
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`px-4 py-2 rounded-full ${
              (filters.category === "" && category.toLowerCase() === "all") ||
              filters.category === category.toLowerCase()
                ? "bg-text-primary text-background"
                : "bg-surface text-text-secondary hover:bg-text-primary hover:text-background"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <ProjectGrid projects={projects} isLoading={isLoading} />
    </main>
  );
}
