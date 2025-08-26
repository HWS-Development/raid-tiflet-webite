// components/home/ServicesTeaser.jsx
import { useTranslation } from "react-i18next";

/** Tiny inline icon set keyed by service id */
function Ico({ id }) {
  const common = "w-5 h-5";
  switch (id) {
    case "shuttle":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M3 7h12l5 4v6h-2m-15-10v10m0 0h2m-2 0a2 2 0 1 0 4 0m9 0a2 2 0 1 0 4 0M7 11h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "breakfast":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M6 15h12a4 4 0 0 0 0-8H6v8Zm0 0v2a2 2 0 0 0 2 2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "tips":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M12 3v3m0 12v3m7.07-13.07-2.12 2.12M7.05 16.95l-2.12 2.12m14.14 0-2.12-2.12M7.05 7.05 4.93 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );
    case "luggage":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-8 0h8m-8 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M12 17l-5 3 1.9-5.9L4 9h6l2-6 2 6h6l-4.9 5.1L17 20l-5-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
  }
}

function Wave({ position = "top" }) {
  const base = "absolute left-0 w-full h-14 md:h-16 lg:h-20 text-brand-ivory";
  const pos =
    position === "top" ? "top-0 -translate-y-full" : "bottom-0 translate-y-full";
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className={`${base} ${pos}`}>
      <path d="M0,64 C180,24 360,24 540,48 C720,72 900,72 1080,48 C1260,24 1440,24 1440,24 L1440,80 L0,80 Z" fill="currentColor" />
    </svg>
  );
}

export default function ServicesTeaser() {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) || [];

  return (
    <section className="relative bg-transparent">
      <div className="relative overflow-hidden" >
        <Wave position="top" />
        <Wave position="bottom" />

        <div className="container-grid relative z-10 ">
          <h2 className="display-title text-white text-3xl md:text-4xl">
            {t("services.title")}
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((s) => (
              <div
                key={s.id}
                className="group relative overflow-hidden rounded-2xl border border-white/15
                           bg-white/[0.06] px-6 py-6 md:py-7 min-h-[118px] md:min-h-[132px]
                           text-white/90 shadow-sm backdrop-blur
                           transition hover:bg-white/[0.10] hover:shadow-md"
              >
                {/* sweep line */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-[2px] w-0
                             bg-white/70 transition-[width] duration-500 ease-out
                             group-hover:w-full"
                />

                <div className="flex items-start gap-4">
                  {/* icon bubble */}
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center
                                   rounded-full border border-white/20 bg-white/10
                                   text-white/90 shadow-inner">
                    <Ico id={s.id} />
                  </span>

                  {/* text */}
                  <div className="leading-snug">
                    <div className="font-semibold">{s.name}</div>
                    {s.tag ? (
                      <div className="mt-1 text-xs text-white/70">{s.tag}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
