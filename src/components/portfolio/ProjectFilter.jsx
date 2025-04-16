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
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
