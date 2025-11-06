import React from "react";
import { IoMdArrowDropright } from "react-icons/io";

const Header = ({ heading, subheading }) => {
  return (
    <>
      <header className="mb-5 flex flex-col items-center text-center">
        <h2 className="text-xl md:text-xl tracking-[.5rem] font-bold  border-b-2 border-brand inline-block">
          <IoMdArrowDropright className="ml-2 text-4xl text-brand inline-block" />
          <span className="ml-2">{heading.toUpperCase()}</span>
        </h2>
        <p className="text-lg text-text-secondary  inline-block ">
          {subheading}
        </p>
      </header>
    </>
  );
};

export default Header;
