import { useEffect, useRef } from "react";

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  const startX = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[70]">
      <button className="absolute inset-0 bg-black/70" onClick={onClose} aria-label="Close" />
      <div
        className="relative z-10 w-full h-full flex items-center justify-center p-4"
        onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - (startX.current ?? 0);
          if (dx > 40) onPrev?.();
          if (dx < -40) onNext?.();
          startX.current = null;
        }}
      >
        <img
          src={item?.src}
          alt={item?.alt || ""}
          className="max-h-[88vh] max-w-[92vw] object-contain rounded-xl shadow-lg"
        />

        {/* Controls */}
        <button
          onClick={onPrev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-brand-charcoal hover:bg-white shadow"
        >‹</button>
        <button
          onClick={onNext}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-brand-charcoal hover:bg-white shadow"
        >›</button>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 w-11 h-11 rounded-full bg-white/90 text-brand-charcoal hover:bg-white shadow"
        >✕</button>
      </div>
    </div>
  );
}
