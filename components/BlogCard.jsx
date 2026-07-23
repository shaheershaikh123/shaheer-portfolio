import Link from "next/link";
import { profile } from "../lib/data";

export default function BlogCard({ post, featured = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/30 ${
        featured ? "md:grid md:grid-cols-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden border-b border-white/10 ${featured ? "md:border-b-0 md:border-r" : ""}`}>
        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
            featured ? "aspect-[16/9] md:h-full md:aspect-auto" : "aspect-[16/9]"
          }`}
        />
        {post.tags?.[0] && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black">
            {post.tags[0]}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:p-10" : ""}`}>
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/40">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="h-px w-5 bg-white/20" />
          <span>{post.readTime}</span>
        </div>
        <h3
          className={`mt-4 font-[family-name:var(--font-display)] font-semibold leading-snug ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        <p className={`mt-3 flex-1 text-sm leading-relaxed text-white/55 ${featured ? "md:text-base" : ""}`}>
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <img src="/profile.jpg" alt={profile.name} className="h-8 w-8 rounded-full border border-white/15 object-cover" />
            <span className="text-xs text-white/50">{profile.name}</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-white/60 transition-colors group-hover:text-white">
            Read
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
