import { useState } from "react";
import { useTranslation } from "react-i18next";
import CurveBand from "../ui/CurveBand";
import ExcursionModal from "../ui/ExcursionModal";

/** small badge pill */
function Pill({ children, tone = "olive" }) {
  const tones = {
    olive: "bg-[#E5F0E6] text-[#2E4D36] border-[#2E4D36]/15",
    clay: "bg-[#F7E5DE] text-[#9C3E2F] border-[#9C3E2F]/15",
    ink: "bg-black/5 text-ink border-black/10",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** organic blob SVG (no flat bg) with soft artistic washes */
const SHAPES = [
  "M40,150 C30,90 100,40 200,50 C300,60 350,20 430,50 C510,80 560,110 570,170 C580,230 540,320 470,350 C400,380 320,395 240,380 C160,365 80,350 55,295 C30,240 50,210 40,150 Z",
  "M60,160 C40,90 150,30 260,45 C370,60 420,60 480,110 C540,160 580,240 540,300 C500,360 400,385 310,390 C220,395 150,380 110,335 C70,290 80,230 60,160 Z",
];

function BlobImage({ src, label, shapeIndex = 0 }) {
  const id = `clip-blob-${shapeIndex}-${label.replace(/\s+/g, "-")}`;
  return (
    <figure className="relative isolate">
      {/* CHB + EC soft washes behind the blob (no flat rectangle) */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 blur-2xl opacity-80"
        style={{
          background:
            "radial-gradient(60% 60% at 25% 25%, #D6C4A8 0%, transparent 60%), radial-gradient(55% 55% at 75% 60%, #F5EFE4 0%, transparent 60%)",
          mixBlendMode: "multiply",
        }}
      />
      {/* terracotta conic glow ring */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(194,99,75,0.22), rgba(194,99,75,0.0) 65%)",
          filter: "blur(26px)",
          mixBlendMode: "multiply",
        }}
      />

      <svg viewBox="0 0 600 420" className="w-full h-auto" aria-hidden="true">
        <defs>
          <clipPath id={id} clipPathUnits="userSpaceOnUse">
            <path d={SHAPES[shapeIndex % SHAPES.length]} />
          </clipPath>
          <linearGradient id={`${id}-overlay`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.16)" />
            <stop offset="55%" stopColor="rgba(0,0,0,0.00)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
          </linearGradient>
        </defs>

        <image
          href={src}
          xlinkHref={src}
          width="600"
          height="420"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${id})`}
          className="origin-center transition-transform duration-700 will-change-transform hover:scale-[1.03]"
        />
        <rect x="0" y="0" width="600" height="420" fill={`url(#${id}-overlay)`} clipPath={`url(#${id})`} opacity="0.85" />
      </svg>

      {/* floating label chip */}
      {/* <figcaption className="absolute -top-2 left-2">
        <span className="rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs shadow">{label}</span>
      </figcaption> */}
    </figure>
  );
}

/** one excursion row (blob + card), alternates left/right; opens modal */
function ExcursionRow({ i, img, label, title, desc, options, duration, partner }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const reverse = i % 2 === 1;

  return (
    <>
      <article className="grid items-center gap-8 md:grid-cols-12">
        {/* Image blob */}
        <div className={`${reverse ? "md:order-2 md:col-span-6" : "md:col-span-6"}`}>
          <BlobImage src={img} label={label} shapeIndex={i} />
        </div>

        {/* Text card */}
        <div className={`${reverse ? "md:order-1 md:col-span-6" : "md:col-span-6"}`}>
          <div className="relative rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-md md:p-7">
            {/* corner glow */}
            <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#C2634B]/15 blur-2xl" />
            <h3 className="font-serif text-[1.35rem] text-ink/90 md:text-[1.55rem] tracking-wide">
              {title}
            </h3>

            <p className="mt-2 text-[15px] leading-7 text-ink/80">{desc}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Pill tone="olive">✓ {t("services.transport_included")}</Pill>
              {duration && (
                <Pill tone="clay">
                  {t("services.duration_label")}: {duration}
                </Pill>
              )}
            </div>

            {/* actions */}
            <div className="mt-4 flex items-center gap-2">
              {partner?.href ? (
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm hover:bg-black/5"
                >
                  {t("services.open_link")}
                </a>
              ) : (
                <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/60">
                  {t("services.open_link")}
                </span>
              )}

              <button
                onClick={() => setOpen(true)}
                className="rounded-full bg-[#C2634B] px-4 py-2 text-sm font-medium text-white hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2634B]/40"
                aria-expanded={open}
              >
                {t("services.show_details")}
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Modal (replaces collapsible details) */}
      <ExcursionModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={desc}
        duration={duration}
        options={options}
        transportIncluded
        id={`exc-modal-${i}`}
      />
    </>
  );
}

export default function ExcursionsArt() {
  const { t } = useTranslation();

  const items = [
    { key: "agafay",   label: "Agafay",   img: "/images/agafay.jpg",                partner: null },
    { key: "ourika",   label: "Ourika",   img: "/images/ourika.jpg",      partner: { href: "https://dunesdeserts.com/activite/une-journee-dans-la-vallee-dourika-marche-a-pied/" } },
    { key: "atlas",    label: "Atlas",    img: "/images/imlil.jpg",       partner: { href: "https://dunesdeserts.com/activite/aventure-au-pied-de-l-atlas/" } },
    { key: "puratlas", label: "Atlas",    img: "/images/PIQUE-NIQUE.jpg",  partner: { href: "https://dunesdeserts.com/activite/pur-atlas-1-journee/" } },
  ];

  return (
    <section className="relative">
      {/* EC band with curves into/out of the section */}
      <div className="bg-ec relative">
        {/* <CurveBand position="top" from="#0f5b4a00" to="#F5EFE4" height={90} /> */}
        <div className="container-grid section pt-10 md:pt-12">
          <header className="mb-6 md:mb-8 text-left">
            <h2 className="display-title text-ink/90">{t("services.excursions_title")}</h2>
            <p className="mt-4 text-ink/70">{t("services.excursions_intro")}</p>
          </header>

          <div className="space-y-12 md:space-y-16">
            {items.map((it, i) => {
              const node = t(`services.excursions.${it.key}`, { returnObjects: true });
              return (
                <ExcursionRow
                  key={it.key}
                  i={i}
                  img={it.img}
                  label={it.label}
                  title={node.title}
                  desc={node.desc}
                  options={node.options || []}
                  duration={node.duration}
                  partner={it.partner}
                />
              );
            })}
          </div>
        </div>
        {/* <CurveBand position="bottom" from="#F5EFE4" to="#ffffff00" height={120} /> */}
      </div>
    </section>
  );
}
