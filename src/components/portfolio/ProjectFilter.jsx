export default function ProjectFilter({
  categories,
  activeFilter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category.toLowerCase())}
          className={`px-4 py-2 rounded-full ${
            activeFilter === category.toLowerCase()
              ? "bg-white text-black"
              : "bg-[#080D26] text-gray-300 hover:bg-gray-200 hover:text-black"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
