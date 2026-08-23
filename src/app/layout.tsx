import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Calculadora de Taxas GGMAX — Simulador de Lucro Real e Taxas",
  description:
    "Calcule com precisão o lucro líquido das suas vendas na GGMAX, taxas dos planos Prata, Ouro e Diamante, custos de aquisição e prazos de liberação.",
  keywords: [
    "calculadora ggmax",
    "taxas ggmax",
    "ggmax taxas",
    "calcular lucro ggmax",
    "plano ouro ggmax",
    "plano diamante ggmax",
    "comissao ggmax",
    "ggmax simulador",
  ],
  authors: [{ name: "Murilo de Almeida Tavares", url: "https://github.com/muriloatavares" }],
  creator: "Murilo Tavares",
  metadataBase: new URL("https://calculadora-de-taxas-ggmax.vercel.app"),
  openGraph: {
    title: "Calculadora de Taxas GGMAX — Simulador de Lucro e Taxas",
    description: "Descubra seu lucro líquido real na GGMAX considerando todos os planos e taxas.",
    type: "website",
    locale: "pt_BR",
    siteName: "Calculadora GGMAX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Taxas GGMAX",
    description: "Simulador de taxas e lucro real para vendedores GGMAX.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Taxas GGMAX",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark ${poppins.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
