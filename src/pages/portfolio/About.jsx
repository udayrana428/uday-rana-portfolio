import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";

import { delay } from "../../utils/helpers";
import Button from "../../components/common/Button";

const mockAboutData = {
  introduction:
    "Hi, I'm a passionate full-stack developer with 2 years of experience in creating modern web applications.",
  description:
    "I specialize in building scalable web applications using cutting-edge technologies. My journey in software development started with a curiosity about how things work on the internet, and it has evolved into a passion for creating elegant solutions to complex problems. I believe in writing clean, maintainable code and creating intuitive user experiences.",
  image:
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=400&fit=crop",
  experience: [
    {
      title: "MERN Stack Developer",
      company: "Elite Back Office Solutions",
      period: "Mar 2025 - Present",
      description:
        "Worked on full stack development of responsive web applications using React.js, Node.js, and Express.js. Built RESTful APIs, integrated MongoDB schemas, and implemented real-time features using WebSockets. Collaborated with the UI/UX team for seamless integration, ensuring optimal performance across devices. Applied Agile practices and wrote unit tests for robust and maintainable code.",
    },
    {
      title: "UI/UX Developer",
      company: "Elite Back Office Solutions",
      period: "Sep 2024 - Mar 2025",
      description: `Worked on developing responsive and user-friendly web interfaces using React.js and Tailwind CSS. 
        Collaborated with UI/UX designers to translate designs into high-quality code. 
        Integrated RESTful APIs, improved crossbrowser compatibility, and enhanced performance through lazy loading and optimized rendering techniques.
`,
    },
  ],
  education: [
    {
      degree: "Master of Computer Application",
      school: "Shri Ramdeobaba College of Engineering and Management",
      year: "2023-2025",
      grade: "9.21 CGPA",
    },
    {
      degree: "Bachelor of Computer Application",
      school: "City Premier College",
      year: "2019-2022",
      grade: "8.55 CGPA",
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
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"],
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Jest", "Webpack"],
    },
  ],
};

export async function aboutLoader() {
  try {
    // await delay(1000);
    return { about: mockAboutData };
  } catch (error) {
    throw new Error("Failed to load about data");
  }
}

export default function About() {
  const { about } = useLoaderData();

  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-36 ">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        {/* <h1 className="text-4xl md:text-4xl font-bold mb-6">About Me</h1> */}
        <h2 className="text-xl md:text-xl tracking-[.5rem] font-bold mb-4 flex items-center justify-center text-gray-300">
          <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
          ABOUT ME
        </h2>
        <p className="text-xl text-gray-300">{about.introduction}</p>
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto mb-16"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={
                about.image ||
                "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=400&fit=crop"
              }
              alt="Profile"
              className="rounded-lg shadow-lg w-full h-96"
            />
          </div>
          <div>
            <p className="text-xl text-center text-gray-300 leading-relaxed">
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
        {/* <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2> */}
        <h2 className="text-xl md:text-xl tracking-[.5rem] font-bold mb-4 flex items-center justify-center text-gray-300">
          <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
          EXPERIENCE
        </h2>
        <div className="max-w-3xl mx-auto">
          {about.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              className="mb-8 relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-yellow-200"
            >
              <div className="absolute left-0 top-0 w-2 h-2 bg-yellow-200 rounded-full transform -translate-x-[3px]" />
              <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
              <p className="text-gray-300 mb-1">{exp.company}</p>
              <p className="text-sm text-gray-300 mb-2">{exp.period}</p>
              <p className="text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16 "
      >
        {/* <h2 className="text-3xl font-bold mb-8 text-center">Education</h2> */}
        <h2 className="text-xl md:text-xl tracking-[.5rem] font-bold mb-4 flex items-center justify-center text-gray-300">
          <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
          EDUCATION
        </h2>
        <div className="max-w-3xl mx-auto grid gap-6">
          {about.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              className=" relative rounded-lg shadow-md p-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-yellow-200"
            >
              <div className="absolute left-0 top-0 w-2 h-2 bg-yellow-200 rounded-full transform -translate-x-[3px]" />
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                <span className="text-gray-300 ml-2">{edu.grade}</span>
              </div>
              <p className="text-gray-300 mb-1">{edu.school}</p>
              <p className="text-sm text-gray-300">{edu.year}</p>
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
        {/* <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2> */}
        <h2 className="text-xl md:text-xl tracking-[.5rem] font-bold mb-4 flex items-center justify-center text-gray-300">
          <IoMdArrowDropright className="ml-2 text-2xl text-yellow-200" />
          SKILLS
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {about.skills.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index }}
                className="bg-[#080D29] rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-blue-600">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-[#02071E] rounded-full text-sm "
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
        <p className="text-gray-300 mb-6">
          I'm always open to discussing new projects and opportunities.
        </p>
        <div className="flex justify-center">
          <Button onClick={() => navigate("/contact")}>Get in Touch</Button>
        </div>
      </motion.div>
    </div>
  );
}
