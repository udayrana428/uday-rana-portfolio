import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick = () => {},
  classes,
  type = "button",
  isDisabled = false,
}) => {
  return (
    <>
      <motion.button
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={`relative group border-2 border-text-secondary py-3 px-6 font-semibold tracking-widest text-sm flex ${classes}`}
      >
        {children}
        <IoMdArrowDropright className="ml-2 text-xl text-brand" />
        <div className="absolute left-1 top-1/2 -translate-y-1/2 bg-brand w-1 group-hover:w-4 h-[90%] transition-all duration-300"></div>
      </motion.button>
    </>
  );
};

export default Button;
