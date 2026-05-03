import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { inter, jetbrainsMono } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppBubble from "@/components/ui/WhatsAppBubble";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatedGradientBg } from "@/components/layout/AnimatedGradientBg";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vettedframes.vercel.app"),
  title: {
    default: "Frames by Kislay — Video Editor & Colorist for Creators",
    template: "%s | Frames by Kislay",
  },
  description:
    "High-retention reels and short-form content for SaaS founders and YouTube creators in India. Transform your ideas into defining visuals.",
  openGraph: {
    siteName: "Frames by Kislay",
    type: "website",
    images: [
      {
        url: "/og-image-v3.png",
        width: 1200,
        height: 630,
        alt: "Frames by Kislay — Video Editor for Creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@framesbykislay",
    creator: "@framesbykislay",
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
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstaticaliased"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap"
        rel="stylesheet"
      />
      <html
        lang="en"
        className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
      <body className="min-h-full flex flex-col bg-bg text-text-primary font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <AnimatedGradientBg />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <WhatsAppBubble />
          <Analytics />
        </ThemeProvider>
      </body>
      </html>
    </>
  );
}
