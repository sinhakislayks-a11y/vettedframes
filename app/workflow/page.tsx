import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageBackground from "@/components/ui/PageBackground";
import WorkflowHero from "@/components/workflow/WorkflowHero";
import VerticalPipeline from "@/components/workflow/VerticalPipeline";
import ProcessExplainers from "@/components/workflow/ProcessExplainers";
import TableOfContents from "@/components/workflow/TableOfContents";
import ToolsSection from "@/components/workflow/ToolsSection";
import WorkflowCTA from "@/components/workflow/WorkflowCTA";

const FAQSection = dynamic(() => import("@/components/workflow/FAQSection"));

export const metadata: Metadata = {
  title: "My Workflow — Frames by Kislay",
  description:
    "A clear 7-step process from brief to final delivery. See tools, deliverables comparison, and FAQs for working together.",
  keywords: [
    "video editor workflow",
    "video production process",
    "editing workflow",
    "how I work video editor",
  ],
  openGraph: {
    title: "How I Work — Frames by Kislay",
    description:
      "A clear 7-step process from brief to final delivery. See tools, deliverables comparison, and FAQs.",
  },
  twitter: {
    title: "How I Work — Frames by Kislay",
    description:
      "A clear 7-step process from brief to final delivery.",
  },
};

export default function WorkflowPage() {
  return (
    <PageBackground variant="horizontal-lines" mask="fade-y" size={32}>
      <main className="flex flex-col">
        <WorkflowHero />
        <VerticalPipeline />
        <ProcessExplainers />
        <TableOfContents />
        <ToolsSection />
        <WorkflowCTA />
        <FAQSection />
      </main>
    </PageBackground>
  );
}