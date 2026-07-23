import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Track from "../components/Track";
import Cursor from "../components/Cursor";
import ScrollProgress from "../components/ScrollProgress";
import ChatWidget from "../components/ChatWidget";
import AmbientBackground from "../components/AmbientBackground";
import Grain from "../components/Grain";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://shaheer-portfolio-theta.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shaheer Shaikh — WordPress Developer & GHL Expert",
    template: "%s — Shaheer Shaikh",
  },
  description:
    "WordPress and Go HighLevel specialist with 3+ years of experience in CRM development, sales automation, funnels and AI agent workflows. 500+ websites launched. Based in Karachi, Pakistan.",
  keywords: [
    "WordPress Developer",
    "GHL Expert",
    "Go HighLevel Expert",
    "Funnel Builder",
    "Shopify Developer",
    "AI Agents",
    "CRM Automation",
    "Web Developer Karachi",
    "Shaheer Shaikh",
  ],
  authors: [{ name: "Shaheer Shaikh" }],
  creator: "Shaheer Shaikh",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Shaheer Shaikh — Portfolio",
    title: "Shaheer Shaikh — WordPress Developer & GHL Expert",
    description:
      "I build fast websites and intelligent automation systems that convert leads into customers. 500+ websites launched on WordPress, Shopify and GoHighLevel.",
    images: [{ url: "/profile.jpg", width: 800, height: 1000, alt: "Shaheer Shaikh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaheer Shaikh — WordPress Developer & GHL Expert",
    description:
      "Fast websites and intelligent automation systems that convert leads into customers.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shaheer Shaikh",
  jobTitle: "WordPress Developer & GHL Expert",
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  email: "mailto:shaheershaikh392@gmail.com",
  telephone: "+923313143864",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [
    "https://www.linkedin.com/in/shaheer-shaikh-ghl-expert/",
    "https://www.instagram.com/shaheer4436/",
    "https://www.facebook.com/shaheer.shaikh.537537",
  ],
  knowsAbout: [
    "WordPress Development",
    "Go HighLevel",
    "Shopify",
    "Funnel Building",
    "AI Agents",
    "CRM Automation",
    "SEO",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shaheer Shaikh — Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Shaheer Shaikh — WordPress Developer & GHL Expert building fast websites and automation systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <AmbientBackground />
        <Grain />
        <Track />
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
