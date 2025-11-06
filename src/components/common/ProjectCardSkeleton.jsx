import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div
      className="
        bg-surface rounded-xl shadow-lg overflow-hidden
        animate-pulse md:w-64 place-self-center
      "
    >
      {/* Image placeholder */}
      <div className="w-full h-32 bg-background" />

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-background rounded w-3/4" />
        <div className="h-4 bg-background rounded w-full" />
        <div className="h-4 bg-background rounded w-5/6" />

        <div className="flex flex-wrap gap-2 mt-3">
          <div className="px-4 py-2 bg-background rounded-full w-16 h-6" />
          <div className="px-4 py-2 bg-background rounded-full w-20 h-6" />
          <div className="px-4 py-2 bg-background rounded-full w-14 h-6" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
