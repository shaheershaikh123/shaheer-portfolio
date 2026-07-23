import Image from "next/image";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import { pricing } from "../../lib/data";

export const metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for WordPress websites, Shopify stores and GoHighLevel funnels, CRM & automation builds by Shaheer Shaikh.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36">
      <SectionHeading
        kicker="Pricing"
        title="Simple, transparent pricing"
        description="Every platform is priced separately — pick what your business needs. All prices are in USD, one-time project fees with no hidden costs. Need something custom? Get in touch for a tailored quote."
      />

      <div className="mt-20 space-y-24">
        {pricing.map((platform) => (
          <section key={platform.platform} id={platform.platform.toLowerCase()}>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] p-2.5">
                  <Image
                    src={platform.icon}
                    alt={platform.platform}
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                  />
                </span>
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
                    {platform.platform}
                  </h2>
                  <p className="mt-1 text-sm text-white/50">
                    {platform.tagline}
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {platform.plans.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.07}>
                  <div
                    className={`card-lift relative flex h-full flex-col rounded-2xl border p-8 ${
                      plan.popular
                        ? "border-white/40 bg-white/[0.06]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-8 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black">
                        Most popular
                      </span>
                    )}

                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                      {plan.summary}
                    </p>

                    <div className="mt-6 flex items-end gap-2">
                      <span className="font-[family-name:var(--font-display)] text-5xl font-bold">
                        ${plan.price}
                      </span>
                      <span className="pb-1.5 text-xs uppercase tracking-widest text-white/40">
                        {plan.priceNote}
                      </span>
                    </div>

                    <p className="mt-3 inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                      {plan.pages}
                    </p>

                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-white/65"
                        >
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 text-xs uppercase tracking-widest text-white/40">
                      {plan.delivery}
                    </p>

                    <Link
                      href="/contact"
                      className={`mt-6 block rounded-full px-6 py-3 text-center text-xs uppercase tracking-widest transition-all ${
                        plan.popular
                          ? "bg-white text-black hover:bg-white/85"
                          : "border border-white/30 hover:bg-white hover:text-black"
                      }`}
                    >
                      Get started ↗
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* custom quote CTA */}
      <Reveal>
        <div className="mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center md:p-14">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
            Not sure which package fits?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/55">
            Every business is different. Tell me what you&apos;re building —
            I&apos;ll recommend the right platform and send you a custom quote
            within 24 hours. Monthly maintenance & support plans are also
            available.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-xs uppercase tracking-widest text-black transition-all hover:bg-white/85"
          >
            Get a custom quote ↗
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
