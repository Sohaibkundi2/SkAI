import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sohaib's Funny AI Chatbot",
  description: "A fun and friendly AI chatbot built by Sohaib that answers questions with jokes, playful roasts, and casual conversation.",
  openGraph: {
    title: "Sohaib's Funny AI Chatbot",
    description: "A fun and friendly AI chatbot built by Sohaib.",
    url: "sohaib-ai.vercel.app",
    siteName: "Sohaib's Funny AI",
    images: [
      {
        url: "/preview.svg",
        width: 1200,
        height: 630,
        alt: "Sohaib's Funny AI Chatbot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohaib's Funny AI Chatbot",
    description: "A fun and friendly AI chatbot built by Sohaib.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
