export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7005/api";

export async function fetchJSON(url, opts = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}
