import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactOptions from "@/components/contact/ContactOptions";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Frames by Kislay",
  description:
    "Get in touch to start a project. Book a call, WhatsApp, or send a brief directly.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <ContactHero />
      <ContactForm />
    </main>
  );
}
