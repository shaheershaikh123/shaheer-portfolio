import Link from "next/link";
import { profile } from "../lib/data";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold">
              SHAHEER<span className="text-white/40">.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              WordPress Developer & GHL Expert building fast websites and
              intelligent automation systems that convert.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Services", "/services"],
                ["Portfolio", "/portfolio"],
                ["Pricing", "/pricing"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="transition-colors hover:text-white"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phoneIntl}`}
                  className="transition-colors hover:text-white"
                >
                  {profile.phone}
                </a>
              </li>
              <li>{profile.location}</li>
              <li>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-white"
                >
                  WhatsApp me
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} Shaheer Shaikh. All rights reserved.
          </p>
          <p>WordPress · GHL · Funnels · AI Automation</p>
        </div>
      </div>
    </footer>
  );
}
