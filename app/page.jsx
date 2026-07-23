import Link from "next/link";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ProjectCarousel from "../components/ProjectCarousel";
import RibbonMarquee from "../components/RibbonMarquee";
import BlogCard from "../components/BlogCard";
import ServicesGrid from "../components/ServicesGrid";
import LaunchVisual from "../components/LaunchVisual";
import Testimonials from "../components/Testimonials";
import { profile, services, experience, skills, blogPosts } from "../lib/data";
import SkillBar from "../components/SkillBar";
import { getProjects } from "../lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <Hero />

      <Marquee
        items={[
          "WordPress",
          "Go HighLevel",
          "Funnel Building",
          "AI Agents",
          "CRM Automation",
          "Shopify",
          "Lead Generation",
          "Speed Optimization",
        ]}
      />

      {/* services preview */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading
          kicker="What I do"
          title="Services that grow businesses"
          description="From pixel-perfect websites to CRM systems that follow up with every lead automatically — I build the full machine."
        />
        <ServicesGrid services={services} />
      </section>

      {/* featured work — full-width auto-playing carousel */}
      <section className="border-t border-white/10 bg-white/[0.02] py-24 md:py-32">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-6">
          <SectionHeading
            kicker="Featured work"
            title="Real websites. Real businesses."
            description="A selection of the sites I've designed, built and launched for clients around the world. Hover a card to scroll through the page."
          />
          <Reveal delay={0.15}>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-black"
            >
              View all {projects.length} projects
            </Link>
          </Reveal>
        </div>
        <ProjectCarousel projects={projects} count={12} />
      </section>

      {/* crossing ribbons */}
      <RibbonMarquee />

      {/* skills */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading
          kicker="Skills & Tools"
          title="Technologies I work with"
          description="The stack I use every day to design, build and automate — from WordPress and Shopify to GoHighLevel and AI agents."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((s, i) => (
            <SkillBar key={s.name} skill={s} index={i} />
          ))}
        </div>
      </section>

      {/* experience strip */}
      <section className="mx-auto max-w-7xl border-t border-white/10 px-6 py-24 md:py-32">
        <SectionHeading
          kicker="Experience"
          title="3+ years, four companies, dozens of launches"
        />
        <div className="mt-14 space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.05}>
              <div className="group grid gap-2 bg-black p-6 transition-colors hover:bg-white hover:text-black md:grid-cols-[1fr_2fr_1fr] md:items-center md:gap-6 md:p-8">
                <div className="flex items-center gap-3">
                  {e.logo ? (
                    <img
                      src={e.logo}
                      alt={`${e.company} logo`}
                      className="h-9 w-9 rounded-lg border border-white/10 bg-white object-contain p-1"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] font-[family-name:var(--font-display)] font-bold transition-colors group-hover:border-black/20 group-hover:bg-black/5">
                      {e.company[0]}
                    </span>
                  )}
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    {e.company}
                  </h3>
                </div>
                <p className="text-sm text-white/50 transition-colors group-hover:text-black/60">
                  {e.role}
                </p>
                <p className="text-sm uppercase tracking-widest text-white/40 transition-colors group-hover:text-black/50 md:text-right">
                  {e.period}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* launch CTA with site collage */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <Reveal>
          <div className="grid items-center gap-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:grid-cols-2 md:p-14">
            <div>
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/40">
                <span className="inline-block h-px w-10 bg-white/40" />
                Start your website
              </p>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-tight md:text-5xl">
                Launch your website or online business with confidence
              </h2>
              <p className="mt-5 leading-relaxed text-white/55">
                Have an idea? Looking to sell services or products? Whether
                it&apos;s a portfolio, business site, funnel or eCommerce store —
                I help turn your vision into a fully functional website with
                automation behind it.
              </p>
              <Link
                href="/contact"
                className="btn-shine mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
              >
                Launch now →
              </Link>
            </div>
            <LaunchVisual />
          </div>
        </Reveal>
      </section>

      {/* testimonials */}
      <Testimonials />

      {/* latest blog posts */}
      <section className="mx-auto max-w-7xl border-t border-white/10 px-6 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="From the blog"
            title="Latest articles & insights"
            description="What I've learned building websites and automation systems — written simply, no jargon."
          />
          <Reveal delay={0.15}>
            <Link
              href="/blog"
              className="rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-black"
            >
              View all articles
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[...blogPosts]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3)
            .map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08} className="h-full">
                <BlogCard post={post} />
              </Reveal>
            ))}
        </div>
      </section>

      {/* big CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center md:py-36">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Have a project in mind?
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-display)] text-5xl font-bold leading-tight md:text-7xl">
              Let's build something that{" "}
              <span className="text-outline">converts</span>.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
              >
                Start a project
              </Link>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-8 py-4 text-sm uppercase tracking-widest transition-all hover:bg-white hover:text-black"
              >
                WhatsApp me
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
