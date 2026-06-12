import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GOAT Mode — Cribl Interview Prep",
    short_name: "GOAT Mode",
    description:
      "Pass every quiz, walk into the Kat and Cam calls 3x more prepared than you need to be.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a2730",
    theme_color: "#0a2730",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
