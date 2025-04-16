import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/source/robot.glb",
          dest: "assets",
        },
      ],
    }),
  ],
  assetsInclude: ["**/*.glb"], // Allow .glb imports
});
