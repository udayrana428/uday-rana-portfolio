import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div className=" rounded-xl shadow-md overflow-hidden animate-pulse md:w-64 place-self-center">
      {/* Image placeholder */}
      <div className="w-full h-40 bg-text-secondary" />

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-text-secondary rounded w-3/4" />
        {/* Description */}
        <div className="h-4 bg-text-secondary rounded w-full" />
        <div className="h-4 bg-text-secondary rounded w-5/6" />

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="h-6 w-16 bg-text-secondary rounded-full" />
          <div className="h-6 w-20 bg-text-secondary rounded-full" />
          <div className="h-6 w-14 bg-text-secondary rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
