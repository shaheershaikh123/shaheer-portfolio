"use client";

import { useState } from "react";
import { profile } from "../lib/data";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/60";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "WordPress Development",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(r.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const waText = encodeURIComponent(
    `Hi Shaheer! I'm ${form.name || "..."}. I need: ${form.service}. ${form.message}`
  );
  const waHref = `${profile.whatsapp}?text=${waText}`;

  if (status === "sent") {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-black">
          ✓
        </span>
        <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-semibold">
          Message mil gaya!
        </h3>
        <p className="mt-3 max-w-sm text-white/55">
          Thank you {form.name.split(" ")[0]}! I've received your message and
          will get back to you within a few hours.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 rounded-full border border-white/30 px-7 py-3.5 text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-black"
        >
          Need it faster? WhatsApp me
        </a>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
      onSubmit={submit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/40">
            Your name *
          </label>
          <input
            className={inputClass}
            placeholder="John Doe"
            value={form.name}
            onChange={set("name")}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/40">
            Your email *
          </label>
          <input
            type="email"
            className={inputClass}
            placeholder="john@company.com"
            value={form.email}
            onChange={set("email")}
            required
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs uppercase tracking-widest text-white/40">
          What do you need?
        </label>
        <select
          className={`${inputClass} appearance-none [&>option]:bg-black`}
          value={form.service}
          onChange={set("service")}
        >
          {[
            "WordPress Development",
            "GHL CRM & Automation",
            "Funnel Building",
            "AI Agents & Workflows",
            "Shopify Store",
            "Lead Generation System",
            "Something else",
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs uppercase tracking-widest text-white/40">
          Project details *
        </label>
        <textarea
          rows={5}
          className={inputClass}
          placeholder="Tell me about your project, goals and timeline..."
          value={form.message}
          onChange={set("message")}
          required
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Kuch masla hua — dobara try karen ya WhatsApp use karen.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex-1 rounded-full bg-white px-8 py-4 text-center text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-white/30 px-8 py-4 text-center text-sm uppercase tracking-widest transition-all hover:bg-white hover:text-black"
        >
          WhatsApp instead
        </a>
      </div>
      <p className="mt-4 text-center text-xs text-white/30">
        Your message goes straight to Shaheer — reply usually within a few hours.
      </p>
    </form>
  );
}
