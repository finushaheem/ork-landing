import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../public/fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ork — Think freely. Everything follows.",
  description:
    "A calm and intelligent space for your mind. Capture thoughts, write journals, publish ideas, and let ork quietly turn your thinking into clarity, context, and action.",
  keywords: [
    "thinking app",
    "journaling",
    "note-taking",
    "task management",
    "second brain",
    "writing",
    "mindfulness",
  ],
  openGraph: {
    title: "ork — Think freely. Everything follows.",
    description:
      "A calm and intelligent space for your mind. Capture thoughts, write journals, publish ideas.",
    url: "https://ork.so",
    siteName: "ork",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ork — Think freely. Everything follows.",
    description:
      "A calm and intelligent space for your mind.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
