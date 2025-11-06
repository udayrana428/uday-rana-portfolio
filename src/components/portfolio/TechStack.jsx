import { motion } from "framer-motion";

export default function TechStack({ technologies }) {
  // Animation variants for container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for items
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold font-josefin">Technologies Used</h2>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {technologies.map((tech, index) => (
          <motion.span
            key={index}
            variants={item}
            className="px-3 py-1 bg-surface  rounded-full text-sm font-medium hover:bg-brand hover:text-background transition-colors"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
