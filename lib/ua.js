export function parseUA(ua = "") {
  let device = "Desktop";
  if (/iPad|Tablet/i.test(ua)) device = "Tablet";
  else if (/Mobi|Android|iPhone/i.test(ua)) device = "Mobile";

  let browser = "Other";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua)) browser = "Opera";
  else if (/SamsungBrowser/.test(ua)) browser = "Samsung Browser";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Safari\//.test(ua) && /Version\//.test(ua)) browser = "Safari";
  else if (/Firefox\//.test(ua)) browser = "Firefox";

  let os = "Other";
  if (/Windows/.test(ua)) os = "Windows";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iOS/.test(ua)) os = "iOS";
  else if (/Mac OS/.test(ua)) os = "macOS";
  else if (/Linux/.test(ua)) os = "Linux";

  return { device, browser, os };
}

export function geoFromHeaders(headers) {
  const dec = (v) => {
    try {
      return v ? decodeURIComponent(v) : "";
    } catch {
      return v || "";
    }
  };
  return {
    country: dec(headers.get("x-vercel-ip-country")) || "Unknown",
    city: dec(headers.get("x-vercel-ip-city")) || "",
    region: dec(headers.get("x-vercel-ip-country-region")) || "",
  };
}
