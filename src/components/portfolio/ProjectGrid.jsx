import { Link } from "react-router-dom";
import ProjectCard from "../common/ProjectCard";
import ProjectCardSkeleton from "../common/ProjectCardSkeleton";

export default function ProjectGrid({ projects, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-3xl font-josefin text-brand">Launching Soon...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
