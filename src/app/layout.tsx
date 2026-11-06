import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Anshuman Mishra — AI Engineer";
const description =
  "Generative AI engineer specializing in agentic AI, RAG, and LLM-powered systems, with research experience in ASR/TTS/OCR at Bhashini and production backend experience shipping B2G platform features at scale.";

export const metadata: Metadata = {
  metadataBase: new URL("https://anshumanmishra.dev"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Anshuman Mishra",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#18191b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://picsum.photos" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
