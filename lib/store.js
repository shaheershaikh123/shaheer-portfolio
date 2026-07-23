import { list, put } from "@vercel/blob";
import { projects as seedProjects } from "./data";

const PROJECTS_KEY = "data/projects.json";
const ANALYTICS_KEY = "data/analytics.json";
const SUBMISSIONS_KEY = "data/submissions.json";
const TRASH_KEY = "data/trash.json";

async function readJsonBlob(key) {
  const { blobs } = await list({ prefix: key, limit: 1 });
  if (!blobs.length) return null;
  const res = await fetch(blobs[0].url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function writeJsonBlob(key, data) {
  await put(key, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

export function seededProjects() {
  return seedProjects.map((p, i) => ({ id: `seed-${i}`, ...p }));
}

export async function getProjects() {
  try {
    const data = await readJsonBlob(PROJECTS_KEY);
    if (Array.isArray(data) && data.length) return data;
  } catch (e) {
    // blob not configured yet — fall back to the built-in list
  }
  return seededProjects();
}

export async function saveProjects(projects) {
  await writeJsonBlob(PROJECTS_KEY, projects);
}

export async function getAnalytics() {
  try {
    const data = await readJsonBlob(ANALYTICS_KEY);
    if (data && typeof data === "object") {
      return {
        days: data.days || {},
        countries: data.countries || {},
        devices: data.devices || {},
        browsers: data.browsers || {},
        events: data.events || [],
      };
    }
  } catch (e) {}
  return { days: {}, countries: {}, devices: {}, browsers: {}, events: [] };
}

export async function saveAnalytics(analytics) {
  await writeJsonBlob(ANALYTICS_KEY, analytics);
}

export async function trackView({ path, country, city, region, device, browser, os }) {
  const analytics = await getAnalytics();
  const day = new Date().toISOString().slice(0, 10);
  if (!analytics.days[day]) analytics.days[day] = { total: 0, paths: {} };
  analytics.days[day].total += 1;
  analytics.days[day].paths[path] = (analytics.days[day].paths[path] || 0) + 1;

  const countryKey = city ? `${city}, ${country}` : country;
  analytics.countries[countryKey] = (analytics.countries[countryKey] || 0) + 1;
  analytics.devices[device] = (analytics.devices[device] || 0) + 1;
  analytics.browsers[browser] = (analytics.browsers[browser] || 0) + 1;

  analytics.events.unshift({
    ts: new Date().toISOString(),
    path,
    country,
    city,
    region,
    device,
    browser,
    os,
  });
  analytics.events = analytics.events.slice(0, 300);

  await saveAnalytics(analytics);
}

export async function getTrash() {
  try {
    const data = await readJsonBlob(TRASH_KEY);
    if (Array.isArray(data)) return data;
  } catch (e) {}
  return [];
}

export async function saveTrash(trash) {
  await writeJsonBlob(TRASH_KEY, trash);
}

export async function getSubmissions() {
  try {
    const data = await readJsonBlob(SUBMISSIONS_KEY);
    if (Array.isArray(data)) return data;
  } catch (e) {}
  return [];
}

export async function addSubmission(submission) {
  const submissions = await getSubmissions();
  submissions.unshift(submission);
  await writeJsonBlob(SUBMISSIONS_KEY, submissions.slice(0, 500));
}

