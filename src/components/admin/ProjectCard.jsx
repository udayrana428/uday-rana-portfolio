import { useState } from "react";
import { useDeleteProject } from "../../hooks/projects/useProjects";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

// import { useProjects } from "../../context/ProjectContext";

export default function ProjectCard({ project, onEdit }) {
  // const { deleteProject } = useProjects();
  const deleteProject = useDeleteProject();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(true);
      try {
        await deleteProject.mutateAsync(project._id);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="card bg-surface">
      <img
        src={project?.mainImage?.url || "/placeholder.svg"}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <Link to={`/projects/${project._id}`}>
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        </Link>
        {/* <p className="text-text-secondary mb-4 font-josefin">
          {project.description}
        </p> */}
        <div className="flex justify-between items-center">
          <button onClick={() => onEdit(project)} className="text-2xl ">
            <FaEdit className="text" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-2xl"
          >
            {isDeleting ? "Deleting..." : <MdDelete />}
          </button>
        </div>
      </div>
    </div>
  );
}
