import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";

import { delay } from "../../utils/helpers";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";

const mockAboutData = {
  introduction:
    "Hi, I'm a passionate Frontend Engineer specializing in the MERN stack with 1 years of hands-on experience in building responsive, user-centric, and scalable web applications. I focus on crafting seamless interfaces, optimizing performance, and delivering engaging digital experiences through clean, maintainable code and modern development practices.",
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
      grade: "9.16 CGPA",
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
    <main className="container mx-auto px-4 py-36 ">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        {/* <h1 className="text-4xl md:text-4xl font-bold mb-6">About Me</h1> */}
        <Header heading="About Me" subheading="Learn more about me" />
        <p className="text-xl text-text-secondary first:text-brand">
          <span className="text-brand font-dancing text-2xl">
            {about.introduction.split(" ")[0]}
          </span>{" "}
          {about.introduction.split(" ").slice(1).join(" ")}
        </p>
      </motion.div>

      {/* Description Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={
                about.image ||
                "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=400&fit=crop"
              }
              alt="Profile"
              className="rounded-lg shadow-lg w-full h-96"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-xl text-center text-text-secondary leading-relaxed first-letter:text-5xl first-letter:font-dancing first-letter:text-brand">
              {about.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        {/* <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2> */}
        <Header heading="Experience" subheading="My Professional Journey" />
        <div className="max-w-3xl mx-auto">
          {about.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-8 relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-brand"
            >
              <div className="absolute left-0 top-0 w-2 h-2 bg-brand rounded-full transform -translate-x-[3px]" />
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                <p className="text-sm mb-2">{exp.period}</p>
              </div>
              <p className="text-brand mb-1">{exp.company}</p>
              <p className="text-text-secondary">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16 "
      >
        {/* <h2 className="text-3xl font-bold mb-8 text-center">Education</h2> */}
        <Header heading="Education" subheading="My Academic Journey" />
        <div className="max-w-3xl mx-auto grid gap-6">
          {about.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              viewport={{ once: true, amount: 0.2 }}
              className=" relative rounded-lg shadow-md p-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-brand"
            >
              <div className="absolute left-0 top-0 w-2 h-2 bg-brand rounded-full transform -translate-x-[3px]" />
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                <span className="text-sm ml-2">{edu.grade}</span>
              </div>
              <p className="text-brand mb-1">{edu.school}</p>
              <p className="text-sm text-text-secondary">{edu.year}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2> */}
        <Header heading="Skills" subheading="My Expertise" />
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {about.skills.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-surface rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-brand text-center">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-background rounded-full text-sm "
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
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl font-bold mb-4">
          Interested in working together?
        </h2>
        <p className="text-text-secondary mb-6">
          I'm always open to discussing new projects and opportunities.
        </p>
        <div className="flex justify-center">
          <Button onClick={() => navigate("/contact")}>Get in Touch</Button>
        </div>
      </motion.div>
    </main>
  );
}
