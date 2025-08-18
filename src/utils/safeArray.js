export function safeArray(v) {
    if (Array.isArray(v)) return v;
    if (v && typeof v === "object") {
      // handles { p1: "...", p2: "..." }
      return Object.keys(v).sort().map((k) => v[k]);
    }
    if (typeof v === "string" && v.trim()) return [v];
    return [];
  }
  