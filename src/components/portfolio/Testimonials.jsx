import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImQuotesRight, ImQuotesLeft } from "react-icons/im";
import Header from "../common/Header";
import { FaStar } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "The service was exceptional. I loved the attention to detail and support.",
  },
  {
    name: "Bob Williams",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    feedback:
      "Fantastic experience! I highly recommend their professionalism and creativity.",
  },
  {
    name: "Catherine Lee",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
    feedback:
      "They delivered more than expected. The process was smooth and clear.",
  },
  {
    name: "David Kim",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    feedback: "Amazing work! I’ll definitely collaborate with them again.",
  },
];

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    let currentIndex = 0;

    // GSAP ScrollTrigger
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${testimonials.length * 100}%`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progressIndex = self.progress * (testimonials.length - 1);
        const index = Math.round(progressIndex);
        if (index !== currentIndex) {
          currentIndex = index;
          const t = testimonials[index];

          // Animate the testimonial card transition
          gsap.to(card, {
            opacity: 0,
            y: 40,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              card.querySelector("img").src = t.image;
              card.querySelector("h3").textContent = t.name;
              card.querySelector("p").textContent = t.feedback;
              gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            },
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-10 min-h-screen  flex flex-col justify-center items-center overflow-hidden "
    >
      <div className="container grid place-items-center">
        <Header
          heading="Testimonials"
          subheading="What clients and colleagues say about my work"
        />

        {/* Testimonial Card */}
        <div
          ref={cardRef}
          className="bg-surface p-8 rounded-2xl shadow-lg max-w-md text-center flex flex-col items-center gap-4"
        >
          <ImQuotesLeft className="text-text-secondary text-3xl mb-2" />
          <img
            src={testimonials[0].image}
            alt={testimonials[0].name}
            className="w-24 h-24 rounded-full object-cover border-4 border-text-secondary"
          />
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar className="text-brand mx-1" />
            ))}
          </div>
          <p className="text-text-secondary font-light text-base leading-relaxed">
            {testimonials[0].feedback}
          </p>
          <h3 className="text-xl font-semibold mt-2">{testimonials[0].name}</h3>
          <ImQuotesRight className="text-text-secondary text-3xl mt-2" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
