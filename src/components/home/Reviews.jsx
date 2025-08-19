import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function Dot({ active, onClick }) {
  return (
    <button
      aria-label="slide"
      onClick={onClick}
      className={`mx-1 h-2.5 rounded-full transition-all ${active ? "w-6 bg-brand-terracotta" : "w-2.5 bg-black/20"}`}
    />
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
    timer.current = setInterval(() => setI((p) => (p + 1) % items.length), 4500);
  };
  const stop = () => clearInterval(timer.current);

  useEffect(() => {
    if (items.length > 1) start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  if (!items.length) return null;

  const prev = () => setI((p) => (p - 1 + items.length) % items.length);
  const next = () => setI((p) => (p + 1) % items.length);
  const item = items[i];

  return (
    <section className="my-16">
      <header className="mb-6">
        <h2 className="font-serif tracking-wider text-3xl md:text-4xl text-ink">{t("reviews.title")}</h2>
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
                    w-9 h-9 rounded-full border border-black/10 bg-white
                    hover:bg-black hover:text-white transition"
        >
          ‹
        </button>
        <button
          aria-label="next"
          onClick={next}
          className="hidden sm:grid place-items-center absolute -right-6 top-1/2 -translate-y-1/2
                    w-9 h-9 rounded-full border border-black/10 bg-white
                    hover:bg-black hover:text-white transition"
        >
          ›
        </button>

        {/* card */}
        <article className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white shadow-soft p-6 sm:p-8">
          <div className="text-5xl leading-none text-brand-terracotta/80 mb-3">“</div>
          <p className="text-gray-800 leading-7">{item.text}</p>

          <div className="mt-5 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-ivory border border-black/10">
                <span className="text-[11px] font-semibold text-gray-700">
                  {item.name?.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
              </div>
              <div>
                <div className="font-medium text-ink">{item.name}</div>
                <div className="text-xs text-gray-500">{item.country} • {item.date}</div>
              </div>
            </div>
          </div>
        </article>

        {/* dots BELOW the card */}
        <div className="mt-4 flex items-center justify-center">
          {items.map((_, idx) => (
            <Dot key={idx} active={idx === i} onClick={() => setI(idx)} />
          ))}
        </div>
      </div>
    </section>
  );
}
