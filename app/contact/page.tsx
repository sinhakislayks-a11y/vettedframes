import type { Metadata } from "next";
import PageBackground from "@/components/ui/PageBackground";
import ContactHero from "@/components/contact/ContactHero";
import ContactOptions from "@/components/contact/ContactOptions";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Start a Project — Frames by Kislay",
  description:
    "Get in touch to start a video editing project. Book a call, WhatsApp, or send a brief directly. Fast response guaranteed.",
  keywords: [
    "hire video editor",
    "video editor for YouTube",
    "start video project",
    "book video editor",
    "contact video editor India",
  ],
  openGraph: {
    title: "Start a Project — Frames by Kislay",
    description:
      "Get in touch to start a video editing project. Book a call, WhatsApp, or send a brief directly.",
  },
  twitter: {
    title: "Start a Project — Frames by Kislay",
    description:
      "Get in touch to start a video editing project.",
  },
};

export default function ContactPage() {
  return (
    <PageBackground variant="vertical-lines" mask="fade-left" size={48}>
      <main className="flex flex-col">
        <ContactHero />
        <ContactOptions />
        <ContactForm />
      </main>
    </PageBackground>
  );
}
