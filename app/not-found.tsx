import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-brand uppercase tracking-[0.2em] text-[11px] mb-6">
          <span className="inline-block w-5 h-px bg-brand mr-2 align-middle" />
          404
        </p>
        <h1 className="font-display font-semibold text-4xl text-text-primary mb-4 tracking-tight">
          Lost in the cut.
        </h1>
        <p className="text-text-secondary font-sans text-base leading-relaxed mb-8">
          This frame doesn&apos;t exist. Maybe it got cut in the edit.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand text-bg text-sm font-medium font-sans px-5 py-2 rounded-[4px] hover:bg-brand/90 transition-colors duration-200"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}