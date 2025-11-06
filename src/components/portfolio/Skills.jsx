import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { IoMdArrowDropright } from "react-icons/io";
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
    },
    {
      name: "CSS",
      image: "/images/css.webp",
    },
    {
      name: "JavaScript",
      image: "/images/javascript.webp",
    },
    {
      name: "Tailwind",
      image: "/images/tailwindcss.webp",
    },
    {
      name: "Bootstrap",
      image: "/images/bootstrap.webp",
    },
    {
      name: "React",
      image: "/images/react.webp",
    },
    {
      name: "Nodejs",
      image: "/images/node.webp",
    },
    {
      name: "Mongodb",
      image: "/images/mongodb.webp",
    },
    {
      name: "Nodejs",
      image: "/images/redux.webp",
    },
    {
      name: "Git",
      image: "/images/git.webp",
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

        const image = el.querySelector("img");
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
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="media-item bg-text-primary p-2 rounded-xl"
            >
              <img
                src={skill.image}
                alt=""
                loading="lazy"
                className="w-[8vw] h-[8vw] object-contain rounded-md pointer-events-none will-change-transform max-md:w-[20vw] max-md:h-[20vw] "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
