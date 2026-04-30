import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SplineLayoutWrapper from "@/components/layout/SplineLayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vettedframes.vercel.app"),
  title: "VettedFrames — Video Editor, Colorist, Cinematographer",
  description:
    "High-retention reels and short-form content for SaaS founders and YouTube creators. Convert your ideas into defining visuals.",
  openGraph: {
    title: "Frames by Kislay",
    description:
      "High-retention reels and short-form content for SaaS founders and YouTube creators.",
    type: "website",
    images: [
      {
        url: "/og-image-v3.png",
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
    images: ["/og-image-v3.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kislay Sinha",
    jobTitle: "Video Editor, Colorist & Cinematographer",
    url: "https://vettedframes.vercel.app",
    sameAs: [
      "https://instagram.com/framesbykislay",
      "https://youtube.com/@framesbykislay",
      "https://x.com/framesbykislay",
    ],
    worksFor: {
      "@type": "Organization",
      name: "VettedFrames",
    },
  };
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text-primary font-sans">
        <SplineLayoutWrapper />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
