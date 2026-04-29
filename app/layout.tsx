import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vettedframes.vercel.app"),
  title: "Frames by Kislay — Video Editor, Colorist, Cinematographer",
  description:
    "High-retention reels and short-form content for SaaS founders and YouTube creators. Convert your ideas into defining visuals.",
  openGraph: {
    title: "Frames by Kislay",
    description:
      "High-retention reels and short-form content for SaaS founders and YouTube creators.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Frames by Kislay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frames by Kislay",
    description:
      "High-retention reels and short-form content for SaaS founders and YouTube creators.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
