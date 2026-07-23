// Global decorative background: slowly drifting soft orbs behind every page.
// Pure CSS animation (no JS), fixed and non-interactive so it never blocks clicks.
export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-drift-a absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-white/[0.05] blur-3xl" />
      <div className="animate-drift-b absolute -right-48 top-1/3 h-[34rem] w-[34rem] rounded-full bg-white/[0.04] blur-3xl" />
      <div
        className="animate-drift-a absolute bottom-[-12rem] left-1/4 h-[30rem] w-[30rem] rounded-full bg-white/[0.03] blur-3xl"
        style={{ animationDelay: "-9s" }}
      />
    </div>
  );
}
