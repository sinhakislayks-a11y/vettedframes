"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";
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
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="w-full bg-gradient-to-b from-surface via-bg to-surface py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-radial from-brand/5 to-transparent blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
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
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-gradient-to-br from-surface via-surface-elevated to-surface border border-border-custom rounded-[4px] overflow-hidden shadow-[0_0_30px_rgba(96,37,213,0.05)]"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-surface-elevated via-surface-elevated to-surface-elevated border-border-custom hover:bg-surface-elevated">
                <TableHead className="font-mono text-brand text-xs uppercase tracking-wider px-5 py-3.5 text-center">
                  Feature
                </TableHead>
                <TableHead className="font-mono text-text-primary text-xs uppercase tracking-wider px-5 py-3.5 text-center">
                  Hook Surgery
                </TableHead>
                <TableHead className="font-mono text-text-primary text-xs uppercase tracking-wider px-5 py-3.5 text-center">
                  Retention Engine
                </TableHead>
                <TableHead className="font-mono text-text-primary text-xs uppercase tracking-wider px-5 py-3.5 text-center">
                  Done-For-You
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row, idx) => (
                <TableRow
                  key={row.feature}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-border-custom transition-all duration-500 ${
                    hoveredRow === idx
                      ? 'bg-gradient-to-r from-brand/10 via-surface-elevated/70 to-brand/10 shadow-[inset_0_0_30px_rgba(96,37,213,0.03)]'
                      : 'hover:bg-surface-elevated/30'
                  }`}
                >
                  <TableCell className="font-sans text-sm text-brand px-5 py-3 text-center font-medium">
                    {row.feature}
                  </TableCell>
                  <TableCell className={`font-sans text-sm px-5 py-3 text-center transition-colors duration-300 ${
                    hoveredRow === idx ? 'text-brand-light' : 'text-text-secondary'
                  }`}>
                    {row.hook}
                  </TableCell>
                  <TableCell className={`font-sans text-sm px-5 py-3 text-center transition-colors duration-300 ${
                    hoveredRow === idx ? 'text-brand-light' : 'text-text-secondary'
                  }`}>
                    {row.retention}
                  </TableCell>
                  <TableCell className={`font-sans text-sm px-5 py-3 text-center transition-colors duration-300 ${
                    hoveredRow === idx ? 'text-brand-light' : 'text-text-secondary'
                  }`}>
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
