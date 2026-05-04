"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Gravity, MatterBody, GravityRef } from "@/components/ui/Gravity";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { useIsMobile } from "@/hooks/useIsMobile";
import Matter from "matter-js";

const CHIPS = [
  { id: "hook", label: "hook", reason: "The first 3 seconds determine everything. No hook = no watch time." },
  { id: "audio", label: "audio & sfx", reason: "Viewers tolerate bad video. They never tolerate bad audio." },
  { id: "cuts", label: "cuts", reason: "Rhythm is editing. But it only works if the above are solid." },
  { id: "animation", label: "animation", reason: "The cherry. Never the foundation." },
  { id: "color", label: "color grading", reason: "Color sets the emotional register before a word is spoken." },
] as const;

type ChipId = typeof CHIPS[number]["id"];

// Reference image colors: solid pills like the fancy website
const CHIP_STYLES = [
  { bg: "bg-blue-500", border: "border-blue-500", text: "text-white" },
  { bg: "bg-pink-400", border: "border-pink-400", text: "text-white" },
  { bg: "bg-teal-700", border: "border-teal-700", text: "text-white" },
  { bg: "bg-yellow-400", border: "border-yellow-400", text: "text-black" },
  { bg: "bg-rose-500", border: "border-rose-500", text: "text-white" },
];

const BORDER_COLORS = ["#3B82F6", "#f472b6", "#0D9488", "#FBBF24", "#F43F5E"];

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function EditorTestSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const isMobile = useIsMobile();
  const gravityRef = useRef<GravityRef | null>(null);

  const [placedChips, setPlacedChips] = useState<Partial<Record<ChipId, number>>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [lastPlacedReason, setLastPlacedReason] = useState<string | null>(null);

  // Use refs to avoid closure issues
  const placedChipsRef = useRef(placedChips);
  const isCompleteRef = useRef(isComplete);

  // Keep refs in sync with state
  useEffect(() => {
    placedChipsRef.current = placedChips;
  }, [placedChips]);

  useEffect(() => {
    isCompleteRef.current = isComplete;
  }, [isComplete]);

  // Set up release callback
  useEffect(() => {
    if (gravityRef.current) {
      gravityRef.current.setOnRelease((id: string, x: number, y: number) => {
        const chipId = id as ChipId;
        if (!chipId || isCompleteRef.current || placedChipsRef.current[chipId]) return;

        const chip = CHIPS.find(c => c.id === chipId);
        if (!chip) return;

        const correctSlot = CHIPS.findIndex(c => c.id === chipId) + 1;

        const dropZones = document.querySelectorAll("[data-zone]");
        let droppedSlot: number | null = null;

        dropZones.forEach((zone, index) => {
          const rect = zone.getBoundingClientRect();
          if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            droppedSlot = index + 1;
          }
        });

        if (droppedSlot === correctSlot) {
          if (gravityRef.current) {
            gravityRef.current.removeBody(chipId);
          }

          setPlacedChips(prev => {
            const newPlaced = { ...prev, [chipId]: correctSlot };
            if (Object.keys(newPlaced).length === 5 && !isCompleteRef.current) {
              setIsComplete(true);
              setTimeout(() => setShowCompletionMessage(true), 600);
            }
            return newPlaced;
          });

          setLastPlacedReason(chip.reason);
        } else if (droppedSlot !== null) {
          const body = gravityRef.current?.getBody(chipId);
          if (body) {
            Matter.Body.applyForce(body, body.position, { x: 0, y: 0.05 });
          }
        }
      });
    }
  }, []);

  const handleRelease = useCallback((chipId: ChipId, x: number, y: number) => {
    // Use refs to get latest state
  }, []);

  return (
    <section ref={ref} className="w-full bg-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-6xl text-text-primary mb-6"
          >
            lets test how much you know about Viral editing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-sans text-text-secondary text-lg max-w-xl mx-auto"
          >
            Drag each element into what you think matters most. See if you think like a professional editor.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative bg-white rounded-[4px] border-2 border-black/10 overflow-hidden"
          style={{ height: "600px" }}
        >
          <div className="absolute inset-0">
            {/* Drop Zones - Left side - large hit area for easy dropping */}
            <div className="absolute left-0 top-0 w-80 h-full z-10">
              {[1, 2, 3, 4, 5].map((slot) => {
                const placedChipEntry = Object.entries(placedChips).find(([, pos]) => pos === slot);
                const placedChip = placedChipEntry ? CHIPS.find(c => c.id === placedChipEntry[0]) : null;
                const chipIndex = placedChip ? CHIPS.findIndex(c => c.id === placedChip.id) : -1;

                return (
                  <motion.div
                    key={slot}
                    data-zone={slot - 1}
                    initial={{ opacity: showCompletionMessage ? 0 : 1 }}
                    animate={{ opacity: showCompletionMessage ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex items-center h-[80px] px-8"
                  >
                    <span className="font-mono text-black font-bold text-lg mr-6 w-8">
                      {String(slot).padStart(2, '0')}
                    </span>
                    {placedChip ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={cn(
                          "flex items-center gap-4 px-5 py-3 rounded-full",
                          CHIP_STYLES[chipIndex]?.bg
                        )}
                      >
                        <span className="text-white">
                          <CheckIcon />
                        </span>
                        <span className="font-sans text-lg font-bold uppercase tracking-wide text-white">
                          {placedChip.label}
                        </span>
                      </motion.div>
                    ) : (
                      <span className="italic font-sans text-black/50 text-base">
                        {slot === 1 ? "most important" : slot === 2 ? "..." : slot === 3 ? "..." : slot === 4 ? "..." : slot === 5 ? "least important" : ""}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile: Static list */}
            {isMobile ? (
              <div className="p-6">
                <p className="font-mono text-text-secondary text-xs mb-4 uppercase tracking-widest">
                  The ranking
                </p>
                <div className="space-y-3">
                  {CHIPS.map((chip, index) => (
                    <div key={chip.id} className="flex items-center gap-4 py-2 border-b border-border-custom/50">
                      <span className="font-mono text-brand text-sm w-6">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <span className="font-display text-text-primary">{chip.label}</span>
                        <p className="font-sans text-text-secondary text-xs mt-1">{chip.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Physics-based chips */
              <Gravity
                ref={gravityRef}
                gravity={{ x: 0, y: 1.2 }}
                className="z-20"
              >
                {CHIPS.map((chip, index) => {
                  // Skip already placed chips
                  if (placedChips[chip.id]) return null;

                  const style = CHIP_STYLES[index];
                  return (
                    <MatterBody
                      key={chip.id}
                      bodyId={chip.id}
                      friction={0.4}
                      restitution={0.3}
                      density={0.001}
                      className="cursor-grab"
                    >
                      <div
                        className={cn(
                          "px-8 py-4 rounded-full font-sans text-base cursor-grab",
                          "whitespace-nowrap select-none",
                          style.bg,
                          style.text
                        )}
                      >
                        <span className={cn("font-bold tracking-wide")}>
                          {chip.label}
                        </span>
                      </div>
                    </MatterBody>
                  );
                })}
              </Gravity>
            )}
          </div>

          {/* Reason text */}
          {lastPlacedReason && !showCompletionMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-md px-4"
            >
              <p className="font-sans text-text-secondary/60 text-xs text-center leading-relaxed">
                {lastPlacedReason}
              </p>
            </motion.div>
          )}

          {/* Completion message */}
          <AnimatePresence>
            {showCompletionMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50"
              >
                <p className="font-display text-text-primary text-3xl md:text-4xl text-center px-8 leading-relaxed mb-12">
                  That's exactly how I approach every edit — in that order, every time.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 font-sans text-[#6025D5] hover:text-[#7B5CF0] transition-colors"
                >
                  See the work
                  <ArrowRightIcon />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!isMobile && (
          <p className="text-center font-sans text-text-secondary/40 text-sm mt-6">
            Drag chips to the left →
          </p>
        )}
      </div>
    </section>
  );
}