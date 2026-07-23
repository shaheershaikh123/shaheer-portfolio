import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import ContactForm from "../../components/ContactForm";
import SocialLinks from "../../components/SocialLinks";
import { profile } from "../../lib/data";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Shaheer Shaikh for WordPress, GHL, funnel and automation projects.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36">
      <SectionHeading
        kicker="Contact"
        title="Let's talk about your project"
        description="Tell me what you're building — I usually reply within a few hours. Prefer chat? WhatsApp is the fastest way to reach me."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        {/* contact info */}
        <Reveal>
          <div className="space-y-4">
            {[
              {
                label: "Email",
                value: profile.email,
                href: `mailto:${profile.email}`,
              },
              {
                label: "Phone",
                value: profile.phone,
                href: `tel:${profile.phoneIntl}`,
              },
              {
                label: "WhatsApp",
                value: "Chat instantly",
                href: profile.whatsapp,
                external: true,
              },
              {
                label: "Location",
                value: profile.location,
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25"
              >
                <p className="text-xs uppercase tracking-widest text-white/40">
                  {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="mt-2 block font-[family-name:var(--font-display)] text-lg font-medium underline-offset-4 hover:underline"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-medium">
                    {c.value}
                  </p>
                )}
              </div>
            ))}

            <div className="rounded-2xl border border-white/10 bg-white p-6 text-black">
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                Availability
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                Currently taking on new WordPress, GHL and automation projects.
                Response time: usually within a few hours.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-widest text-white/40">
                Follow me
              </p>
              <SocialLinks className="mt-4" />
            </div>
          </div>
        </Reveal>

        {/* form */}
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
