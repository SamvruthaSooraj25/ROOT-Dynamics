import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    optimizeDeps: {
      include: [
        "gsap",
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@tanstack/react-router"
      ]
    },
    server: {
      port: 8080, 
      allowedHosts: true, 
    }
  },
});
