"use client";

interface StepVisualProps {
  step: number;
  className?: string;
}

// Abstract CSS/SVG-based visuals — no external assets needed
// Each visual evokes the workflow step with geometric shapes

function BriefVisual({ className }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[16/10] ${className}`}>
      {/* Form card mockup */}
      <div className="absolute inset-0 bg-surface rounded-[4px] border border-border-custom p-6 flex flex-col gap-4">
        {/* Header bar */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-brand/40" />
          <div className="w-3 h-3 rounded-full bg-brand/20" />
          <div className="w-3 h-3 rounded-full bg-border-custom" />
        </div>
        {/* Form fields */}
        <div className="space-y-3">
          <div className="h-2 bg-brand/10 rounded w-1/3" />
          <div className="h-8 bg-surface-elevated rounded border border-border-custom" />
          <div className="h-2 bg-brand/10 rounded w-2/5" />
          <div className="h-8 bg-surface-elevated rounded border border-border-custom" />
          <div className="h-2 bg-brand/10 rounded w-1/4" />
          <div className="h-8 bg-surface-elevated rounded border border-border-custom" />
          {/* CTA button */}
          <div className="mt-2 h-9 bg-brand rounded-[4px]" />
        </div>
      </div>
      {/* Subtle glow accent */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand/5 rounded-full blur-2xl" />
    </div>
  );
}

function ReviewVisual({ className }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[16/10] ${className}`}>
      {/* Timeline / footage grid */}
      <div className="absolute inset-0 bg-surface rounded-[4px] border border-border-custom p-4">
        {/* Clip bar thumbnails */}
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="h-8 rounded-[2px] bg-surface-elevated border border-border-custom"
                style={{ width: `${40 + i * 12}%` }}
              />
              <div className="w-16 h-1.5 bg-brand/20 rounded-full" />
              <div className="w-12 h-1.5 bg-border-custom rounded-full" />
            </div>
          ))}
        </div>
        {/* Waveform hint */}
        <div className="mt-4 flex items-end gap-0.5 h-8">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-brand/30 rounded-full"
              style={{ height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-brand/5 rounded-full blur-2xl" />
    </div>
  );
}

function CutVisual({ className }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[16/10] ${className}`}>
      {/* Editing timeline / color grading screen */}
      <div className="absolute inset-0 bg-surface rounded-[4px] border border-border-custom overflow-hidden">
        {/* Top bar */}
        <div className="h-8 bg-surface-elevated border-b border-border-custom flex items-center px-4 gap-4">
          <div className="w-2 h-2 bg-brand rounded-full" />
          <div className="w-16 h-1.5 bg-border-custom rounded-full" />
          <div className="ml-auto flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 bg-border-custom rounded-[2px]" />
            ))}
          </div>
        </div>
        {/* Timeline tracks */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 text-[10px] font-mono text-text-secondary">V1</div>
            <div className="flex-1 h-4 bg-surface-elevated rounded-[2px] border border-border-custom overflow-hidden">
              <div className="w-3/4 h-full bg-brand/20 border-r border-border-custom" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 text-[10px] font-mono text-text-secondary">A1</div>
            <div className="flex-1 h-4 bg-surface-elevated rounded-[2px] border border-border-custom overflow-hidden">
              <div className="w-1/2 h-full bg-brand/10 border-r border-border-custom" />
            </div>
          </div>
        </div>
        {/* Color panel hint */}
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {["#E8A838", "#4A9EFF", "#22C55E", "#EF4444", "#A855F7"].map((c) => (
            <div key={c} className="w-4 h-4 rounded-full border border-border-custom" style={{ background: c }} />
          ))}
        </div>
      </div>
      <div className="absolute -top-6 -left-6 w-28 h-28 bg-brand/5 rounded-full blur-3xl" />
    </div>
  );
}

function FeedbackVisual({ className }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[16/10] ${className}`}>
      {/* Comments / timestamp UI */}
      <div className="absolute inset-0 bg-surface rounded-[4px] border border-border-custom p-5">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="w-6 h-6 bg-brand/20 rounded-full flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-12 bg-brand/40 rounded-full" />
                  <div className="h-1 w-8 bg-border-custom rounded-full" />
                  <div className="h-1 w-16 bg-border-custom rounded-full" />
                </div>
                <div className="h-1.5 bg-surface-elevated rounded w-full" />
              </div>
            </div>
          ))}
        </div>
        {/* Timestamp markers */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-surface-elevated border-t border-border-custom flex items-center px-4">
          <div className="flex gap-4">
            {[0.2, 0.45, 0.7, 0.9].map((p, i) => (
              <div
                key={i}
                className="w-px h-3 bg-brand/50"
                style={{ marginLeft: `${p * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand/5 rounded-full blur-2xl" />
    </div>
  );
}

function DeliveryVisual({ className }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[16/10] ${className}`}>
      {/* Folder / export structure */}
      <div className="absolute inset-0">
        {/* Folder cards */}
        <div className="absolute left-0 top-1/3 -translate-y-1/2 w-28 h-20 bg-surface rounded-[4px] border border-border-custom p-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-brand/20 rounded-[2px]" />
            <div className="h-1 w-12 bg-brand/40 rounded" />
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="h-1 bg-border-custom rounded w-full" />
          ))}
        </div>
        <div className="absolute left-1/4 top-1/4 w-28 h-20 bg-surface-elevated rounded-[4px] border border-border-custom p-3 flex flex-col gap-1.5 shadow-lg shadow-black/20">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-brand/30 rounded-[2px]" />
            <div className="h-1 w-10 bg-brand/60 rounded" />
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="h-1 bg-border-custom rounded w-full" />
          ))}
        </div>
        <div className="absolute right-0 bottom-1/4 translate-y-1/2 w-28 h-20 bg-surface rounded-[4px] border border-border-custom p-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-brand/20 rounded-[2px]" />
            <div className="h-1 w-14 bg-brand/40 rounded" />
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="h-1 bg-border-custom rounded w-full" />
          ))}
        </div>
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <line x1="20%" y1="50%" x2="40%" y2="40%" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="75%" y1="60%" x2="60%" y2="50%" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand/5 rounded-full blur-2xl" />
    </div>
  );
}

const VISUALS: Record<number, React.FC<{ className?: string }>> = {
  1: BriefVisual,
  2: ReviewVisual,
  3: CutVisual,
  4: FeedbackVisual,
  5: DeliveryVisual,
};

export default function StepVisual({ step, className }: StepVisualProps) {
  const Visual = VISUALS[step];
  if (!Visual) return null;
  return <Visual className={className} />;
}