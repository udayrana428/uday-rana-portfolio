import { useLoaderData } from "react-router-dom";
import ProjectGrid from "../../components/portfolio/ProjectGrid";
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
    "Frontend",
    "Backend",
    "FullStack",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilter] = useState({ category: "", page: 1, limit: 5 });

  const handleFilterChange = (category) => {
    setFilter((prev) => ({
      ...prev,
      category: category.toLowerCase() === "all" ? "" : category.toLowerCase(),
    }));
  };

  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoading(true);
      const response = await getAllProjectsAPI(filters).then((res) => res.data);
      if (response.success === true) {
        setProjects(response.data.projects);
      }
      setIsLoading(false);
    };
    fetchAllProjects();
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-36">
      <h2 className="text-xl md:text-xl tracking-[.5rem] font-bold mb-4 flex items-center justify-center text-gray-300">
        <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
        PROJECTS
      </h2>
      <div className="flex flex-wrap mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`px-4 py-2 rounded-full ${
              filters.category === category.toLowerCase()
                ? "bg-white text-black"
                : "bg-[#080D26] text-gray-300 hover:bg-gray-200 hover:text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <ProjectGrid projects={projects} isLoading={isLoading} />
    </div>
  );
}
