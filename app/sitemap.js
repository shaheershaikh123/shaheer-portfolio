import { blogPosts } from "../lib/data";

const SITE_URL = "https://shaheer-portfolio-theta.vercel.app";

export default function sitemap() {
  const pages = ["", "/about", "/services", "/portfolio", "/pricing", "/blog", "/contact"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
    })
  );

  const posts = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
