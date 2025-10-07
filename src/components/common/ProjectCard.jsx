"use client";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to the card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / 10); // adjust tilt sensitivity
    const rotateY = x / 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        bg-[#080D26] rounded-xl shadow-lg overflow-hidden 
        transition-transform duration-300 ease-out 
        [transform-style:preserve-3d] 
        hover:shadow-2xl hover:scale-[1.05] md:w-64 place-self-center
      "
      style={{
        perspective: "1000px",
      }}
    >
      {/* Image */}
      <img
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        className="w-full h-32 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-yellow-200 hover:text-yellow-500">
          <Link to={`/projects/${project._id}`}>{project.title}</Link>
        </h3>

        <p className="text-gray-300 mb-4">
          {project.description.slice(0, 50)}
          {project.description.split(" ").length > 8 && (
            <>
              ...{" "}
              <Link
                to={`/projects/${project._id}`}
                className="text-yellow-400 hover:underline"
              >
                more
              </Link>
            </>
          )}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#02071E] rounded-full text-sm"
            >
              {tech.trim()}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-[#02071E] rounded-full text-sm">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
