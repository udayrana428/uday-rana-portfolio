"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Crafting sleek & scalable web experiences.";

  // Simple typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1e5e] via-[#03113b] to-[#02071e] overflow-hidden px-6">
      {/* Animated background gradient or blur */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,183,255,0.3),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(255,0,128,0.3),transparent_60%)] blur-3xl"></div> */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl"
      >
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
          Hi, I'm <span className="text-yellow-500">Uday Rana</span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-4xl text-gray-300 font-light mb-6">
          Frontend Developer & MERN Stack Engineer
        </h2>

        {/* Typewriter effect */}
        <p className="text-lg md:text-xl text-gray-200 h-8 mb-10">
          {text}
          <span className="animate-pulse">|</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-6 mb-5">
          <Link to={"/projects"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-400 transition-all"
            >
              View My Work
            </motion.button>
          </Link>

          <Link to={"/contact"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-yellow-500 text-yellow-400 rounded-full hover:bg-cyan-500/10 transition-all"
            >
              Contact Me
            </motion.button>
          </Link>
        </div>

        {/* Decorative text / tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute  left-1/2 transform -translate-x-1/2 text-sm text-white tracking-widest uppercase"
        >
          Building ideas into interactive realities 💡
        </motion.div>
      </motion.div>
    </section>
  );
}

// "use client";

// import * as THREE from "three";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   OrbitControls,
//   useGLTF,
//   Environment,
//   useAnimations,
// } from "@react-three/drei";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { Suspense, useRef, useEffect } from "react";
// import robotModel from "../../assets/source/robot.glb";
// import quantumCube from "../../assets/source/quantum_cube.glb";

// function Model({ url, position, rotationDirection }) {
//   const modelRef = useRef();
//   const { scene, animations } = useGLTF(url);
//   const hasAnimations = animations && animations.length > 0;
//   const { actions } = hasAnimations
//     ? useAnimations(animations, modelRef)
//     : { actions: null };

//   // Clone the scene to avoid reuse issues
//   const clonedScene = scene.clone();

//   // Play first animation if available
//   useEffect(() => {
//     if (actions && animations.length > 0) {
//       const action = actions[animations[0].name];
//       if (action) action.play();
//     }
//   }, [actions, animations]);

//   // Continuous rotation
//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += 0.005 * rotationDirection;
//     }
//   });

//   return (
//     <primitive
//       ref={modelRef}
//       object={clonedScene}
//       scale={[3, 3, 3]}
//       position={position}
//       onUpdate={(self) => {
//         self.traverse((child) => {
//           if (child.isMesh && child.material) {
//             child.material.transparent = true;
//             child.material.opacity = 1;
//             child.material.depthWrite = true;
//             child.material.side = THREE.FrontSide;
//           }
//         });
//       }}
//     />
//   );
// }

// export default function Hero({ title, subtitle, description }) {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });

//   // Fade out section as user scrolls down
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

//   // Slide text up
//   const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

//   return (
//     <motion.section
//       ref={heroRef}
//       style={{ opacity: heroOpacity }}
//       className="h-screen md:h-full relative bg-[linear-gradient(to_top,_#02071e,_#030c2b,_#001038,_#001245,_#051252)] "
//     >
//       <div className="container mx-auto  flex flex-col md:flex-row items-center justify-center min-h-screen">
//         {/* Text Content */}
//         <motion.div
//           style={{ y: heroY }}
//           //want the text to be centered
//           className="flex-1 order-2 md:order-1 text-center md:text-balance max-w-3xl px-1 z-10 "
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-xl md:text-xl mb-2 tracking-[1rem]  font-medium">
//             {title}
//           </h1>
//           <h2 className="text-3xl md:text-6xl mb-5 md:mb-2  text-blue-50">
//             {subtitle}
//           </h2>
//           <i class="fa-solid fa-caret-up mb-5 md:mb-2"></i>
//           <p className="text-lg md:text-xl tracking-[1rem] mb-8 text-yellow-200">
//             {description}
//           </p>

//           {/* <div className="flex justify-center md:justify-start gap-4">
//             <motion.a
//               href="#projects"
//               className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               View My Work
//             </motion.a>
//             <motion.a
//               href="/contact"
//               className="btn border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Contact Me
//             </motion.a>
//           </div> */}
//         </motion.div>

//         {/* 3D Model Canvas */}
//         <div className="flex-1 order-1 md:order-2 w-full h-[600px]">
//           {/* <Canvas
//             camera={{ position: [0, 2, 10], fov: 50 }}
//             shadows
//             style={{ background: "transparent" }}
//             gl={{
//               antialias: true,
//               alpha: true, // ✨ allow transparency
//               toneMapping: THREE.ACESFilmicToneMapping,
//             }}
//             onCreated={({ gl }) => {
//               gl.setClearColor(0x000000, 0); // ✨ set transparent clear color
//             }}
//           >
//             <Suspense fallback={null}>
//               <ambientLight intensity={0.5} />
//               <directionalLight position={[2, 2, 2]} intensity={1} /> //
//               commented
//               <Environment preset="city" /> //commented
//               <OrbitControls enableZoom={false} enableDamping={true} />
//               To switch models, comment/uncomment below
//               <Model
//                 url={robotModel}
//                 position={[0, 0, 0]}
//                 rotationDirection={1}
//               />{" "}
//               // commented
//               <Model
//                 url={quantumCube}
//                 position={[0, -20, -100]}
//                 rotationDirection={-1}
//               />
//             </Suspense>
//           </Canvas> */}
//         </div>
//       </div>
//     </motion.section>
//   );
// }
