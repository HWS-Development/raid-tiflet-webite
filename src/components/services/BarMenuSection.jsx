import { useTranslation } from "react-i18next";

export default function BarMenuSection() {
  const { t } = useTranslation();

  // Always use the same PDF
  const href = "/pdf/bar-menu-fr.pdf";

  return (
    <section className="relative bg-ec">
      <div className="container-grid pb-10">
        <div
          className="
            relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md
            ring-1 ring-black/10 shadow-soft px-6 py-7 md:px-8 md:py-8
          "
        >
          {/* soft corner glow */}
          <div className="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full bg-fcd/25 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-olive/20 blur-2xl" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-ink">
                {t("bar_menu.title", "See our bar menu")}
              </h3>
              <p className="mt-1 text-ink/70">
                {t(
                  "bar_menu.desc",
                  "Open the drink menu as a PDF. Same file for all languages."
                )}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center gap-2 rounded-xl bg-[#C2634B]
                  px-4 py-2 text-white text-sm font-medium
                  shadow hover:brightness-95 focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-[#C2634B]/40
                "
              >
                {/* pdf icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 11V3l6 6h-4a2 2 0 0 1-2-2" />
                  <rect x="6" y="11" width="12" height="10" rx="2" />
                </svg>

                {t("bar_menu.open_btn", "Open menu (PDF)")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
