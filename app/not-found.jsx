import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-[family-name:var(--font-display)] text-8xl font-bold text-outline">
        404
      </p>
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-semibold">
        Page not found
      </h1>
      <p className="mt-3 text-white/50">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
      >
        Back to home
      </Link>
    </div>
  );
}
