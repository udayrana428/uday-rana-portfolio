import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-0 right-0 mb-6 mr-6 z-50 border-2 border-brand text-4xl ring-2 ring-offset-4 ring-brand ring-offset-background rounded-full "
        >
          <FaChevronUp className=" text-brand text-4xl p-1 animate-pulse" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
