import { useTranslation } from "react-i18next";

/** Tiny inline icon set keyed by service id */
function Ico({ id, className = "" }) {
  const common = "w-28 h-5 text-fcd";
  switch (id) {
    case "shuttle":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className={`${common} ${className}`}>
          <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"/>
        </svg>
      );
    case "breakfast":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className={`${common} ${className}`}>
          <path d="M127.9 78.4C127.1 70.2 120.2 64 112 64C103.8 64 96.9 70.2 96 78.3L81.9 213.7C80.6 219.7 80 225.8 80 231.9C80 277.8 115.1 315.5 160 319.6L160 544C160 561.7 174.3 576 192 576C209.7 576 224 561.7 224 544L224 319.6C268.9 315.5 304 277.8 304 231.9C304 225.8 303.4 219.7 302.1 213.7L287.9 78.3C287.1 70.2 280.2 64 272 64C263.8 64 256.9 70.2 256.1 78.4L242.5 213.9C241.9 219.6 237.1 224 231.4 224C225.6 224 220.8 219.6 220.2 213.8L207.9 78.6C207.2 70.3 200.3 64 192 64C183.7 64 176.8 70.3 176.1 78.6L163.8 213.8C163.3 219.6 158.4 224 152.6 224C146.8 224 142 219.6 141.5 213.9L127.9 78.4zM512 64C496 64 384 96 384 240L384 352C384 387.3 412.7 416 448 416L480 416L480 544C480 561.7 494.3 576 512 576C529.7 576 544 561.7 544 544L544 96C544 78.3 529.7 64 512 64z"/>
        </svg>
      );
    case "tips":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${common} ${className}`}>
          <path d="M12 3v3m0 12v3m7.07-13.07-2.12 2.12M7.05 16.95l-2.12 2.12m14.14 0-2.12-2.12M7.05 7.05 4.93 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );
    case "luggage":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${common} ${className}`}>
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-8 0h8m-8 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${common} ${className}`}>
          <path d="M12 17l-5 3 1.9-5.9L4 9h6l2-6 2 6h6l-4.9 5.1L17 20l-5-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
  }
}

function Wave({ position = "top", colorClass = "text-ec" }) {
  const base = `absolute left-0 w-full h-14 md:h-16 lg:h-20 ${colorClass}`;
  const pos = position === "top" ? "top-0 -translate-y-full" : "bottom-0 translate-y-full";
  return (
    <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className={`${base} ${pos}`}>
      <path d="M0,64 C180,24 360,24 540,48 C720,72 900,72 1080,48 C1260,24 1440,24 1440,24 L1440,80 L0,80 Z" fill="currentColor" />
    </svg>
  );
}

/**
 * variant: "light" | "terracotta" | "dark"
 * - light: section on ec, cards white, ink text, olive accents (recommended)
 * - terracotta: section on fcd, cards ec, ink text, stronger shadows
 * - dark: translucent cards on dark band (your original look), but with higher contrast
 */
export default function ServicesTeaser({ variant = "light" }) {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) || [];

  // Section + card theming
  const theme = {
    light: {
      section: "bg-chb",
      wave: "text-ec",
      title: "text-ink",
      card: "bg-white text-ink border-olive/15 hover:border-olive/30",
      chipWrap: "bg-olive/10 text-olive ring-olive/15",
      tag: "text-ink/70",
      sweep: "bg-fcd/70",
    },
    terracotta: {
      section: "bg-fcd",
      wave: "text-fcd",
      title: "text-white",
      card: "bg-ec text-ink border-olive/20 hover:border-olive",
      chipWrap: "bg-olive/15 text-olive ring-olive/20",
      tag: "text-ink/70",
      sweep: "bg-white/70",
    },
    dark: {
      section: "bg-olive", // or your deep band
      wave: "text-olive",
      title: "text-white",
      card: "bg-white/10 text-white border-white/20 hover:bg-white/15",
      chipWrap: "bg-white/15 text-white ring-white/20",
      tag: "text-white/80",
      sweep: "bg-white/80",
    },
  }[variant];

  return (
    <section className={`relative ${theme.section}`}>
      <div className="relative overflow-hidden">
        <Wave position="top" colorClass={theme.wave} />
        <Wave position="bottom" colorClass={theme.wave} />

        <div className="container-grid relative z-10 py-6 md:py-8">
          <h2 className={`display-title ${theme.title} text-3xl md:text-4xl`}>
            {t("services.title")}
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((s) => (
              <div
                key={s.id}
                className={`
                  group relative overflow-hidden rounded-2xl px-6 py-6 md:py-7 min-h-[118px] md:min-h-[132px]
                  shadow-soft backdrop-blur
                  border transition !bg-ec
                  ${theme.card}
                `}
              >
                {/* sweep line */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-500 ease-out group-hover:w-full ${theme.sweep}`}
                />

                <div className="gap-4 flex items-center h-16">
                  {/* icon bubble */}
                  <span
                    className={`mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-inner ring-1 ${theme.chipWrap}`}
                  >
                    <Ico id={s.id} />
                  </span>

                  {/* text */}
                  <div className="leading-snug">
                    <div className="font-semibold flex items-center h-16">{s.name}</div>
                    {s.tag ? (
                      <div className={`mt-1 text-xs ${theme.tag}`}>{s.tag}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Optional CTA row under the grid */}
          {/* <div className="mt-6">
            <a href="/contact" className="inline-flex rounded-pill bg-fcd px-5 py-2.5 font-medium text-white hover:bg-accent-terracottaDark">
              {t("services.cta")}
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}
