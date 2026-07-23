import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import BlogCard from "../../components/BlogCard";
import { blogPosts } from "../../lib/data";

export const metadata = {
  title: "Blog",
  description:
    "Articles on WordPress, Shopify, Go HighLevel automation, AI agents and conversion — written by Shaheer Shaikh.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Shaheer Shaikh",
    description:
      "Articles on WordPress, Shopify, Go HighLevel automation, AI agents and conversion.",
  },
};

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36">
      <SectionHeading
        kicker="Blog"
        title="Thoughts on websites, automation & AI"
        description="What I've learned building websites and automation systems for businesses — written simply, no jargon."
      />

      {/* featured post */}
      <Reveal>
        <div className="mt-14">
          <BlogCard post={featured} featured />
        </div>
      </Reveal>

      {/* rest of the grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 0.08} className="h-full">
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
