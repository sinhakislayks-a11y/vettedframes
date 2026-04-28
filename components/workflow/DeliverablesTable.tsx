"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ROWS = [
  { feature: "Format", hook: "One-time", retention: "Monthly", dfy: "Monthly" },
  { feature: "Short-form edits", hook: "1", retention: "Up to 12", dfy: "Unlimited" },
  { feature: "Color grading", hook: "Yes", retention: "Yes", dfy: "Yes" },
  { feature: "Captions", hook: "Yes", retention: "Yes", dfy: "Yes" },
  { feature: "Motion graphics", hook: "On request", retention: "Included", dfy: "Included" },
  { feature: "Thumbnail direction", hook: "No", retention: "No", dfy: "Yes" },
  { feature: "Multi-format delivery", hook: "No", retention: "Yes", dfy: "Yes" },
  { feature: "Turnaround", hook: "48–72 hrs", retention: "Weekly batches", dfy: "Weekly batches" },
];

export default function DeliverablesTable() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="w-full bg-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <p className="font-mono text-text-secondary uppercase tracking-widest text-xs mb-3">
            Compare plans
          </p>
          <h2 className="font-display font-semibold text-2xl text-text-primary">
            What&apos;s included
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-surface border border-border-custom rounded-[4px] overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-surface-elevated border-border-custom hover:bg-surface-elevated">
                <TableHead className="font-mono text-brand text-xs uppercase tracking-wider px-5 py-3.5">
                  Feature
                </TableHead>
                <TableHead className="font-mono text-text-primary text-xs uppercase tracking-wider px-5 py-3.5">
                  Hook Surgery
                </TableHead>
                <TableHead className="font-mono text-text-primary text-xs uppercase tracking-wider px-5 py-3.5">
                  Retention Engine
                </TableHead>
                <TableHead className="font-mono text-text-primary text-xs uppercase tracking-wider px-5 py-3.5">
                  Done-For-You
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow
                  key={row.feature}
                  className="border-border-custom hover:bg-surface-elevated/50"
                >
                  <TableCell className="font-sans text-sm text-brand px-5 py-3">
                    {row.feature}
                  </TableCell>
                  <TableCell className="font-sans text-sm text-text-secondary px-5 py-3">
                    {row.hook}
                  </TableCell>
                  <TableCell className="font-sans text-sm text-text-secondary px-5 py-3">
                    {row.retention}
                  </TableCell>
                  <TableCell className="font-sans text-sm text-text-secondary px-5 py-3">
                    {row.dfy}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
  );
}
