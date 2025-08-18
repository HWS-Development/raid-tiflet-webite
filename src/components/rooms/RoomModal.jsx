import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1562259949-e8e7689d7821?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"
];

function getImages(room) {
  if (room?.images && Array.isArray(room.images) && room.images.length) return room.images;
  return FALLBACK_IMAGES;
}

export default function RoomModal({ room, onClose }) {
  const { t } = useTranslation();
  const images = useMemo(() => getImages(room), [room]);

  const [idx, setIdx] = useState(0);
  const startX = useRef(null);
  const closeBtnRef = useRef(null);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  // Lock body scroll while open
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, []);

  // Keyboard & focus
  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, images.length]);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [images.length]);

  // Preload
  useEffect(() => {
    images.forEach((src) => { const img = new Image(); img.src = src; });
  }, [images]);

  // Touch swipe
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const threshold = 40;
    if (dx > threshold) prev();
    if (dx < -threshold) next();
    startX.current = null;
  };

  const floorLabel =
    room?.floor === "rdc" ? t("rooms.ground_floor")
      : room?.floor === "etage" ? t("rooms.first_floor")
      : null;

  const infoRow = (label, value) =>
    value ? (
      <div className="flex items-start gap-2 text-sm text-gray-800">
        <span className="min-w-[96px] text-gray-600">{label}:</span>
        <span className="font-medium">{value}</span>
      </div>
    ) : null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={`${room?.name || ""} details`}>
      {/* Backdrop */}
      <button className="absolute inset-0 bg-black/60" onClick={onClose} aria-label={t("ui.close")} />

      {/* Shell: full-screen on mobile, card on desktop */}
      <div className="relative z-10 mx-auto w-full md:w-[min(1000px,92vw)] h-[100dvh] md:h-auto md:max-h-[86vh] md:my-8 bg-white md:rounded-2xl shadow-soft border border-black/10 flex flex-col overflow-hidden">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-black/10">
          <div className="flex items-center justify-between px-4 md:px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: room?.color || "#C94F44" }} />
              <div>
                <h3 className="text-base md:text-lg font-semibold text-brand-charcoal leading-none">{room?.name}</h3>
                {room?.type && <p className="text-xs text-gray-600 mt-1">{room.type}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {typeof room?.capacity === "number" && (
                <span className="hidden sm:inline-flex text-xs px-2 py-1 rounded-full bg-brand-ivory text-brand-charcoal border border-black/10">
                  {t("rooms.capacity")}: {room.capacity} {t("rooms.guests")}
                </span>
              )}
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-ivory text-brand-charcoal hover:bg-brand-terracotta hover:text-white transition"
                aria-label={t("ui.close")}
                title={t("ui.close")}
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid md:grid-cols-2">
            {/* Media */}
            <div className="relative bg-black/5">
              <div
                className="relative h-[40vh] min-h-[240px] md:h-[420px] select-none"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${room?.name} ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
                    draggable="false"
                  />
                ))}

                {/* Arrows (bigger on mobile) */}
                <button
                  onClick={prev}
                  aria-label={t("ui.prev")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-charcoal rounded-full w-10 h-10 grid place-items-center shadow"
                >‹</button>
                <button
                  onClick={next}
                  aria-label={t("ui.next")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-charcoal rounded-full w-10 h-10 grid place-items-center shadow"
                >›</button>

                {/* Dots */}
                <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`w-2.5 h-2.5 rounded-full border border-white/70 ${i === idx ? "bg-white" : "bg-white/30"}`}
                      aria-label={`slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="px-4 py-3 border-t border-black/10 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-3">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setIdx(i)}
                      className={`relative shrink-0 w-20 h-16 rounded-md overflow-hidden border transition
                        ${i === idx ? "border-brand-terracotta ring-2 ring-brand-terracotta/40" : "border-black/10 hover:border-brand-terracotta/60"}`}
                      aria-label={`thumbnail ${i + 1}`}
                    >
                      <img src={src} alt={`thumb ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 md:p-6 space-y-5">
              {room?.description && (
                <p className="text-sm text-gray-800 leading-6">{room.description}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                {infoRow(t("rooms.capacity"), typeof room?.capacity === "number" ? `${room.capacity} ${t("rooms.guests")}` : null)}
                {infoRow(t("rooms.size"), room?.size)}
                {infoRow(t("rooms.floor"), floorLabel)}
                {infoRow(t("rooms.beds"), room?.beds)}
                {infoRow(t("rooms.bath"), room?.bath)}
                {infoRow(t("rooms.windows"), room?.windows)}
                {room?.ac ? infoRow(t("rooms.ac"), t("rooms.ac")) : null}
              </div>

              {Array.isArray(room?.amenities) && room.amenities.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-brand-charcoal mb-2">{t("rooms.amenities")}:</div>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((a, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-brand-ivory text-brand-charcoal border border-black/10">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Desktop actions (inside details) */}
              <div className="hidden md:flex flex-wrap gap-3 pt-2">
                <a
                  href="https://riad-dar-tiflet-1.hotelrunner.com/bv3/search"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex px-4 py-2 rounded-xl bg-brand-terracotta text-white hover:bg-brand-terracottaDark transition"
                >
                  {t("rooms.book_now")}
                </a>
                <button
                  onClick={onClose}
                  className="inline-flex px-4 py-2 rounded-xl border border-black/10 text-brand-charcoal hover:bg-brand-ivory transition"
                >
                  {t("ui.close")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sticky CTA */}
        <div className="md:hidden sticky bottom-0 z-10 bg-white border-t border-black/10 px-4 py-3 flex gap-3">
          <a
            href="https://riad-dar-tiflet-1.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-brand-terracotta text-white hover:bg-brand-terracottaDark transition"
          >
            {t("rooms.book_now")}
          </a>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-black/10 text-brand-charcoal hover:bg-brand-ivory transition"
          >
            {t("ui.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
