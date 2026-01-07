// src/components/ui/WhatsAppFab.jsx
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";

export default function WhatsAppFab({
  phone = "+33756848934",
  preset = "Hello 👋 I have a question about Dar Tiflet.",
  delayMs = 5000,
  oncePerSession = true,
  showBadge = true,
  zIndex = 9999,
  panel = {
    title: `${t("whatsappPromo.title")} !`, // ✅ exclamation added
    lines: [
      t("whatsappPromo.line1"),
      t("whatsappPromo.line2"),
      t("whatsappPromo.line3"),
      t("whatsappPromo.line4"),
    ],
    ctaLabel: "hello@dartiflet.com",
    ctaHref: "mailto:hello@dartiflet.com",
  },
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const STORAGE_KEY = "dar_tiflet__wa_panel_dismissed";

  const phoneIntl = String(phone).replace(/[^\d]/g, "");
  const waHref = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(preset)}`;

  useEffect(() => {
    if (oncePerSession && sessionStorage.getItem(STORAGE_KEY) === "1") return;
    timer.current = setTimeout(() => setOpen(true), Math.max(0, delayMs));
    return () => clearTimeout(timer.current);
  }, [delayMs, oncePerSession]);

  const dismiss = () => {
    if (oncePerSession) sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <div
      className="fixed bottom-6 right-4 md:right-6 flex items-end gap-3"
      style={{ zIndex }}
      aria-live="polite"
    >
      {/* Promo Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp quick info"
          className="
            relative
            w-[240px] sm:w-[280px] md:w-[320px]
            rounded-xl bg-white
            shadow-xl ring-1 ring-black/10
            px-3 py-3 sm:px-4 sm:py-4
            translate-y-2 opacity-0
            animate-[fadeInUp_.35s_ease-out_forwards]
          "
        >
          {/* Close */}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="
              absolute right-1.5 top-1.5
              inline-flex h-7 w-7 items-center justify-center
              rounded-full text-ink/60
              hover:bg-black/5
              focus:outline-none focus:ring-2 focus:ring-rose-400
            "
          >
            ✕
          </button>

          {/* Tail */}
          <span
            aria-hidden
            className="absolute -right-2 bottom-4 h-4 w-4 rotate-45 bg-white shadow ring-1 ring-black/10"
          />

          {/* Content */}
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-ink">
            {panel.title}
          </h3>
        </div>
      )}

      {/* WhatsApp Bubble */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          relative inline-flex h-14 w-14
          items-center justify-center
          rounded-full bg-emerald-500
          shadow-xl ring-1 ring-black/10
          transition hover:scale-105 hover:bg-emerald-600
          focus:outline-none focus:ring-4 focus:ring-emerald-300
        "
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="currentColor">
          <path d="M20.52 3.48A11.76 11.76 0 0 0 12 .75C6.13.75 1.35 5.53 1.35 11.4c0 2 .53 3.95 1.54 5.67L1 22.65l5.76-1.85a11.27 11.27 0 0 0 5.24 1.33h.01c5.87 0 10.65-4.78 10.65-10.65 0-2.85-1.11-5.53-3.14-7.6Zm-8.53 16.9h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.42 1.1 1.12-3.33-.24-.34A9.9 9.9 0 0 1 2.1 11.4C2.1 6.95 5.95 3.1 10.4 3.1c2.64 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c0 4.45-3.85 8.3-8.3 8.3Zm5.07-6.02c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.62.13-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.13-1.12-.41-2.13-1.31-.79-.7-1.32-1.56-1.47-1.83-.16-.27-.02-.42.11-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.62-1.5-.85-2.06-.22-.54-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.99 2.66 1.12 2.85c.14.18 1.95 2.97 4.74 4.05.66.28 1.17.45 1.57.57.66.21 1.27.18 1.75.11.53-.08 1.6-.65 1.83-1.29.23-.64.23-1.18.16-1.29-.07-.11-.25-.18-.52-.31Z" />
        </svg>

        {showBadge && open && (
          <span className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 shadow" />
        )}
      </a>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
