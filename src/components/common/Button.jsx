import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { motion } from "framer-motion";

const Button = ({ children }) => {
  return (
    <>
      <motion.button className="relative group border-2 border-gray-200 py-3 px-6 font-semibold tracking-widest text-sm flex ">
        {children}
        <IoMdArrowDropright className="ml-2 text-xl text-yellow-200" />
        <div className="absolute left-1 top-1/2 -translate-y-1/2 bg-yellow-200 w-1 group-hover:w-4 h-[90%] transition-all duration-300"></div>
      </motion.button>
    </>
  );
};

export default Button;
