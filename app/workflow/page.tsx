import type { Metadata } from "next";
import dynamic from "next/dynamic";
import WorkflowHero from "@/components/workflow/WorkflowHero";
import VerticalPipeline from "@/components/workflow/VerticalPipeline";
import DailyWorkflowSection from "@/components/workflow/DailyWorkflowSection";
import TableOfContents from "@/components/workflow/TableOfContents";
import ToolsSection from "@/components/workflow/ToolsSection";
import WorkflowCTA from "@/components/workflow/WorkflowCTA";

const FAQSection = dynamic(() => import("@/components/workflow/FAQSection"));

export const metadata: Metadata = {
  title: "Workflow — VettedFrames",
  description:
    "A clear 7-step process from brief to final delivery. See tools, deliverables comparison, and FAQs.",
};

export default function WorkflowPage() {
  return (
    <main className="flex flex-col">
      <WorkflowHero />
      <VerticalPipeline />
      <DailyWorkflowSection />
      <TableOfContents />
      <ToolsSection />
      <WorkflowCTA />
      <FAQSection />
    </main>
  );
}