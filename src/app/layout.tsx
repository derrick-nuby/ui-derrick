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
  title: "UI Derrick - Custom Shadcn/UI Component Registry",
  description: "A comprehensive component registry featuring reusable React components like OrganisationUnitTree with lazy loading, search, and selection capabilities. Install components easily with npx shadcn add.",
  keywords: ["shadcn", "ui", "components", "react", "nextjs", "registry", "organisation", "tree", "component library"],
  authors: [{ name: "Derrick Nuby", url: "https://ui.derrick.rw" }],
  creator: "Derrick Nuby",
  publisher: "Derrick Nuby",
  openGraph: {
    title: "UI Derrick - Custom Shadcn/UI Component Registry",
    description: "Reusable React components for modern web applications. Install with npx shadcn add.",
    url: "https://ui.derrick.rw",
    siteName: "UI Derrick",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Derrick - Custom Shadcn/UI Component Registry",
    description: "Reusable React components for modern web applications. Install with npx shadcn add.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
