import { useEffect, useMemo, useRef, useState } from "react";

function resolvePerView(breaks) {
  if (typeof window === "undefined") return breaks.base ?? 1;
  const w = window.innerWidth;
  if (w >= 1024) return breaks.lg ?? breaks.md ?? breaks.base ?? 1;
  if (w >= 768)  return breaks.md ?? breaks.base ?? 1;
  return breaks.base ?? 1;
}

/**
 * SnapSlider (simple, robust)
 * props:
 *  - items: any[]
 *  - renderItem: (item, i) => ReactNode
 *  - perView: { base:1, md?:2, lg?:3 }
 *  - className?: string
 */
export default function SnapSlider({
  items = [],
  renderItem,
  perView = { base: 1, md: 2, lg: 3 },
  className = "",
}) {
  const wrapRef = useRef(null);
  const [pv, setPv] = useState(resolvePerView(perView));
  const pages = useMemo(() => Math.max(1, Math.ceil(items.length / pv)), [items.length, pv]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const on = () => setPv(resolvePerView(perView));
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [perView]);

  // track the current page by scroll position
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setPage(Math.min(pages - 1, Math.max(0, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [pages]);

  const goto = (idx) => {
    const el = wrapRef.current;
    if (!el) return;
    const clamped = Math.min(pages - 1, Math.max(0, idx));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  const itemStyle = { flex: `0 0 ${100 / pv}%` };

  return (
    <section className={`relative ${className}`}>
      <div
        ref={wrapRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-2xl"
        style={{ scrollbarWidth: "none" }} // Firefox hide
      >
        <div className="flex gap-4 p-3">
          {items.map((it, i) => (
            <div
              key={i}
              style={itemStyle}
              className="snap-start shrink-0"
            >
              {renderItem(it, i)}
            </div>
          ))}
        </div>
      </div>

      {/* arrows */}
      {pages > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={() => goto(page - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex w-9 h-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/10 hover:bg-brand-ivory"
          >‹</button>
          <button
            aria-label="Next"
            onClick={() => goto(page + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex w-9 h-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/10 hover:bg-brand-ivory"
          >›</button>
        </>
      )}

      {/* dots */}
      {pages > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === page ? "w-6 bg-brand-terracotta" : "w-2 bg-black/20 hover:bg-black/40"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
