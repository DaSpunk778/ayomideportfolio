import type { Metadata } from "next";
import { Inter, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayomide Samuel Akintomide | Frontend Developer & Software Engineer",
  description: "Portfolio of Ayomide Samuel Akintomide — a software developer from Lagos, Nigeria specializing in Next.js, React, TypeScript, and full-stack web applications. View projects, skills, and get in touch.",
  keywords: [
    "Ayomide Samuel Akintomide",
    "Ayomide Akintomide",
    "Frontend Developer Nigeria",
    "Next.js Developer",
    "React Developer Lagos",
    "Software Developer Portfolio",
  ],
  verification: {
    google: "SjuvFqYeQbilT59fUpywV4QKYDVT2aJT8xgTeiYYtwM",
  },
  authors: [{ name: "Ayomide Samuel Akintomide" }],
   openGraph: {
    title: "Ayomide Samuel Akintomide | Frontend Developer",
    description: "Software developer from Lagos, Nigeria building clean, performant web applications with Next.js, React, and TypeScript.",
    url: "https://akintomideayomidesamuel.vercel.app/",
    siteName: "Ayomide Samuel Akintomide Portfolio",
    images: [
      {
        url: "/ayomide.jpg", // ideally a wide banner image, 1200x630
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayomide Samuel Akintomide | Frontend Engineer",
    description: "Software developer from Lagos, Nigeria building clean, performant web apps.",
    images: ["/ayomide.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", notoSans.variable, playfairDisplayHeading.variable)}>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}