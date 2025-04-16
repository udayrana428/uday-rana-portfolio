import { useState } from "react";
import { useProjects } from "../../context/ProjectContext";

export default function ProjectCard({ project, onEdit }) {
  const { deleteProject } = useProjects();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(true);
      try {
        await deleteProject(project._id);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="card">
      <img
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
          <button onClick={() => onEdit(project)} className="btn btn-primary">
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-secondary"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
