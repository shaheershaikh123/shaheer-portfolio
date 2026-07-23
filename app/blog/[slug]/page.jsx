import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../../components/Reveal";
import BlogCard from "../../../components/BlogCard";
import { blogPosts, profile } from "../../../lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [profile.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.tags?.join(", "),
    author: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
    },
    publisher: { "@type": "Person", name: profile.name },
  };

  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal>
        <Link
          href="/blog"
          className="text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
        >
          ← Back to blog
        </Link>

        <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl font-bold leading-tight md:text-5xl">
          {post.title}
        </h1>

        {/* author + meta row */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-3">
            <img
              src="/profile.jpg"
              alt={profile.name}
              className="h-10 w-10 rounded-full border border-white/15 object-cover"
            />
            <span>
              <span className="block text-sm font-semibold">{profile.name}</span>
              <span className="block text-xs text-white/40">{profile.role}</span>
            </span>
          </span>
          <span className="h-4 w-px bg-white/15" />
          <span className="text-xs uppercase tracking-widest text-white/40">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="h-4 w-px bg-white/15" />
          <span className="text-xs uppercase tracking-widest text-white/40">
            {post.readTime}
          </span>
        </div>

        {/* tags */}
        {post.tags && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* cover */}
        {post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            className="mt-10 aspect-[16/8] w-full rounded-2xl border border-white/10 object-cover"
          />
        )}
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/70">
          {post.content.map((para, i) =>
            para.startsWith("## ") ? (
              <h2
                key={i}
                className="!mt-12 font-[family-name:var(--font-display)] text-2xl font-semibold text-white md:text-3xl"
              >
                {para.slice(3)}
              </h2>
            ) : (
              <p key={i}>{para}</p>
            )
          )}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
            Need help with your website or automation?
          </p>
          <p className="mt-2 text-sm text-white/50">
            I build this stuff every day. Let&apos;s talk about your project.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Contact me
            </Link>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-black"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </Reveal>

      {others.length > 0 && (
        <div className="mt-16">
          <p className="text-xs uppercase tracking-widest text-white/40">
            More articles
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
