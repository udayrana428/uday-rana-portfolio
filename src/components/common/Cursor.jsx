import { useEffect, useRef } from "react";
import "./Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    document.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    requestAnimationFrame(function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      requestAnimationFrame(loop);
    });

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      item.addEventListener("mouseover", (e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();

        if (item.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (item.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      });

      item.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      });
    });
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
