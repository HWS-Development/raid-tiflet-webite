// src/components/ui/Carousel.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function useInView(ref) {
  const [v, setV] = useState(true);
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return v;
}

function usePerView(breaks = { base: 1, md: 2, lg: 3 }) {
  const get = () => {
    const w = window.innerWidth;
    if (w >= 1024) return breaks.lg ?? breaks.md ?? breaks.base ?? 1;
    if (w >= 768) return breaks.md ?? breaks.base ?? 1;
    return breaks.base ?? 1;
  };
  const [pv, setPv] = useState(typeof window !== "undefined" ? get() : (breaks.base ?? 1));
  useEffect(() => {
    const on = () => setPv(get());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return pv;
}

/**
 * Carousel
 * props:
 * - items: any[]
 * - renderItem: (item) => ReactNode
 * - perView: { base, md?, lg? }
 * - gap: Tailwind gap class (default "gap-6")
 * - autoplayMs: number | 0
 * - ariaLabel: string
 * - className: wrapper class (e.g. "max-w-5xl mx-auto")
 */
export default function Carousel({
  items = [],
  renderItem,
  perView: perViewBreaks = { base: 1, md: 2, lg: 3 },
  gap = "gap-6",
  autoplayMs = 4500,
  ariaLabel = "Carousel",
  className = "",
}) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef);
  const perView = usePerView(perViewBreaks);

  const pages = useMemo(() => {
    if (!items.length) return [];
    const out = [];
    for (let i = 0; i < items.length; i += perView) out.push(items.slice(i, i + perView));
    return out;
  }, [items, perView]);

  const ext = useMemo(() => (pages.length ? [pages[pages.length - 1], ...pages, pages[0]] : []), [pages]);

  const [idx, setIdx] = useState(1); // 1..pages
  const [anim, setAnim] = useState(true);
  const total = pages.length;

  const onTransitionEnd = useCallback(() => {
    if (!total) return;
    if (idx === 0) {
      setAnim(false); setIdx(total);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    } else if (idx === total + 1) {
      setAnim(false); setIdx(1);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }
  }, [idx, total]);

  const hoverRef = useRef(false);
  useEffect(() => {
    if (!autoplayMs || !total) return;
    const id = setInterval(() => { if (!hoverRef.current && inView) setIdx((i) => i + 1); }, autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs, total, inView]);

  // keyboard when focused
  useEffect(() => {
    const onKey = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") setIdx((i) => i + 1);
      if (e.key === "ArrowLeft") setIdx((i) => i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // drag/swipe
  const startX = useRef(0), dragging = useRef(false);
  const onStart = (x) => { startX.current = x; dragging.current = true; };
  const onMove = (x) => {
    if (!dragging.current) return;
    const dx = x - startX.current;
    if (Math.abs(dx) > 50) { dragging.current = false; setIdx((i) => i + (dx < 0 ? 1 : -1)); }
  };
  const onEnd = () => (dragging.current = false);

  const dot = total ? ((idx - 1 + total) % total) : 0;

  return (
    <section
      ref={rootRef}
      className={`relative ${className}`}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* Track */}
      <div
        className="overflow-hidden rounded-2xl border border-black/5 bg-white"
        onPointerDown={(e) => onStart(e.clientX)}
        onPointerMove={(e) => onMove(e.clientX)}
        onPointerUp={onEnd}
        onPointerCancel={onEnd}
        onTouchStart={(e) => onStart(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onTouchEnd={onEnd}
      >
        <div
          className={`flex ${gap} ${anim ? "transition-transform duration-500" : ""}`}
          style={{ transform: `translateX(-${idx * 100}%)`, width: `${ext.length * 100}%` }}
          onTransitionEnd={onTransitionEnd}
        >
          {ext.map((page, i) => (
            <div key={i} className="shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {page.map((item, j) => <div key={j} className="p-3">{renderItem(item)}</div>)}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay arrows (inside content, subtle) */}
      {total > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={() => setIdx((i) => i - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex w-9 h-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/10 hover:bg-brand-ivory"
          >‹</button>
          <button
            aria-label="Next"
            onClick={() => setIdx((i) => i + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex w-9 h-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/10 hover:bg-brand-ivory"
          >›</button>
        </>
      )}

      {/* Small, neat dots */}
      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIdx(i + 1)}
              className={`h-1.5 rounded-full transition-all ${dot === i ? "w-6 bg-brand-terracotta" : "w-2 bg-black/20 hover:bg-black/40"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
