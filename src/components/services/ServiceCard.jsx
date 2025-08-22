import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Floating WhatsApp button with a one-time “Join us on WhatsApp” bubble.
 * - Shows the bubble 5s after first visit (per session). Dismiss to hide.
 * - Accessible (aria-live + close button, keyboard focusable).
 * - The bubble sits outside the icon with a little tail.
 */
export default function WhatsAppFab({
  phone = "+212663431444",        // E.164, can include +; we'll normalize
  preset = "Hello 👋 I have a question about Dar Tiflet.",
  delayMs = 5000,
}) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show only once per session
    const key = "wa_hint_dismissed";
    if (sessionStorage.getItem(key) === "1") return;
    const tId = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(tId);
  }, [delayMs]);

  const dismiss = () => {
    sessionStorage.setItem("wa_hint_dismissed", "1");
    setOpen(false);
  };

  // Normalize phone for wa.me link
  const phoneIntl = String(phone).replace(/[^\d]/g, "");
  const href = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(preset)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Bubble */}
      {open && (
        <div
          role="dialog"
          aria-label={t("contact.whatsapp_hint_label", "WhatsApp invitation")}
          className="relative max-w-[260px] rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-3
                     text-[13px] text-ink/80 mr-1 translate-y-0 opacity-100 transition"
        >
          {/* Tail */}
          <span
            aria-hidden
            className="absolute -right-2 bottom-3 h-4 w-4 rotate-45 bg-white shadow
                       ring-1 ring-black/5"
          />
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
              {/* WhatsApp glyph */}
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 text-white"
                fill="currentColor"
              >
                <path d="M20.52 3.48A11.76 11.76 0 0 0 12 .75C6.13.75 1.35 5.53 1.35 11.4c0 2 .53 3.95 1.54 5.67L1 22.65l5.76-1.85a11.27 11.27 0 0 0 5.24 1.33h.01c5.87 0 10.65-4.78 10.65-10.65 0-2.85-1.11-5.53-3.14-7.6ZM12 20.4h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.42 1.1 1.12-3.33-.24-.34A9.9 9.9 0 0 1 2.1 11.4C2.1 6.95 5.95 3.1 10.4 3.1c2.64 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c0 4.45-3.85 8.3-8.3 8.3Zm5.07-6.02c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.62.13-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.13-1.12-.41-2.13-1.31-.79-.7-1.32-1.56-1.47-1.83-.16-.27-.02-.42.11-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.62-1.5-.85-2.06-.22-.54-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.99 2.66 1.12 2.85c.14.18 1.95 2.97 4.74 4.05.66.28 1.17.45 1.57.57.66.21 1.27.18 1.75.11.53-.08 1.6-.65 1.83-1.29.23-.64.23-1.18.16-1.29-.07-.11-.25-.18-.52-.31Z" />
              </svg>
            </span>

            <div className="flex-1 pr-6">
              <p className="font-medium text-ink">
                {t("contact.whatsapp_hint_title", "Join us on WhatsApp")}
              </p>
              <p className="mt-0.5">
                {t(
                  "contact.whatsapp_hint_body",
                  "Quick questions or arrival help? Tap the green bubble."
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={dismiss}
              aria-label={t("common.close", "Close")}
              className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center
                         rounded-full hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-ink/70" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 8.94 14.47 4.5l1.06 1.06L11.06 10l4.47 4.44-1.06 1.06L10 11.06 5.56 15.5 4.5 14.44 8.94 10 4.5 5.56 5.56 4.5 10 8.94Z"
                />
              </svg>
            </button>
          </div>

          {/* optional: auto-hide after 10s */}
          {/* <div className="sr-only" aria-live="polite">{open ? "WhatsApp hint shown" : ""}</div> */}
        </div>
      )}

      {/* Floating button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("contact.whatsapp_cta", "Chat on WhatsApp")}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500
                   shadow-xl ring-1 ring-black/10 transition hover:scale-105 hover:bg-emerald-600
                   focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="currentColor">
          <path d="M20.52 3.48A11.76 11.76 0 0 0 12 .75C6.13.75 1.35 5.53 1.35 11.4c0 2 .53 3.95 1.54 5.67L1 22.65l5.76-1.85a11.27 11.27 0 0 0 5.24 1.33h.01c5.87 0 10.65-4.78 10.65-10.65 0-2.85-1.11-5.53-3.14-7.6Z" />
        </svg>
      </a>
    </div>
  );
}
