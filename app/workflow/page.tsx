import type { Metadata } from "next";
import dynamic from "next/dynamic";
import WorkflowHero from "@/components/workflow/WorkflowHero";
import ProcessSteps from "@/components/workflow/ProcessSteps";
import ToolsSection from "@/components/workflow/ToolsSection";
import DeliverablesTable from "@/components/workflow/DeliverablesTable";
import WorkflowCTA from "@/components/workflow/WorkflowCTA";

const FAQSection = dynamic(() => import("@/components/workflow/FAQSection"));

export const metadata: Metadata = {
  title: "Workflow — VettedFrames",
  description:
    "A clear 5-step process from brief to final delivery. See tools, deliverables comparison, and FAQs.",
};

export default function WorkflowPage() {
  return (
    <main className="flex flex-col">
      <WorkflowHero />
      <ProcessSteps />
      <ToolsSection />
      <DeliverablesTable />
      <WorkflowCTA />
      <FAQSection />
    </main>
  );
}
