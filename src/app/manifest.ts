import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Calculadora de Taxas GGMAX",
    short_name: "Taxas GGMAX",
    description: "Calculadora de taxas, lucro líquido real e prazos de liberação para vendedores GGMAX",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a1628",
    theme_color: "#0a1628",
    lang: "pt-BR",
    categories: ["finance", "utilities", "business"],
    icons: [
      {
        src: "/icons/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
