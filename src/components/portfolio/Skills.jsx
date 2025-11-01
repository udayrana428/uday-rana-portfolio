// SkillsSection.jsx
import { useEffect, useRef } from "react";

export default function SkillsSection() {
  const canvasRef = useRef(null);
  const skills = [
    "React",
    "Node.js",
    "MongoDB",
    "Tailwind",
    "JavaScript",
    "Git",
    "HTML",
    "CSS",
  ];
  const balls = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    class Ball {
      constructor(x, y, r, text) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.text = text;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = "rgba(0,180,255,0.9)";
      }

      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x - this.r / 3,
          this.y - this.r / 3,
          this.r / 6,
          this.x,
          this.y,
          this.r
        );
        gradient.addColorStop(0, "#00ffff");
        gradient.addColorStop(1, "#0044ff");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0,255,255,0.8)";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "white";
        ctx.font = "bold 12px Poppins";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y + 4);
      }

      update(canvas) {
        this.x += this.vx;
        this.y += this.vy;

        // bounce off walls
        if (this.x + this.r > canvas.width || this.x - this.r < 0)
          this.vx *= -1;
        if (this.y + this.r > canvas.height || this.y - this.r < 0)
          this.vy *= -1;

        this.draw(ctx);
      }
    }

    // create balls
    for (let i = 0; i < skills.length; i++) {
      balls.push(
        new Ball(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          35,
          skills[i]
        )
      );
    }

    let animationFrame;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach((b) => b.update(canvas));
      animationFrame = requestAnimationFrame(animate);
    }
    animate();

    // handle drag
    let dragging = null;
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      balls.forEach((b) => {
        if (Math.hypot(mouseX - b.x, mouseY - b.y) < b.r) dragging = b;
      });
    });
    canvas.addEventListener("mouseup", () => (dragging = null));
    canvas.addEventListener("mousemove", (e) => {
      if (dragging) {
        const rect = canvas.getBoundingClientRect();
        dragging.x = e.clientX - rect.left;
        dragging.y = e.clientY - rect.top;
      }
    });

    // handle device motion (shake)
    const handleMotion = (event) => {
      const { x, y } = event.accelerationIncludingGravity;
      balls.forEach((b) => {
        b.vx += x * 0.1;
        b.vy += y * 0.1;
      });
    };
    window.addEventListener("devicemotion", handleMotion);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  return (
    <section className="min-h-[500px] flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black text-white">
      <h2 className="text-4xl font-bold mb-4">My Skills</h2>
      <div className="w-[90%] md:w-[600px] h-[400px] bg-gray-900 rounded-3xl shadow-inner relative overflow-hidden border border-cyan-500/30">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </section>
  );
}
