const mockSkills = [
  {
    category: "Frontend",
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"],
  },
  {
    category: "Tools & Others",
    skills: ["Git", "Docker", "AWS", "Figma", "Agile Methodology"],
  },
];

// Helper function to simulate API delay
export const delay = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Error handler
const handleError = (error) => {
  console.error("API Error:", error);
  throw new Error(error.message || "Something went wrong");
};

export async function logoutAction() {
  try {
    await delay();
    // Simulate logout
    return { success: true };
  } catch (error) {
    return handleError(error);
  }
}

// Profile actions
