import { KeywordButton } from "@/components/ui/keyword-button";

export default function PositioningStrip() {
  return (
    <section className="w-full bg-brand border-t border-b border-brand-dark py-6">
      <p className="font-display text-text-primary text-2xl text-center px-6">
        We edit for{" "}
        <KeywordButton
          label="retention"
          tooltip="Keeping viewers watching is the only metric that matters."
        />
        . Every cut earns its place.
      </p>
    </section>
  );
}
