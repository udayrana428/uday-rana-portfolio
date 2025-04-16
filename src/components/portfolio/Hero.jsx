"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  useAnimations,
} from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense, useRef, useEffect } from "react";
import robotModel from "../../assets/source/robot.glb";
import quantumCube from "../../assets/source/quantum_cube.glb";

function Model({ url, position, rotationDirection }) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF(url);
  const hasAnimations = animations && animations.length > 0;
  const { actions } = hasAnimations
    ? useAnimations(animations, modelRef)
    : { actions: null };

  // Clone the scene to avoid reuse issues
  const clonedScene = scene.clone();

  // Play first animation if available
  useEffect(() => {
    if (actions && animations.length > 0) {
      const action = actions[animations[0].name];
      if (action) action.play();
    }
  }, [actions, animations]);

  // Continuous rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005 * rotationDirection;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={[3, 3, 3]}
      position={position}
      onUpdate={(self) => {
        self.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = 1;
            child.material.depthWrite = true;
            child.material.side = THREE.FrontSide;
          }
        });
      }}
    />
  );
}

export default function Hero({ title, subtitle, description }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Fade out section as user scrolls down
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Slide text up
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <motion.section
      ref={heroRef}
      style={{ heroOpacity }}
      className="h-screen md:h-full relative bg-[linear-gradient(to_top,_#02071e,_#030c2b,_#001038,_#001245,_#051252)] text-white "
    >
      <div className="container mx-auto  flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <motion.div
          style={{ y: heroY }}
          //want the text to be centered
          className="text-center max-w-3xl px-1 absolute bottom-20 md:bottom-10 md:left-72 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl md:text-xl mb-2 tracking-[1rem]  font-medium">
            {title}
          </h1>
          <h2 className="text-3xl md:text-6xl mb-5 md:mb-2  text-blue-50">
            {subtitle}
          </h2>
          <i class="fa-solid fa-caret-up mb-5 md:mb-2"></i>
          <p className="text-lg md:text-xl tracking-[1rem] mb-8 text-yellow-200">
            {description}
          </p>

          {/* <div className="flex justify-center md:justify-start gap-4">
            <motion.a
              href="#projects"
              className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="/contact"
              className="btn border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div> */}
        </motion.div>

        {/* 3D Model Canvas */}
        <div className="w-full h-[600px] mt-28 md:mt-0">
          <Canvas
            camera={{ position: [0, 2, 10], fov: 50 }}
            shadows
            style={{ background: "transparent" }}
            gl={{
              antialias: true,
              alpha: true, // ✨ allow transparency
              toneMapping: THREE.ACESFilmicToneMapping,
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0); // ✨ set transparent clear color
            }}
          >
            <Suspense fallback={null}>
              {/* <ambientLight intensity={0.5} /> */}
              <directionalLight position={[2, 2, 2]} intensity={1} />
              {/* <Environment preset="city" /> */}
              <OrbitControls enableZoom={false} enableDamping={true} />
              {/* To switch models, comment/uncomment below */}
              {/* <Model url={robotModel} position={[0, 0, 0]} rotationDirection={1} /> */}
              <Model
                url={quantumCube}
                position={[0, -10, -100]}
                rotationDirection={-1}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </motion.section>
  );
}
