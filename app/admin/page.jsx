"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const input =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/60";
const btn =
  "rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-[1.03] disabled:opacity-50";

const PLATFORMS = ["WordPress", "Shopify", "GoHighLevel", "Other"];

const emptyForm = {
  id: "",
  name: "",
  url: "",
  category: "",
  platform: "WordPress",
  description: "",
};

/* ---------- SVG icons ---------- */
const ICONS = {
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15v3" />
      <path d="M11 11v7" />
      <path d="M15 7v11" />
      <path d="M19 12v6" />
    </>
  ),
  folder: (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  inbox: (
    <>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  pencil: (
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
  ),
  restore: (
    <>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </>
  ),
  smartphone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M12 18h.01" />
    </>
  ),
  tablet: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M12 18h.01" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  alert: (
    <>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  filter: <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  browser: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v6" />
      <path d="m19 5-4.2 4.2" />
      <path d="M22 12h-6" />
    </>
  ),
};

function Icon({ name, className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

const NAV = [
  { key: "tracking", label: "Tracking", icon: "chart" },
  { key: "projects", label: "Projects", icon: "folder" },
  { key: "add", label: "Add Project", icon: "plus" },
  { key: "submissions", label: "Form Submissions", icon: "inbox" },
  { key: "trash", label: "Trash", icon: "trash" },
];

/* ---------- time filters ---------- */
const TIME_FILTERS = [
  { key: "today", label: "Aaj" },
  { key: "week", label: "7 Days" },
  { key: "month", label: "30 Days" },
  { key: "year", label: "1 Year" },
  { key: "all", label: "All Time" },
];

function cutoffFor(key) {
  const now = new Date();
  if (key === "today") {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (key === "week") return new Date(now.getTime() - 7 * 86400000);
  if (key === "month") return new Date(now.getTime() - 30 * 86400000);
  if (key === "year") return new Date(now.getTime() - 365 * 86400000);
  return null;
}

function FilterChips({ options, value, onChange, counts }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Icon name="filter" className="h-3.5 w-3.5 text-white/40" />
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-widest transition-all ${
            value === o.key
              ? "border-white bg-white font-semibold text-black"
              : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
          }`}
        >
          {o.label}
          {counts && counts[o.key] !== undefined && (
            <span className="ml-1.5 opacity-60">({counts[o.key]})</span>
          )}
        </button>
      ))}
    </div>
  );
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function deviceIconName(d) {
  return d === "Mobile" ? "smartphone" : d === "Tablet" ? "tablet" : "monitor";
}

/* ---------- creative delete confirmation popup ---------- */
function ConfirmModal({ state, onCancel }) {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-red-500/30 bg-[#0d0d0d] p-8 text-center shadow-[0_0_80px_-20px_rgba(239,68,68,0.4)]"
          >
            {/* animated warning glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-red-500/20 blur-3xl" />

            <motion.div
              animate={{ rotate: [0, -8, 8, -6, 6, 0] }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/40 bg-red-500/10 text-red-400"
            >
              <Icon name={state.icon || "trash"} className="h-7 w-7" />
            </motion.div>

            <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold">
              {state.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {state.message}
            </p>

            <div className="mt-7 flex justify-center gap-3">
              <button
                onClick={onCancel}
                className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-widest text-white/70 transition-all hover:border-white/50 hover:text-white"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  state.action();
                  onCancel();
                }}
                className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-[0_8px_30px_-8px_rgba(239,68,68,0.7)]"
              >
                <Icon name={state.icon || "trash"} className="h-3.5 w-3.5" />
                {state.confirmLabel || "Haan, delete karo"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [view, setView] = useState("tracking");
  const [projects, setProjects] = useState([]);
  const [trash, setTrash] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [confirmState, setConfirmState] = useState(null);
  const [trackRange, setTrackRange] = useState("all");
  const [platFilter, setPlatFilter] = useState("All");
  const [subRange, setSubRange] = useState("all");

  const loadAll = () => {
    fetch("/api/projects", { cache: "no-store" }).then((r) => r.json()).then(setProjects).catch(() => {});
    fetch("/api/admin/analytics", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => d && setAnalytics(d)).catch(() => {});
    fetch("/api/admin/submissions", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => d && setSubmissions(d)).catch(() => {});
    fetch("/api/admin/trash", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => Array.isArray(d) && setTrash(d)).catch(() => {});
  };

  useEffect(() => {
    fetch("/api/admin/analytics", { cache: "no-store" })
      .then((r) => {
        if (r.ok) {
          setAuthed(true);
          r.json().then(setAnalytics);
          loadAll();
        }
      })
      .finally(() => setChecking(false));
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (r.ok) {
      setAuthed(true);
      loadAll();
    } else setMsg("Ghalat password. Dobara try karen.");
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  };

  const submitProject = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);
    const r = await fetch("/api/admin/projects", { method: form.id ? "PUT" : "POST", body: fd });
    const data = await r.json();
    setBusy(false);
    if (data.ok) {
      setMsg(form.id ? "Project update ho gaya ✅ (1 min me live)" : "Project add ho gaya ✅ (1 min me live)");
      setForm(emptyForm);
      setImageFile(null);
      loadAll();
      setView("projects");
    } else setMsg("Error: " + (data.error || "kuch ghalat hua"));
  };

  const editProject = (p) => {
    setForm({
      id: p.id,
      name: p.name,
      url: p.url,
      category: p.category,
      platform: p.platform || "WordPress",
      description: p.description || "",
    });
    setView("add");
    window.scrollTo(0, 0);
  };

  /* delete = move to trash (with creative confirm popup) */
  const deleteProject = (p) => {
    setConfirmState({
      icon: "trash",
      title: "Trash mein bhejein?",
      message: `"${p.name}" live site se hat jaye ga aur Trash mein chala jaye ga. Aap isay baad mein restore ya permanently delete kar sakte hain.`,
      confirmLabel: "Haan, trash karo",
      action: async () => {
        const r = await fetch(`/api/admin/projects?id=${encodeURIComponent(p.id)}`, { method: "DELETE" });
        if ((await r.json()).ok) {
          setProjects((prev) => prev.filter((x) => x.id !== p.id));
          setTrash((prev) => [{ ...p, deletedAt: new Date().toISOString() }, ...prev]);
          setMsg("Trash mein chala gaya 🗑 (live site se hat gaya)");
        }
      },
    });
  };

  const restoreProject = async (p) => {
    const r = await fetch("/api/admin/trash", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: p.id }),
    });
    if ((await r.json()).ok) {
      setTrash((prev) => prev.filter((x) => x.id !== p.id));
      const { deletedAt, ...proj } = p;
      setProjects((prev) => [proj, ...prev]);
      setMsg(`"${p.name}" restore ho gaya ✅ (1 min me live)`);
    }
  };

  const deleteForever = (p) => {
    setConfirmState({
      icon: "alert",
      title: "Permanently delete karein?",
      message: `"${p.name}" hamesha ke liye delete ho jaye ga. Yeh action wapas nahi ho sakta!`,
      confirmLabel: "Delete forever",
      action: async () => {
        const r = await fetch(`/api/admin/trash?id=${encodeURIComponent(p.id)}`, { method: "DELETE" });
        if ((await r.json()).ok) {
          setTrash((prev) => prev.filter((x) => x.id !== p.id));
          setMsg("Permanently delete ho gaya ❌");
        }
      },
    });
  };

  const emptyTrash = () => {
    setConfirmState({
      icon: "alert",
      title: "Poora trash khali karein?",
      message: `Trash ke saray ${trash.length} projects hamesha ke liye delete ho jayenge. Yeh action wapas nahi ho sakta!`,
      confirmLabel: "Sab delete karo",
      action: async () => {
        const r = await fetch("/api/admin/trash?all=1", { method: "DELETE" });
        if ((await r.json()).ok) {
          setTrash([]);
          setMsg("Trash khali ho gaya ❌");
        }
      },
    });
  };

  if (checking) {
    return <div className="flex min-h-screen items-center justify-center text-white/50">Loading...</div>;
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-white/50">Portfolio manage karne ke liye password dalen.</p>
          <input
            type="password"
            className={`${input} mt-6`}
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {msg && <p className="mt-3 text-sm text-red-400">{msg}</p>}
          <button className={`${btn} mt-6 w-full`} disabled={busy}>
            {busy ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  /* ---- analytics derived data (with time filter) ---- */
  const days = analytics?.days || {};
  const dayKeys = Object.keys(days).sort();
  const today = new Date().toISOString().slice(0, 10);
  const cutoff = cutoffFor(trackRange);
  const cutoffStr = cutoff ? cutoff.toISOString().slice(0, 10) : null;
  const rangeDayKeys = cutoffStr ? dayKeys.filter((d) => d >= cutoffStr) : dayKeys;

  const rangeViews = rangeDayKeys.reduce((s, d) => s + (days[d].total || 0), 0);
  const todayViews = days[today]?.total || 0;
  const last7 = dayKeys.slice(-7).reduce((s, d) => s + (days[d].total || 0), 0);

  const pathTotals = {};
  rangeDayKeys.forEach((d) =>
    Object.entries(days[d].paths || {}).forEach(([p, n]) => {
      pathTotals[p] = (pathTotals[p] || 0) + n;
    })
  );
  const topPaths = Object.entries(pathTotals).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const allEvents = analytics?.events || [];
  const rangeEvents = cutoff ? allEvents.filter((ev) => new Date(ev.ts) >= cutoff) : allEvents;

  // For "All Time" use full aggregate history; for a filtered range compute
  // from recent events (last 300 visits recorded).
  let countries, devices, browsers;
  if (!cutoff) {
    countries = Object.entries(analytics?.countries || {}).sort((a, b) => b[1] - a[1]).slice(0, 10);
    devices = Object.entries(analytics?.devices || {}).sort((a, b) => b[1] - a[1]);
    browsers = Object.entries(analytics?.browsers || {}).sort((a, b) => b[1] - a[1]).slice(0, 6);
  } else {
    const agg = (key) => {
      const m = {};
      rangeEvents.forEach((ev) => {
        let k;
        if (key === "country") k = ev.city ? `${ev.city}, ${ev.country}` : ev.country;
        else k = ev[key];
        if (k) m[k] = (m[k] || 0) + 1;
      });
      return Object.entries(m).sort((a, b) => b[1] - a[1]);
    };
    countries = agg("country").slice(0, 10);
    devices = agg("device");
    browsers = agg("browser").slice(0, 6);
  }
  const deviceTotal = devices.reduce((s, [, n]) => s + n, 0) || 1;

  /* ---- projects platform filter ---- */
  const platOptions = [
    { key: "All", label: "All" },
    ...PLATFORMS.map((p) => ({ key: p, label: p })),
  ];
  const platCounts = { All: projects.length };
  PLATFORMS.forEach((p) => {
    platCounts[p] = projects.filter((x) => (x.platform || "Other") === p).length;
  });
  const filteredProjects =
    platFilter === "All" ? projects : projects.filter((p) => (p.platform || "Other") === platFilter);

  /* ---- submissions time filter ---- */
  const subCutoff = cutoffFor(subRange);
  const filteredSubmissions = subCutoff
    ? submissions.filter((s) => new Date(s.ts) >= subCutoff)
    : submissions;
  const subCounts = {};
  TIME_FILTERS.forEach((f) => {
    const c = cutoffFor(f.key);
    subCounts[f.key] = c ? submissions.filter((s) => new Date(s.ts) >= c).length : submissions.length;
  });

  const card = "rounded-2xl border border-white/10 bg-white/[0.03] p-6";
  const cardTitle = "flex items-center gap-2 text-xs uppercase tracking-widest text-white/40";

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-0 px-4 pb-16 pt-28 md:gap-8 md:px-6">
      <ConfirmModal state={confirmState} onCancel={() => setConfirmState(null)} />

      {/* ===== SIDEBAR ===== */}
      <aside className="hidden w-60 shrink-0 md:block">
        <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="px-3 pb-3 pt-1 font-[family-name:var(--font-display)] text-lg font-bold">
            Admin Panel
          </p>
          <nav className="space-y-1">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => setView(n.key)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors ${
                  view === n.key ? "bg-white font-semibold text-black" : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon name={n.icon} className="h-4 w-4" /> {n.label}
                {n.key === "submissions" && submissions.length > 0 && (
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${view === n.key ? "bg-black text-white" : "bg-white text-black"}`}>
                    {submissions.length}
                  </span>
                )}
                {n.key === "projects" && (
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${view === n.key ? "bg-black text-white" : "bg-white/15 text-white/70"}`}>
                    {projects.length}
                  </span>
                )}
                {n.key === "trash" && trash.length > 0 && (
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${view === n.key ? "bg-black text-white" : "bg-red-500/80 text-white"}`}>
                    {trash.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
            <a href="/portfolio" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:bg-white/10 hover:text-white">
              <Icon name="globe" className="h-4 w-4" /> View site
            </a>
            <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/60 hover:bg-white/10 hover:text-white">
              <Icon name="logout" className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="min-w-0 flex-1">
        {/* mobile nav */}
        <div className="mb-6 flex flex-wrap gap-2 md:hidden">
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => setView(n.key)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs uppercase tracking-widest ${
                view === n.key ? "border-white bg-white text-black" : "border-white/20 text-white/60"
              }`}
            >
              <Icon name={n.icon} className="h-3.5 w-3.5" /> {n.label}
            </button>
          ))}
          <button onClick={logout} className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white/60">
            <Icon name="logout" className="h-3.5 w-3.5" /> Logout
          </button>
        </div>

        {msg && <p className="mb-4 text-sm text-white/70">{msg}</p>}

        {/* ======== TRACKING ======== */}
        {view === "tracking" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-3xl font-bold">
                <Icon name="chart" className="h-7 w-7" /> Tracking
              </h1>
              <FilterChips options={TIME_FILTERS} value={trackRange} onChange={setTrackRange} />
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                [rangeViews, trackRange === "all" ? "Total views" : `Views (${TIME_FILTERS.find((f) => f.key === trackRange)?.label})`, "eye"],
                [todayViews, "Aaj ke views", "calendar"],
                [last7, "Last 7 days", "chart"],
                [submissions.length, "Form submissions", "inbox"],
              ].map(([num, label, ic]) => (
                <div key={label} className={`${card} text-center`}>
                  <Icon name={ic} className="mx-auto h-4 w-4 text-white/30" />
                  <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold">{num}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-white/40">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* daily views */}
              <div className={card}>
                <p className={cardTitle}>
                  <Icon name="chart" className="h-3.5 w-3.5" /> Daily views {trackRange === "all" ? "(last 14 days)" : ""}
                </p>
                <div className="mt-4 space-y-2">
                  {(trackRange === "all" ? rangeDayKeys.slice(-14) : rangeDayKeys).slice(-31).reverse().map((d, _, arr) => {
                    const max = Math.max(...arr.map((k) => days[k].total), 1);
                    return (
                      <div key={d} className="flex items-center gap-3 text-sm">
                        <span className="w-16 shrink-0 text-white/50">{d.slice(5)}</span>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-white" style={{ width: `${(days[d].total / max) * 100}%` }} />
                        </div>
                        <span className="w-10 text-right text-white/70">{days[d].total}</span>
                      </div>
                    );
                  })}
                  {!rangeDayKeys.length && <p className="text-sm text-white/40">Is range me data nahi.</p>}
                </div>
              </div>

              {/* locations */}
              <div className={card}>
                <p className={cardTitle}>
                  <Icon name="pin" className="h-3.5 w-3.5" /> Kahan se views aa rahe hain
                </p>
                <div className="mt-4 space-y-2">
                  {countries.map(([c, n]) => (
                    <div key={c} className="flex items-center justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="truncate text-white/70">{c}</span>
                      <span className="ml-4 shrink-0 text-white/50">{n} views</span>
                    </div>
                  ))}
                  {!countries.length && <p className="text-sm text-white/40">Is range me data nahi.</p>}
                </div>
              </div>

              {/* devices */}
              <div className={card}>
                <p className={cardTitle}>
                  <Icon name="smartphone" className="h-3.5 w-3.5" /> Devices (Phone / PC)
                </p>
                <div className="mt-4 space-y-3">
                  {devices.map(([d, n]) => (
                    <div key={d} className="flex items-center gap-3 text-sm">
                      <span className="flex w-24 shrink-0 items-center gap-1.5 text-white/70">
                        <Icon name={deviceIconName(d)} className="h-3.5 w-3.5" /> {d}
                      </span>
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-white" style={{ width: `${(n / deviceTotal) * 100}%` }} />
                      </div>
                      <span className="w-14 text-right text-white/50">{Math.round((n / deviceTotal) * 100)}%</span>
                    </div>
                  ))}
                  {!devices.length && <p className="text-sm text-white/40">Is range me data nahi.</p>}
                </div>
              </div>

              {/* browsers */}
              <div className={card}>
                <p className={cardTitle}>
                  <Icon name="browser" className="h-3.5 w-3.5" /> Browsers (Chrome / Edge...)
                </p>
                <div className="mt-4 space-y-2">
                  {browsers.map(([b, n]) => (
                    <div key={b} className="flex items-center justify-between border-b border-white/5 pb-2 text-sm">
                      <span className="text-white/70">{b}</span>
                      <span className="text-white/50">{n} views</span>
                    </div>
                  ))}
                  {!browsers.length && <p className="text-sm text-white/40">Is range me data nahi.</p>}
                </div>
              </div>
            </div>

            {/* top pages */}
            <div className={card}>
              <p className={cardTitle}>
                <Icon name="eye" className="h-3.5 w-3.5" /> Top pages
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {topPaths.map(([p, n]) => (
                  <div key={p} className="flex items-center justify-between border-b border-white/5 pb-2 text-sm">
                    <span className="truncate text-white/70">{p}</span>
                    <span className="ml-4 shrink-0 text-white/50">{n}</span>
                  </div>
                ))}
                {!topPaths.length && <p className="text-sm text-white/40">Is range me data nahi.</p>}
              </div>
            </div>

            {/* recent visitors */}
            <div className={card}>
              <p className={cardTitle}>
                <Icon name="clock" className="h-3.5 w-3.5" /> Recent visitors (kaun, kahan se, kis device se)
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] uppercase tracking-widest text-white/40">
                      <th className="pb-2 pr-4">Time</th>
                      <th className="pb-2 pr-4">Page</th>
                      <th className="pb-2 pr-4">Location</th>
                      <th className="pb-2 pr-4">Device</th>
                      <th className="pb-2">Browser</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rangeEvents.slice(0, 30).map((ev, i) => (
                      <tr key={i} className="border-b border-white/5 text-white/70">
                        <td className="whitespace-nowrap py-2.5 pr-4 text-white/50">{timeAgo(ev.ts)}</td>
                        <td className="py-2.5 pr-4">{ev.path}</td>
                        <td className="py-2.5 pr-4">{ev.city ? `${ev.city}, ` : ""}{ev.country}</td>
                        <td className="py-2.5 pr-4">
                          <span className="inline-flex items-center gap-1.5">
                            <Icon name={deviceIconName(ev.device)} className="h-3.5 w-3.5" /> {ev.device} ({ev.os})
                          </span>
                        </td>
                        <td className="py-2.5">{ev.browser}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!rangeEvents.length && <p className="py-3 text-sm text-white/40">Is range me koi visitor record nahi.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ======== PROJECTS ======== */}
        {view === "projects" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-3xl font-bold">
                <Icon name="folder" className="h-7 w-7" /> Projects ({filteredProjects.length})
              </h1>
              <button onClick={() => { setForm(emptyForm); setView("add"); }} className={`${btn} flex items-center gap-2`}>
                <Icon name="plus" className="h-3.5 w-3.5" /> Add Project
              </button>
            </div>

            <div className="mt-5">
              <FilterChips options={platOptions} value={platFilter} onChange={setPlatFilter} counts={platCounts} />
            </div>

            <div className="mt-6 space-y-3">
              {filteredProjects.map((p) => (
                <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20">
                  <img src={p.image} alt="" className="h-14 w-20 shrink-0 rounded-lg border border-white/10 bg-white object-cover object-top" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{p.name}</p>
                    <p className="truncate text-xs text-white/40">{p.platform} · {p.category} · {p.url}</p>
                  </div>
                  <button onClick={() => editProject(p)} className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black">
                    <Icon name="pencil" className="h-3 w-3" /> Edit
                  </button>
                  <button onClick={() => deleteProject(p)} className="flex items-center gap-1.5 rounded-full border border-red-400/40 px-4 py-2 text-xs uppercase tracking-widest text-red-300 hover:bg-red-500 hover:text-white">
                    <Icon name="trash" className="h-3 w-3" /> Delete
                  </button>
                </div>
              ))}
              {!filteredProjects.length && (
                <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/40">
                  Is platform ka koi project nahi.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ======== ADD / EDIT ======== */}
        {view === "add" && (
          <div>
            <h1 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-3xl font-bold">
              <Icon name={form.id ? "pencil" : "plus"} className="h-7 w-7" />
              {form.id ? "Edit Project" : "Add Project"}
            </h1>
            <form onSubmit={submitProject} className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              {form.id && (
                <p className="mb-4 text-sm text-white/50">
                  Editing: <span className="text-white">{form.name}</span>{" "}
                  <button type="button" className="ml-2 underline" onClick={() => { setForm(emptyForm); setImageFile(null); }}>
                    (cancel edit)
                  </button>
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Site ka naam *</label>
                  <input className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="My New Website" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Live link *</label>
                  <input className={input} value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://example.com" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Platform</label>
                  <select className={`${input} [&>option]:bg-black`} value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
                    {PLATFORMS.map((p) => (<option key={p}>{p}</option>))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Category</label>
                  <input className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="E-commerce / Services / Agency..." />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Description</label>
                <textarea rows={3} className={input} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ek line me site ki description..." />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">
                  Screenshot / Image {form.id ? "(khali choro to purani rahegi)" : "*"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-white/60 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-5 file:py-2.5 file:text-xs file:font-semibold file:uppercase file:tracking-widest file:text-black"
                />
                <p className="mt-2 text-xs text-white/30">Best: lambi (tall) screenshot ~640px wide — hover par scroll hogi.</p>
              </div>
              <button className={`${btn} mt-6`} disabled={busy}>
                {busy ? "Saving..." : form.id ? "Update project" : "Add project"}
              </button>
            </form>
          </div>
        )}

        {/* ======== SUBMISSIONS ======== */}
        {view === "submissions" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-3xl font-bold">
                <Icon name="inbox" className="h-7 w-7" /> Form Submissions ({filteredSubmissions.length})
              </h1>
            </div>
            <p className="mt-2 text-sm text-white/50">
              Contact form jis jis ne fill kiya — kab, kahan se aur kis device se.
            </p>
            <div className="mt-5">
              <FilterChips options={TIME_FILTERS} value={subRange} onChange={setSubRange} counts={subCounts} />
            </div>
            <div className="mt-6 space-y-4">
              {filteredSubmissions.map((s) => (
                <div key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-[family-name:var(--font-display)] text-lg font-semibold">{s.name}</p>
                    <span className="flex items-center gap-1.5 text-xs text-white/40">
                      <Icon name="clock" className="h-3 w-3" />
                      {new Date(s.ts).toLocaleString()} ({timeAgo(s.ts)})
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/60">
                    <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1.5 underline underline-offset-4">
                      <Icon name="mail" className="h-3.5 w-3.5" /> {s.email}
                    </a>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="wrench" className="h-3.5 w-3.5" /> {s.service}
                    </span>
                  </div>
                  <p className="mt-3 rounded-xl bg-white/[0.04] p-4 text-sm leading-relaxed text-white/75">{s.message}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/40">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="pin" className="h-3 w-3" /> {s.city ? `${s.city}, ` : ""}{s.country}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name={deviceIconName(s.device)} className="h-3 w-3" /> {s.device} · {s.os}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="browser" className="h-3 w-3" /> {s.browser}
                    </span>
                  </div>
                </div>
              ))}
              {!filteredSubmissions.length && (
                <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/40">
                  {submissions.length ? "Is range me koi submission nahi." : "Abhi koi form submission nahi aayi."}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ======== TRASH ======== */}
        {view === "trash" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-3xl font-bold">
                <Icon name="trash" className="h-7 w-7" /> Trash ({trash.length})
              </h1>
              {trash.length > 0 && (
                <button
                  onClick={emptyTrash}
                  className="flex items-center gap-2 rounded-full border border-red-400/40 px-5 py-2.5 text-xs uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500 hover:text-white"
                >
                  <Icon name="alert" className="h-3.5 w-3.5" /> Empty trash
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-white/50">
              Deleted projects yahan aate hain — live site se hat jate hain lekin restore ho sakte hain. Permanently delete karne par hamesha ke liye khatam.
            </p>
            <div className="mt-6 space-y-3">
              {trash.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-red-500/15 bg-red-500/[0.04] p-4">
                  <img src={p.image} alt="" className="h-14 w-20 shrink-0 rounded-lg border border-white/10 bg-white object-cover object-top opacity-60" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white/80">{p.name}</p>
                    <p className="truncate text-xs text-white/40">
                      {p.platform} · {p.category} · deleted {p.deletedAt ? timeAgo(p.deletedAt) : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => restoreProject(p)}
                    className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 px-4 py-2 text-xs uppercase tracking-widest text-emerald-300 transition-colors hover:bg-emerald-500 hover:text-white"
                  >
                    <Icon name="restore" className="h-3 w-3" /> Restore
                  </button>
                  <button
                    onClick={() => deleteForever(p)}
                    className="flex items-center gap-1.5 rounded-full border border-red-400/40 px-4 py-2 text-xs uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500 hover:text-white"
                  >
                    <Icon name="trash" className="h-3 w-3" /> Delete forever
                  </button>
                </div>
              ))}
              {!trash.length && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
                  <Icon name="trash" className="mx-auto h-8 w-8 text-white/20" />
                  <p className="mt-3 text-white/40">Trash khali hai. Jo project delete karein ge wo yahan aaye ga.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
