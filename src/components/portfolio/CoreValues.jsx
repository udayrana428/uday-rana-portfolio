import React, { useState } from "react";
import demoImage from "../../assets/textures/gltf_embedded_0.png";

import { IoTerminal } from "react-icons/io5";
import { CgIfDesign } from "react-icons/cg";
import { CgPerformance } from "react-icons/cg";
import { RiTeamLine } from "react-icons/ri";

import { motion } from "framer-motion";

const CoreValues = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const coreValues = [
    {
      icon: IoTerminal,
      title: "CLEAN CODE",
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*YGllHv3pophTVibKQbIbzg.jpeg",
    },
    {
      icon: CgIfDesign,
      title: "THOUGHTFUL DESIGN",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZumDL2e1QYcuOSkBSBqBnNAqZJEZ47KDViaaYqhoGf0e-DB7aJR8hzR7CG3ouuOTTI&usqp=CAU",
    },
    {
      icon: CgPerformance,
      title: "HIGH PERFORMANCE",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVgZOG-ua7DND7JCH8Or9lLluanPdxGsWn9w&s",
    },
    {
      icon: RiTeamLine,
      title: "TEAM SPIRIT",
      image:
        "https://blogimage.vantagecircle.com/content/images/2020/12/Team_Spirit.png",
    },
  ];

  const handleShowCard = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-10 bg-[#02071E] text-white h-full" id="projects">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreValues.map((value, index) => (
            <motion.div
              transition={{ duration: 0.8 }}
              key={index}
              className={`relative rounded-md border-2 ${
                activeIndex === index ? "border-[_#0F2258]" : "border-gray-500"
              } bg-[_#080D29] p-2 flex flex-col items-center gap-3 ${
                activeIndex === index ? "py-5" : "py-16"
              } w-full  h-fit cursor-pointer hover:scale-105 transition duration-700 overflow-hidden`}
              onMouseOver={() => handleShowCard(index)}
            >
              {activeIndex === index && (
                <motion.img
                  initial={{ opacity: 0, y: -200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  src={value.image}
                  alt="demo"
                  className="object-fill mb-3 w-[225px] h-[225px]"
                />
              )}
              {activeIndex !== index &&
                value.icon({ className: "text-7xl mb-3 text-[_#7385BE]" })}
              <motion.h2 className="text-yellow-200 tracking-widest text-center">
                {value.title}
              </motion.h2>
              {/* Bottom bar animation only on hover */}
              {activeIndex === index && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "50%" }}
                  exit={{ width: "0%" }}
                  transition={{ duration: 0.8 }}
                  className="absolute bottom-0  h-1 bg-[#8AEAF8]"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
