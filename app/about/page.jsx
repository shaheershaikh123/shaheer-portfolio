import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import SkillBar from "../../components/SkillBar";
import SocialLinks from "../../components/SocialLinks";
import TimelineTabs from "../../components/TimelineTabs";
import Counter from "../../components/Counter";
import { profile, skills } from "../../lib/data";

export const metadata = {
  title: "About",
  description:
    "About Shaheer Shaikh — WordPress Developer & GHL Expert from Karachi with 3+ years of experience in websites, funnels and automation.",
};

const hobbies = [
  "Cricket",
  "Reading",
  "Learning",
  "Designing",
  "Traveling",
  "Gaming",
  "Research",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36">
      {/* intro */}
      <div className="grid items-start gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionHeading kicker="About me" title="The developer behind the sites" />
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-white/70">
              {profile.tagline}
            </p>
            <p className="mt-6 leading-relaxed text-white/55">
              Based in Karachi, Pakistan, I've spent the last three years
              working with agencies and businesses across the world — building
              WordPress websites, Shopify stores, high-converting funnels, and
              Go HighLevel CRM systems. My focus is always the same: a site
              that loads fast, looks professional, and turns visitors into
              leads — backed by automation that follows up with every single
              one of them.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["3+", "Years experience"],
                ["500+", "Sites launched"],
                ["4", "Companies"],
                ["24/7", "Automation"],
              ].map(([num, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"
                >
                  <p className="font-[family-name:var(--font-display)] text-3xl font-bold">
                    <Counter value={num} />
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-white/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* profile card */}
        <Reveal delay={0.15}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <img
              src="/profile.jpg"
              alt="Shaheer Shaikh"
              className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
            <div className="p-6">
              <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {profile.name}
              </p>
              <p className="mt-1 text-sm text-white/50">{profile.role}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-white/60">
                <li>📍 {profile.location}</li>
                <li>
                  ✉️{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="underline underline-offset-4 hover:text-white"
                  >
                    {profile.email}
                  </a>
                </li>
                <li>🗣 English · Urdu</li>
              </ul>
              <SocialLinks className="mt-5" />
              <a
                href="/Shaheer-CV.pdf"
                download="Shaheer-Shaikh-CV.pdf"
                className="mt-5 block rounded-full bg-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-[1.03]"
              >
                Download CV
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* skills */}
      <section className="mt-28">
        <SectionHeading
          kicker="Skills"
          title="Tools I've mastered"
          description="The stack I use every day to design, build and automate."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((s, i) => (
            <SkillBar key={s.name} skill={s} index={i} />
          ))}
        </div>
      </section>

      {/* career timeline with tabs */}
      <section className="mt-28">
        <SectionHeading
          kicker="Professional journey"
          title="Experience, education & achievements"
          description="A timeline of my career path and the valuable experiences that have shaped my expertise."
        />
        <div className="mt-14">
          <TimelineTabs />
        </div>
      </section>

      {/* hobbies */}
      <section className="mt-28">
        <SectionHeading kicker="Beyond work" title="Hobbies & interests" />
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            {hobbies.map((h) => (
              <span
                key={h}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/70 transition-all hover:bg-white hover:text-black"
              >
                {h}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
