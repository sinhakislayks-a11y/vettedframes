import type { Metadata } from "next";
import WorkflowHero from "@/components/workflow/WorkflowHero";
import ProcessSteps from "@/components/workflow/ProcessSteps";
import ToolsSection from "@/components/workflow/ToolsSection";
import DeliverablesTable from "@/components/workflow/DeliverablesTable";
import FAQSection from "@/components/workflow/FAQSection";

export const metadata: Metadata = {
  title: "Workflow — Frames by Kislay",
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
      <FAQSection />
    </main>
  );
}
