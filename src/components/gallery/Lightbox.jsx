// components/gallery/Lightbox.jsx
import { useEffect } from "react";

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 ">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm hover:bg-white"
        aria-label="Close"
      >
        ✕
      </button>

      <button
        onClick={onPrev}
        aria-label="Previous"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 hover:bg-white"
      >
        ‹
      </button>

      <figure className="max-w-[92vw] max-h-[82vh]">
        <img
          src={item.src}
          alt={item.alt || ""}
          className="w-auto h-auto max-w-full max-h-[82vh] rounded-[24px] shadow-xl"
        />
        {item.alt && (
          <figcaption className="mt-3 text-center text-white/90 text-sm">
            {item.alt}
          </figcaption>
        )}
      </figure>

      <button
        onClick={onNext}
        aria-label="Next"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 hover:bg-white"
      >
        ›
      </button>
    </div>
  );
}
