import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frames by Kislay — Video Editor, Colorist, Cinematographer",
  description:
    "High-retention reels and short-form content for SaaS founders and YouTube creators. Convert your ideas into defining visuals.",
  openGraph: {
    title: "Frames by Kislay",
    description:
      "High-retention reels and short-form content for SaaS founders and YouTube creators.",
    type: "website",
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text-primary font-sans">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
