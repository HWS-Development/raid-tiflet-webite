import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/* tiny dot control */
function Dot({ active, onClick }) {
  return (
    <button
      aria-label="slide"
      onClick={onClick}
      className={`mx-1 h-2.5 rounded-full transition-all ${
        active ? "w-6 bg-accent-terracotta" : "w-2.5 bg-ink/20"
      }`}
    />
  );
}

/* subtle background washes behind the review card */
function Washes() {
  return (
    <>
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fcd/20 blur-2xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-16 h-44 w-44 rounded-full bg-olive/20 blur-2xl" />
    </>
  );
}

export default function Reviews() {
  const { t } = useTranslation();
  const items = useMemo(() => t("reviews.items", { returnObjects: true }) || [], [t]);
  const [i, setI] = useState(0);
  const timer = useRef(null);

  // autoplay (pause on hover)
  const start = () => {
    clearInterval(timer.current);
    if (items.length > 1) {
      timer.current = setInterval(() => setI((p) => (p + 1) % items.length), 4500);
    }
  };
  const stop = () => clearInterval(timer.current);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  if (!items.length) return null;

  const prev = () => setI((p) => (p - 1 + items.length) % items.length);
  const next = () => setI((p) => (p + 1) % items.length);
  const item = items[i];

  // External review links (client requested)
  const REVIEW_LINKS = [
    {
      label: "Tripadvisor",
      href:
        "https://www.tripadvisor.com/Hotel_Review-g293734-d2092370-Reviews-Riad_Dar_Tiflet-Marrakech_Marrakech_Safi.html",
    },
    {
      label: "Google",
      href:
        "https://www.google.com/travel/search?q=riad%20dar%20tiflet%20reviews%20google&g2lb=4965990%2C4969803%2C72302247%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72601598%2C72616120%2C72647020%2C72686036%2C72760082%2C72803964%2C72832976%2C72882230%2C72958624%2C72959983%2C72990342%2C73059275%2C73064764%2C73076417&hl=en-MA&gl=ma&cs=1&ssta=1&ts=CAEaRgooEiYyJDB4ZGFmZWU4ZDk2M2QxZTg3OjB4YTk2MjUxMWUyM2ExMDg1ZBIaEhQKBwjpDxALGAkSBwjpDxALGAsYAjICEAA&qs=CAEyFENnc0kzWkNFbmVLamxMR3BBUkFCOAJCCQldCKEjHlFiqUIJCV0IoSMeUWKp&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwjAmIrS-7mPAxUAAAAAHQAAAAAQBA",
    },
    {
      label: "Booking.com",
      href: "https://www.booking.com/reviews/ma/hotel/riad-dar-tiflet.en-gb.html",
    },
  ];

  return (
    <section className="my-0">
      <header className="mb-6">
        <h2 className="display-title">{t("reviews.title")}</h2>
      </header>

      <div
        onMouseEnter={stop}
        onMouseLeave={start}
        className="relative container-grid overflow-visible"
      >
        {/* arrows */}
        <button
          aria-label="previous"
          onClick={prev}
          className="hidden sm:grid place-items-center absolute -left-6 top-1/2 -translate-y-1/2
                    w-9 h-9 rounded-full border border-black/10 bg-ec
                    hover:bg-ink hover:text-ec transition"
        >
          ‹
        </button>
        <button
          aria-label="next"
          onClick={next}
          className="hidden sm:grid place-items-center absolute -right-6 top-1/2 -translate-y-1/2
                    w-9 h-9 rounded-full border border-black/10 bg-ec
                    hover:bg-ink hover:text-ec transition"
        >
          ›
        </button>

        {/* card (no harsh white; artistic washes) */}
        <article className="relative mx-auto max-w-3xl rounded-3xl ring-1 ring-ink/10 bg-ec/95 shadow-soft p-6 sm:p-8 backdrop-blur">
          <Washes />
          <div className="text-5xl leading-none text-accent-terracotta/80 mb-3">“</div>
          <p className="text-ink leading-7">{item.text}</p>

          <div className="mt-5 flex items-center justify-between text-sm text-ink/70">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-ec ring-1 ring-ink/10">
                <span className="text-[11px] font-semibold text-ink">
                  {item.name?.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
              </div>
              <div>
                <div className="font-medium text-ink">{item.name}</div>
                <div className="text-xs text-ink/60">
                  {item.country} • {item.date}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* dots */}
        <div className="mt-4 flex items-center justify-center">
          {items.map((_, idx) => (
            <Dot key={idx} active={idx === i} onClick={() => setI(idx)} />
          ))}
        </div>

        {/* external review links — chips under carousel */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {REVIEW_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs
                         bg-ec ring-1 ring-ink/10 text-ink hover:bg-chb transition"
            >
              {/* simple star icon */}
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-accent-terracotta" fill="currentColor" aria-hidden>
                <path d="M12 2l2.9 6.3 6.8.6-5.1 4.3 1.6 6.7L12 16.8 5.8 20l1.6-6.7L2.3 9l6.8-.6L12 2z" />
              </svg>
              <span className="font-medium">{t("reviews.see_all_on", "See all on")} {l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
