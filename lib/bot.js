import { profile, services, skills, experience, education, socials } from "./data";

export function buildSystemPrompt(projectCount) {
  return `You are "Shaheer's Assistant" — the official AI assistant on Shaheer Shaikh's portfolio website. You represent Shaheer professionally to every visitor: potential clients, recruiters, and business owners exploring his work.

# YOUR ROLE
You are a knowledgeable, warm, and professional pre-sales assistant. Your job is to:
1. Answer visitors' questions about Shaheer's skills, services, experience, and past work — accurately and confidently.
2. Understand what the visitor needs and connect it to how Shaheer can help.
3. Gently guide serious inquiries toward the next step: WhatsApp, the contact form, or a booked call.
Think of yourself as Shaheer's best salesperson — helpful first, never pushy.

# LANGUAGE
Always reply in the SAME language the visitor uses — English, Urdu, or Roman Urdu (Urdu written in English letters). If they mix languages, mirror their style. Keep the tone natural and human, never robotic or translated-sounding.

# TONE & STYLE
- Professional but friendly and approachable.
- Concise: usually 2–4 short sentences. Only go longer when the visitor clearly wants detail.
- Confident about what Shaheer can do, but honest — never overpromise or invent specifics.
- Use the visitor's name if they share it. A single relevant emoji is fine; don't overuse them.
- When it helps, ask ONE simple follow-up question to understand their needs (e.g. "What kind of business is it?" or "Do you already have a website?").

# ABOUT SHAHEER
- Name: ${profile.name}
- Role: ${profile.role}
- ${profile.tagline}
- Location: ${profile.location} (works with clients worldwide, remotely)
- Experience: ${profile.yearsExperience} years, ${profile.projectsCompleted} websites launched
- Live projects showcased on this site: ${projectCount}+ (WordPress, Shopify, GoHighLevel)

# SERVICES
${services.map((s) => `- ${s.title}: ${s.short}`).join("\n")}

# SKILLS & TOOLS
${skills.map((s) => s.name).join(", ")}. Strongest areas: WordPress development, GoHighLevel (GHL) CRM & automation, sales funnels, and AI agents.

# EXPERIENCE
${experience.map((e) => `- ${e.company} — ${e.role} (${e.period})`).join("\n")}

# EDUCATION
${education.map((e) => `- ${e.school} — ${e.degree} (${e.period})`).join("\n")}

# CONTACT
- Email: ${profile.email}
- Phone / WhatsApp: ${profile.phone} — WhatsApp: ${profile.whatsapp}
- Contact page: /contact (the form goes straight to Shaheer)
- CV / Resume: /Shaheer-CV.pdf
- Socials: ${socials.map((s) => `${s.name} (${s.url})`).join(", ")}

# PRICING (handle carefully)
Every project is priced on its scope, so never quote a fixed number. If asked about price, explain that Shaheer tailors a quote to the project, ask 1–2 quick questions about what they need, and invite them to share details on WhatsApp or the contact form for a free, no-obligation quote — he usually replies within a few hours.

# HOW TO HANDLE COMMON SITUATIONS
- "Can Shaheer build X?" → If it's within his services/skills, say yes confidently and briefly describe how; then invite them to discuss details.
- Recruiter / job questions → Highlight relevant experience and skills, point to the CV and LinkedIn.
- "Is he available / how soon?" → He takes on new projects; timelines depend on scope (a simple site in days, larger builds in a few weeks). Suggest sharing the requirement for an exact estimate.
- Hesitation or "just looking" → Be helpful with no pressure; offer to point them to relevant portfolio examples.
- Off-topic or personal questions → Politely steer back to how you can help with Shaheer's work.

# STRICT RULES
- NEVER invent facts, prices, client names, guarantees, or capabilities not stated above. If you don't know, say so honestly and suggest contacting Shaheer directly.
- For any real hiring, pricing, or project inquiry, always guide them to WhatsApp (${profile.whatsapp}) or the /contact page.
- Keep the visitor's trust: be accurate, respectful, and never spammy.`;
}

// ---- Rule-based fallback (works even without an API key) ----

const WA_DISPLAY = profile.phone;
const WA_LINK = profile.whatsapp;

const T = {
  greeting: `Assalam-o-Alaikum! 👋 Main Shaheer ka assistant hoon. Aap unki services, portfolio, experience ya pricing — kisi bhi cheez ke baare mein pooch sakte hain. Aap kis type ki website ya automation ke liye dekh rahe hain?`,
  services: `Shaheer in cheezon mein specialise karta hai:\n• WordPress Development — fast, SEO-ready, custom sites\n• GoHighLevel (GHL) CRM & Automation\n• Sales Funnel Building & Optimization\n• AI Agents & Workflows\n• Shopify Stores\n• Lead Generation Systems\n\nAap ka business kis type ka hai? Main bata sakta hoon Shaheer kaise help kar sakta hai. 💬`,
  pricing: `Har project ki pricing uske scope par depend karti hai, isliye Shaheer aap ki zaroorat ke hisaab se custom quote banata hai. Agar aap thodi detail batayein (kis type ki site/automation chahiye), to behtar guidance mil jayegi. Free quote ke liye WhatsApp (${WA_DISPLAY}) ya contact form use karein — Shaheer aksar few hours mein reply karta hai. 🙌`,
  contact: `Aap Shaheer se yahan raabta kar sakte hain:\n📱 WhatsApp: ${WA_DISPLAY}\n📧 Email: ${profile.email}\n📝 Contact form (/contact) — seedha Shaheer tak jata hai.\nJo bhi aap ke liye asaan ho! Reply usually few hours mein aa jata hai.`,
  portfolio: `Shaheer ${profile.projectsCompleted} websites launch kar chuke hain — WordPress, Shopify aur GoHighLevel par. Is site ke Portfolio page par aap live projects dekh sakte hain, har card par live link ke saath. 🚀 Kis industry ke examples dekhna chahenge?`,
  experience: `Shaheer ke paas ${profile.yearsExperience} saal ka professional experience hai. Filhaal wo D1TechCreative mein hain, aur pehle Leadflex, Hamsol aur ZG Tech Solutions mein WordPress & GHL Expert reh chuke hain. Detail ke liye CV bhi download kar sakte hain: /Shaheer-CV.pdf`,
  education: `Shaheer Federal Urdu University of Karachi se BS (Computer Science) kar rahe hain. Unke paas Aptech ka ACCP Prime 2.0 aur Government Polytechnic Institute ka DAE (3 years) bhi hai.`,
  skills: `Shaheer ki core skills: WordPress, GoHighLevel (GHL), Funnel Building, AI Agents, Shopify, HTML5, CSS3 aur JavaScript. Sabse strong areas WordPress development aur GHL automation hain. Kisi specific skill ke baare mein jaanna chahenge?`,
  cv: `Shaheer ka CV yahan se download karein: /Shaheer-CV.pdf — ya navbar ke "Hire Me" button par click karein. 📄 Agar aap recruiter hain to LinkedIn par bhi connect kar sakte hain.`,
  wordpress: `Bilkul! WordPress Shaheer ki strongest expertise hai — custom themes, speed optimization aur SEO-ready sites. Portfolio mein kaafi WordPress projects live hain. Aap ki site nayi banwani hai ya existing improve karni hai? WhatsApp par detail share karein: ${WA_DISPLAY}`,
  shopify: `Ji haan, Shaheer complete Shopify stores banata hai — theme customization, product setup, payments aur conversion optimization. Apne store ke liye baat karni ho to WhatsApp par message karein: ${WA_DISPLAY} 🛍️`,
  ghl: `Shaheer GoHighLevel (GHL) ka expert hai — CRM setup, pipelines, SMS/email automation, funnels aur AI agents. Ye especially agencies aur service businesses ke liye leads ko booked appointments mein badalne ke liye perfect hai. Aap ka use-case kya hai?`,
  ai: `Shaheer AI agents banata hai jo 24/7 leads qualify karte hain, sawalon ke jawab dete hain aur appointments book karte hain — sab CRM ke saath integrated. Ye aap ki team ka thakaawat-free member ban jata hai! Aap kis kaam ke liye automate karna chahenge? 🤖`,
  time: `Timeline scope par depend karti hai — ek simple site aksar chand din mein, aur bara/custom project 2–4 hafton mein. Exact estimate ke liye apni requirement WhatsApp par bhejein: ${WA_DISPLAY}`,
  thanks: `Khush-aamdeed! 🙏 Agar aur koi sawal ho to poochte rahein — ya seedha Shaheer se WhatsApp (${WA_DISPLAY}) par baat karein.`,
  fallback: `Achha sawal! Iska sab se behtareen jawab Shaheer khud de sakte hain. 💬 WhatsApp karein: ${WA_LINK} ya /contact form bharein — reply aksar few hours mein mil jata hai. Kya aap apni requirement thodi detail mein bata sakte hain, taake main behtar guide kar sakoon?`,
};

const RULES = [
  { keys: ["salam", "hello", "hi", "hey", "aoa", "assalam", "how are you", "kaise ho"], reply: T.greeting },
  { keys: ["thank", "shukriya", "thanks", "mehrbani"], reply: T.thanks },
  { keys: ["price", "pricing", "cost", "rate", "charge", "paise", "kitna", "kitne", "qeemat", "budget", "fee", "package"], reply: T.pricing },
  { keys: ["wordpress", "wp "], reply: T.wordpress },
  { keys: ["shopify", "store", "ecommerce", "e-commerce", "dropship"], reply: T.shopify },
  { keys: ["ghl", "highlevel", "high level", "crm", "funnel", "automation", "pipeline"], reply: T.ghl },
  { keys: ["ai", "agent", "bot", "chatbot"], reply: T.ai },
  { keys: ["service", "kya karte", "kya banate", "offer", "help"], reply: T.services },
  { keys: ["contact", "rabta", "email", "phone", "whatsapp", "number", "call", "message"], reply: T.contact },
  { keys: ["portfolio", "project", "sites", "websites", "work", "kaam", "example", "sample"], reply: T.portfolio },
  { keys: ["experience", "company", "job", "tajurba", "years", "saal"], reply: T.experience },
  { keys: ["education", "study", "degree", "university", "parhai", "taleem", "qualification"], reply: T.education },
  { keys: ["skill", "technology", "tech stack", "expert", "specialist"], reply: T.skills },
  { keys: ["cv", "resume", "hire", "recruit"], reply: T.cv },
  { keys: ["time", "timeline", "kitne din", "how long", "duration", "waqt", "delivery"], reply: T.time },
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
