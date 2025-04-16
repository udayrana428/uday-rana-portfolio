import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

import { delay } from "../../utils/helpers";

const mockAboutData = {
  introduction:
    "Hi, I'm a passionate full-stack developer with 5 years of experience in creating modern web applications.",
  description:
    "I specialize in building scalable web applications using cutting-edge technologies. My journey in software development started with a curiosity about how things work on the internet, and it has evolved into a passion for creating elegant solutions to complex problems. I believe in writing clean, maintainable code and creating intuitive user experiences.",
  image:
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=400&fit=crop",
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description:
        "Lead developer for enterprise-level web applications, managing a team of 5 developers and implementing modern development practices.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd",
      period: "2020 - 2022",
      description:
        "Developed and maintained multiple client projects using React, Node.js, and various cloud technologies.",
    },
    {
      title: "Frontend Developer",
      company: "WebCraft Agency",
      period: "2019 - 2020",
      description:
        "Created responsive web applications and implemented pixel-perfect designs for various clients.",
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      school: "Tech University",
      year: "2019",
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "State University",
      year: "2017",
    },
  ],
  skills: [
    {
      category: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
        "HTML5/CSS3",
      ],
    },
    {
      category: "Backend",
      skills: [
        "Node.js",
        "Express",
        "Python",
        "MongoDB",
        "PostgreSQL",
        "REST APIs",
      ],
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Jest", "Webpack"],
    },
  ],
};

export async function aboutLoader() {
  try {
    await delay(1000);
    return { about: mockAboutData };
  } catch (error) {
    throw new Error("Failed to load about data");
  }
}

export default function About() {
  const { about } = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
        <p className="text-xl text-gray-600">{about.introduction}</p>
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={
                about.image ||
                "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=400&fit=crop"
              }
              alt="Profile"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {about.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Experience Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        <div className="max-w-3xl mx-auto">
          {about.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              className="mb-8 relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-600"
            >
              <div className="absolute left-0 top-0 w-2 h-2 bg-blue-600 rounded-full transform -translate-x-[3px]" />
              <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
              <p className="text-gray-600 mb-1">{exp.company}</p>
              <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
              <p className="text-gray-700">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
        <div className="max-w-3xl mx-auto grid gap-6">
          {about.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
              <p className="text-gray-600 mb-1">{edu.school}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {about.skills.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-blue-600">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl font-bold mb-4">
          Interested in working together?
        </h2>
        <p className="text-gray-600 mb-6">
          I'm always open to discussing new projects and opportunities.
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get in Touch
        </a>
      </motion.div>
    </div>
  );
}
