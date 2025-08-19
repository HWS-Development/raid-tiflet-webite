// components/home/ServicesTeaser.jsx
import { useTranslation } from "react-i18next";

function Wave({ position = "top" }) {
  const base = "absolute left-0 w-full h-14 md:h-16 lg:h-20 text-brand-ivory";
  const pos =
    position === "top"
      ? "top-0 -translate-y-full"
      : "bottom-0 translate-y-full";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`${base} ${pos}`}
    >
      <path
        d="M0,64 C180,24 360,24 540,48 C720,72 900,72 1080,48 C1260,24 1440,24 1440,24 L1440,80 L0,80 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ServicesTeaser() {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) || [];

  return (
    /**
     * NOTE:
     * - bg is transparent; no extra top/bottom padding (those were the “empty ivory bars”)
     * - spacing is now inside the band itself (py-12)
     */
    <section className="relative bg-transparent">
      {/* Full-bleed band with toned-down green */}
      <div
        className="relative overflow-hidden"
        style={{
          // softer forest green (adjust to taste)
          backgroundColor: "#0f5b4a",
        }}
      >
        <Wave position="top" />
        <Wave position="bottom" />

        {/* content */}
        <div className="container-grid relative z-10 py-12 md:py-16">
          <h2 className="display-art text-white text-3xl md:text-4xl">
            {t("services.title")}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((s) => (
              <div
                key={s.id}
                className="group relative overflow-hidden rounded-2xl border border-white/15
                           bg-white/[0.06] px-5 py-4 text-white/90 shadow-sm backdrop-blur
                           transition hover:bg-white/[0.10] hover:shadow-md"
              >
                {/* the sweeping line (left -> right on hover) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-[2px] w-0
                             bg-white/70 transition-[width] duration-500 ease-out
                             group-hover:w-full"
                />
                <div className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full bg-white/80" />
                  <span className="font-medium leading-snug">{s.name}</span>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
