import { profile, services, skills, experience, education, socials } from "./data";

export function buildSystemPrompt(projectCount) {
  return `You are Shaheer Shaikh's friendly portfolio assistant on his personal website. Answer visitors' questions helpfully and concisely. Reply in the same language the visitor writes in (English, Urdu, or Roman Urdu).

ABOUT SHAHEER:
- Name: ${profile.name}
- Role: ${profile.role}
- ${profile.tagline}
- Location: ${profile.location}
- Experience: ${profile.yearsExperience} years, ${profile.projectsCompleted} websites launched
- Portfolio on this site: ${projectCount} live projects (WordPress, Shopify, GoHighLevel)

CONTACT:
- Email: ${profile.email}
- Phone/WhatsApp: ${profile.phone} (WhatsApp link: ${profile.whatsapp})
- Contact page: /contact (form goes straight to Shaheer)
- CV download: /Shaheer-CV.pdf
- Socials: ${socials.map((s) => `${s.name}: ${s.url}`).join(", ")}

SERVICES:
${services.map((s) => `- ${s.title}: ${s.short}`).join("\n")}

SKILLS: ${skills.map((s) => `${s.name} (${s.level}%)`).join(", ")}

EXPERIENCE:
${experience.map((e) => `- ${e.company} — ${e.role} (${e.period})`).join("\n")}

EDUCATION:
${education.map((e) => `- ${e.school} — ${e.degree} (${e.period})`).join("\n")}

PRICING: Prices depend on project scope. Encourage the visitor to share their project details via the contact form or WhatsApp for a free quote — Shaheer usually replies within a few hours.

RULES:
- Keep answers short (2-4 sentences) and friendly.
- For hiring/pricing/project questions, always point to WhatsApp (${profile.whatsapp}) or the /contact page.
- Never invent facts not listed above. If you don't know, say so and suggest contacting Shaheer directly.`;
}

// ---- Rule-based fallback (works without an API key) ----

const T = {
  greeting: `Assalam-o-Alaikum! 👋 Main Shaheer ka assistant hoon. Aap services, portfolio, pricing ya contact ke bare me kuch bhi pooch sakte hain!`,
  services: `Shaheer yeh services deta hai:\n• WordPress Development\n• GHL CRM & Automation\n• Funnel Building\n• AI Agents & Workflows\n• Shopify Stores\n• Lead Generation Systems\n\nDetails ke liye Services page dekhen ya WhatsApp par baat karen!`,
  pricing: `Pricing project ke scope par depend karti hai. 💬 Behtar hai aap apne project ki details WhatsApp (${"0331" + "3143864"}) ya contact form par bhejen — Shaheer free quote ke sath few hours me reply karta hai!`,
  contact: `Aap Shaheer se aise raabta kar sakte hain:\n📧 shaheershaikh392@gmail.com\n📱 WhatsApp: 03313143864\n📝 Contact page ka form bhi seedha Shaheer tak jata hai!`,
  portfolio: `Shaheer ne 500+ websites launch ki hain — WordPress, Shopify aur GoHighLevel par. Is site ke Portfolio page par 45+ live projects dekh sakte hain, har card par live link ke sath! 🚀`,
  experience: `Shaheer ke paas 3+ saal ka experience hai. Wo D1TechCreative me Web Developer hai, aur pehle Leadflex, Hamsol aur ZG Tech Solutions me WordPress & GHL Expert reh chuka hai.`,
  education: `Shaheer Federal Urdu University of Karachi me BS Computer Information kar raha hai. Us ke paas Aptech ka ACCP Prime 2.0 aur Government Polytechnic Institute ka DAE (3 years) bhi hai.`,
  skills: `Shaheer ki top skills: WordPress (95%), GoHighLevel (92%), Funnel Building (90%), HTML5 (90%), CSS3 (88%), AI Agents (85%), Shopify (80%), JavaScript (75%).`,
  cv: `Shaheer ka CV yahan se download karen: /Shaheer-CV.pdf — ya navbar me "Hire Me" button par click karen! 📄`,
  wordpress: `Haan! WordPress Shaheer ki sab se strong skill hai (95%) — custom themes, speed optimization, SEO-ready sites. Portfolio me kai WordPress projects hain. Apne project ke liye WhatsApp par baat karen!`,
  shopify: `Haan, Shaheer Shopify stores banata hai — theme customization, products, payments, sab kuch. Aligned Chiro, Milli Collections aur Compelified us ke Shopify projects hain.`,
  ghl: `Shaheer GoHighLevel (GHL) expert hai — CRM setup, pipelines, SMS/email automation, funnels aur AI agents. Portfolio me 28+ GHL projects hain! Details ke liye WhatsApp karen.`,
  ai: `Shaheer AI agents banata hai jo 24/7 leads qualify karte hain, appointments book karte hain aur FAQs answer karte hain — CRM ke sath integrated. Aap ke business ke liye bhi ban sakta hai!`,
  time: `Project ki timeline scope par depend karti hai — simple site 3-7 din, bara project 2-4 hafte. Exact estimate ke liye WhatsApp par apni requirement bhejen!`,
  fallback: `Acha sawal! Is ka behtareen jawab Shaheer khud de sakta hai. 💬 WhatsApp karen: https://wa.me/923313143864 ya /contact page ka form bharen — reply few hours me milta hai!`,
};

const RULES = [
  { keys: ["salam", "hello", "hi", "hey", "aoa", "assalam"], reply: T.greeting },
  { keys: ["price", "pricing", "cost", "rate", "charge", "paise", "kitna", "kitne", "qeemat", "budget", "fee"], reply: T.pricing },
  { keys: ["wordpress", "wp "], reply: T.wordpress },
  { keys: ["shopify", "store", "ecommerce", "e-commerce"], reply: T.shopify },
  { keys: ["ghl", "highlevel", "high level", "crm", "funnel", "automation"], reply: T.ghl },
  { keys: ["ai", "agent", "bot", "chatbot"], reply: T.ai },
  { keys: ["service", "kya karte", "kya banate", "offer"], reply: T.services },
  { keys: ["contact", "rabta", "email", "phone", "whatsapp", "number", "call"], reply: T.contact },
  { keys: ["portfolio", "project", "sites", "websites", "work", "kaam"], reply: T.portfolio },
  { keys: ["experience", "company", "job", "tajurba"], reply: T.experience },
  { keys: ["education", "study", "degree", "university", "parhai", "taleem"], reply: T.education },
  { keys: ["skill", "technology", "tech stack"], reply: T.skills },
  { keys: ["cv", "resume", "hire"], reply: T.cv },
  { keys: ["time", "timeline", "kitne din", "how long", "duration", "waqt"], reply: T.time },
];

export function ruleBasedReply(message) {
  const m = message.toLowerCase();
  for (const rule of RULES) {
    if (
      rule.keys.some((k) => {
        const key = k.trim();
        const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        // short keys (ai, wp, cv...) need strict word boundaries;
        // longer keys may have suffixes (service -> services)
        const pattern =
          key.length <= 3
            ? `(^|[^a-z])${esc}([^a-z]|$)`
            : `(^|[^a-z])${esc}`;
        return new RegExp(pattern, "i").test(m);
      })
    )
      return rule.reply;
  }
  return T.fallback;
}
