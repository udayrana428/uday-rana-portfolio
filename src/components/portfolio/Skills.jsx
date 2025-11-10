import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { IoMdArrowDropright } from "react-icons/io";
import { IoLogoHtml5 } from "react-icons/io5";
import { IoLogoCss3 } from "react-icons/io5";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTailwindcss } from "react-icons/si";
import { FaBootstrap } from "react-icons/fa";
import { IoLogoReact } from "react-icons/io5";
import { IoLogoNodejs } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";

import { FaGitAlt } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";

import Header from "../common/Header";

gsap.registerPlugin(InertiaPlugin);

export default function Skills() {
  const rootRef = useRef(null);
  const oldPos = useRef({ x: 0, y: 0 });
  const delta = useRef({ x: 0, y: 0 });

  const skills = [
    {
      name: "HTML",
      image: "/images/html.webp",
      icon: IoLogoHtml5,
    },
    {
      name: "CSS",
      image: "/images/css.webp",
      icon: IoLogoCss3,
    },
    {
      name: "JavaScript",
      image: "/images/javascript.webp",
      icon: IoLogoJavascript,
    },
    {
      name: "TypeScript",
      image: "/images/redux.webp", // need to change
      icon: BiLogoTypescript,
    },
    {
      name: "Tailwind",
      image: "/images/tailwindcss.webp",
      icon: SiTailwindcss,
    },
    {
      name: "Bootstrap",
      image: "/images/bootstrap.webp",
      icon: FaBootstrap,
    },
    {
      name: "React",
      image: "/images/react.webp",
      icon: IoLogoReact,
    },
    {
      name: "Nodejs",
      image: "/images/node.webp",
      icon: IoLogoNodejs,
    },
    {
      name: "Mongodb",
      image: "/images/mongodb.webp",
      icon: SiMongodb,
    },
    {
      name: "Git",
      image: "/images/git.webp",
      icon: FaGitAlt,
    },
  ];

  useEffect(() => {
    const root = rootRef.current;

    const handleMouseMove = (e) => {
      delta.current.x = e.clientX - oldPos.current.x;
      delta.current.y = e.clientY - oldPos.current.y;

      oldPos.current.x = e.clientX;
      oldPos.current.y = e.clientY;
    };

    root.addEventListener("mousemove", handleMouseMove);

    const items = root.querySelectorAll(".media-item");
    items.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const tl = gsap.timeline({
          onComplete: () => tl.kill(),
        });
        tl.timeScale(1.2);

        const image = el.querySelector("svg");
        tl.to(image, {
          inertia: {
            x: {
              velocity: delta.current.x * 30,
              end: 0,
            },
            y: {
              velocity: delta.current.y * 30,
              end: 0,
            },
          },
        });
        tl.fromTo(
          image,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      });
    });

    return () => {
      root.removeEventListener("mousemove", handleMouseMove);
      items.forEach((el) => el.replaceWith(el.cloneNode(true))); // Clean listeners
    };
  }, []);

  return (
    <section ref={rootRef} className=" py-10 max-w-6xl mx-auto">
      <div className="container overflow-hidden relative grid place-items-center md:h-screen">
        {/* HEADER */}
        <Header heading="Skills" subheading="My technical skills" />
        {/* MEDIA GRID */}
        <div className="grid md:grid-cols-5 gap-[4vw] max-md:gap-[10vw] max-md:grid-cols-3">
          {skills.map((skill, idx) => {
            const Icon = skill.icon || IoMdArrowDropright;
            return (
              <div
                key={idx}
                className="media-item group bg- p-2 rounded-xl items-center justify-center flex flex-col"
              >
                {/* <img
                src={skill.image}
                alt=""
                loading="lazy"
                className="w-[8vw] h-[8vw] object-contain rounded-md pointer-events-none will-change-transform max-md:w-[20vw] max-md:h-[20vw] "
              /> */}
                <Icon className="text-7xl hover:text-brand" />
                <p className="text-center mt-4 opacity-0 text-brand group-hover:opacity-100 transition transition-opacity ease-in duration-300">
                  {skill.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
