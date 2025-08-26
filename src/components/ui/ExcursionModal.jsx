import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ExcursionModal({
  open,
  onClose,
  title,
  description,
  duration,
  options = [],
  transportIncluded,
  id = "excursion-modal",
}) {
  const { t } = useTranslation();
  const closeRef = useRef(null);

  // ESC to close + page scroll lock
  useEffect(() => {
    const onKey = (e) => open && e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      id={id}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* soft, blurred overlay */}
      <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-md" />

      {/* floating bokeh accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-8 top-10 h-40 w-40 rounded-full bg-[#C2634B]/30 blur-3xl" />
        <div className="absolute right-10 bottom-8 h-44 w-44 rounded-full bg-emerald-600/25 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl rounded-3xl bg-white/80 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <h3 id={`${id}-title`} className="text-xl font-semibold text-stone-900">
            {title}
          </h3>
          <button
            ref={closeRef}
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-stone-900/5 text-stone-700 hover:bg-stone-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            aria-label={t("common.close") ?? "Close"}
          >
            <span>X</span>
          </button>
        </div>

        <div className="mt-4 space-y-5 text-stone-700">
          <p className="leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2">
            {transportIncluded && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-700/15">
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                  <path fill="currentColor" d="M4 16v2h2v-2zm0-2h16v-2l-2-5H6l-2 5zm2-7h12l1.5 4H4.5zM15 16v2h2v-2z"/>
                </svg>
                {t("services.transport_included")}
              </span>
            )}
            {duration && (
              <span className="inline-flex items-center gap-1 rounded-full bg-stone-800/5 px-3 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-800/10">
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                  <path fill="currentColor" d="M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8m9 4a9 9 0 1 1-18 0a9 9 0 0 1 18 0"/>
                </svg>
                {t("services.duration_label")}: {duration}
              </span>
            )}
          </div>

          {options.length > 0 && (
            <div className="pt-1">
              <h4 className="text-sm font-semibold text-stone-800">{t("services.show_details")}</h4>
              <ul className="mt-2 grid grid-cols-1 gap-2 text-sm text-stone-700 sm:grid-cols-2">
                {options.map((o, i) => (
                  <li key={i} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C2634B]" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* No prices per client request */}
        </div>
      </div>
    </div>
  );
}
