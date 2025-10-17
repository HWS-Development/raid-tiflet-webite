import { useState } from "react";
import { useTranslation } from "react-i18next";

/* ----------------------- tiny helpers & UI atoms ----------------------- */
/* subtle zellige pattern as a background wash */
function ZelligeBg({ className = "" }) {
  return (
    <svg
      aria-hidden
      className={`absolute inset-0 -z-10 opacity-[0.06] ${className}`}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="zellige" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0L40 20L20 40L0 20Z" fill="currentColor" />
          <circle cx="20" cy="20" r="4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#zellige)" />
    </svg>
  );
}

/* a tiny flourish divider */
function Flourish() {
  return (
    <svg aria-hidden viewBox="0 0 120 10" className="w-16 text-fcd/70">
      <path d="M0 5 Q20 0 40 5 T80 5 T120 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function Pill({ children, tone = "olive" }) {
  const tones = {
    olive: "bg-olive/10 text-olive ring-1 ring-olive/15",
    clay: "bg-fcd/10 text-fcd ring-1 ring-fcd/20",
    ink: "bg-black/5 text-ink ring-1 ring-black/10",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

const SHAPES = [
  "M40,150 C30,90 100,40 200,50 C300,60 350,20 430,50 C510,80 560,110 570,170 C580,230 540,320 470,350 C400,380 320,395 240,380 C160,365 80,350 55,295 C30,240 50,210 40,150 Z",
  "M60,160 C40,90 150,30 260,45 C370,60 420,60 480,110 C540,160 580,240 540,300 C500,360 400,385 310,390 C220,395 150,380 110,335 C70,290 80,230 60,160 Z",
];

function BlobImage({ src, label, shapeIndex = 0 }) {
  const id = `clip-blob-${shapeIndex}-${(label || "x").replace(/\s+/g, "-")}`;
  return (
    <figure className="relative isolate">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 blur-2xl opacity-80"
        style={{
          background:
            "radial-gradient(60% 60% at 25% 25%, #D6C4A8 0%, transparent 60%), radial-gradient(55% 55% at 75% 60%, #F5EFE4 0%, transparent 60%)",
          mixBlendMode: "multiply",
        }}
      />
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
    </figure>
  );
}
/** tiny terracotta icons for activity "kind" */
function KindIcon({ kind, className = "" }) {
  const common = `w-4 h-4 ${className}`;
  switch (kind) {
    case "walk": // footsteps
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7.5 13.5c-.9 0-1.7.5-2 1.3l-.5 1.2a1.7 1.7 0 0 0 3.1 1.2l.7-1.1a1.9 1.9 0 0 0-.3-2.6Zm6.9-7.7c-.8.2-1.4.9-1.5 1.7l-.2 1.3a1.9 1.9 0 0 0 3.7.7l.4-1.2a2 2 0 0 0-2.4-2.5Z" />
          <path d="M6.8 16.7c1.6.5 3 .6 4.5.4m.9-10.1c1.5.4 2.9.5 4.3.2" />
        </svg>
      );
    case "ride": // camel/horse/quad = generic saddle
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 15c3-2 6-2 8 0m0 0c2-2 5-2 8 0M6 11l2-3 4 2 4-2 2 3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "class": // book
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6.5A3 3 0 0 1 7 4h13v14H7a3 3 0 0 0-3 3V6.5Z" strokeLinejoin="round"/>
          <path d="M7 4v14" />
        </svg>
      );
    case "tour": // route pin
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17.5 6.5a3.5 3.5 0 1 0-7 0c0 3 3.5 6.5 3.5 6.5S17.5 9.5 17.5 6.5Z" />
          <circle cx="14" cy="6.5" r="1.2" fill="currentColor"/>
          <path d="M4 20c2-2 4-3 6-3h1" strokeLinecap="round"/>
        </svg>
      );
    case "flight": // balloon
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3c3.3 0 6 2.6 6 5.8S14 15 12 15s-6-3.6-6-6.2S8.7 3 12 3Z" />
          <path d="M10 15l.8 3h2.4l.8-3M10 18h4" />
        </svg>
      );
    case "spa": // lotus
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 12c0-3 2-6 5-7-1 3-1 6 1 8-3 0-5-1-6-1Z"/>
          <path d="M12 12c0-3-2-6-5-7 1 3 1 6-1 8 3 0 5-1 6-1Z"/>
          <path d="M12 12c-2 0-4 1-6 3 2 1 4 2 6 2s4-1 6-2c-2-2-4-3-6-3Z"/>
        </svg>
      );
    case "desert":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 17c3-2 6-2 9 0s6 2 9 0" strokeLinecap="round" />
          <path d="M12 8l2 4h-4l2-4Z" />
        </svg>
      );
    case "city":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 20V7l5-3 5 3v13M9 9h2M9 12h2M9 15h2" />
          <path d="M19 20V10h-3v10" />
        </svg>
      );
    case "coast":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 18c1 .6 2 .9 3 .9s2-.3 3-.9 2-.9 3-.9 2 .3 3 .9 2 .9 3 .9 2-.3 3-.9" strokeLinecap="round"/>
          <path d="M8 10c2-3 5-4 8-2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

/** tiny badge (top-right) */
function KindBadge({ kind, label }) {
  return (
    <span
      className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full border border-[#C2634B]/30
                 bg-ec/90 px-2 py-1 text-[11px] font-medium text-[#C2634B] shadow-sm"
    >
      <KindIcon kind={kind} />
      <span>{label}</span>
    </span>
  );
}

/* ----------------------- big row (featured) ----------------------- */

function FeaturedRow({ i, x }) {
  const [open, setOpen] = useState(false);
  const reverse = i % 2 === 1;
  const hasGroups = Array.isArray(x.groups) && x.groups.length > 0;

  return (
    <article className="grid items-center gap-8 md:grid-cols-12">
      <div className={`${reverse ? "md:order-2 md:col-span-6" : "md:col-span-6"}`}>
        <BlobImage src={x.photo} label={x.title} shapeIndex={i} />
      </div>

      <div className={`${reverse ? "md:order-1 md:col-span-6" : "md:col-span-6"}`}>
        {/* Content sits directly on EC with subtle line — no white card */}
        <div className="relative rounded-[28px] bg-ec/80 p-6 md:p-7 ring-1 ring-olive/15 shadow-soft backdrop-blur-sm">
          <span className="absolute left-6 right-6 -top-0.5 h-[3px] rounded-full bg-fcd/50" aria-hidden />
          <h3 className="font-display text-[1.55rem] md:text-[1.8rem] text-ink">{x.title}</h3>
          <p className="mt-2 text-[15px] leading-7 text-ink/80">{x.desc}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {x.transportNote && <Pill tone="olive">✓ {x.transportNote}</Pill>}
            {x.duration && <Pill tone="clay">{x.durationLabel}: {x.duration}</Pill>}
          </div>

          <div className="mt-4">
            <button
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              className="rounded-full bg-fcd px-4 py-2 text-sm font-medium text-white shadow-soft hover:bg-brand-terracottaDark transition"
            >
              {x.cta}
            </button>
          </div>

          {open && (
            <div className="mt-4 space-y-3">
              {hasGroups ? (
                x.groups.map((g) => (
                  <div key={g.label}>
                    <div className="text-sm font-semibold text-ink mb-1">{g.label}</div>
                    <div className="flex flex-wrap gap-2">
                      {g.options?.map((o) => (
                        <Pill key={o} tone="ink">{o}</Pill>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-wrap gap-2">
                  {x.options?.map((o) => (
                    <Pill key={o} tone="ink">{o}</Pill>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ----------------------- small item ----------------------- */

function SmallItem({ x, i = 0, t }) {
  const kindLabel = x.kind ? t(`activities_page.excursions.kinds.${x.kind}`, x.kind) : null;
  const [open, setOpen] = useState(false);

  // alternate tones for variety
  const tone = i % 2 === 0 ? "bg-chb/80" : "bg-ec/90";
  const ring  = i % 2 === 0 ? "ring-olive/15" : "ring-fcd/20";

  return (
    <div
      className={`relative overflow-hidden rounded-[22px] ring-1 ${ring} ${tone} p-4 pt-5
                  shadow-soft transition hover:shadow-card hover:-translate-y-[2px]`}
    >
      {/* zellige wash */}
      <ZelligeBg className="text-ink" />
      <KindBadge kind={x.kind} label={kindLabel} />

      {/* drifting blobs */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-fcd/20 blur-2xl transition-transform duration-500 group-hover:translate-x-1" />
      <div className="pointer-events-none absolute -left-10 -bottom-12 h-28 w-28 rounded-full bg-olive/20 blur-2xl transition-transform duration-500 group-hover:-translate-y-1" />

      {/* corner ribbon */}
      {/* this used to be the old amount of time like 1 day */}
      {/* <span className="absolute right-0 top-0 rounded-bl-[14px] rounded-tr-[22px] bg-fcd px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
        {x.duration || ""}
      </span> */}
      <div className="flex flex-col justify-between items-start min-h-36">
        <div>
          <h4 className="font-display text-[1.1rem] text-ink pr-24">{x.title}</h4>
          <Flourish />

          <p className="mt-2 text-sm text-ink/75 line-clamp-4">{x.desc}</p>

        </div>
        <button
          className="mt-3 text-sm font-medium text-fcd hover:text-brand-terracottaDark underline underline-offset-4"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {x.cta}
        </button>
      </div>


      {open && (
        <div className="mt-3 flex flex-wrap gap-2 z-30">
          {(x.options || []).map((o) => (
            <span key={o} className="inline-flex items-center rounded-full bg-ink/5 px-3 py-1 text-xs text-ink ring-1 ring-ink/10">
              {o}
            </span>
          ))}
          {/* Support for grouped options if present */}
          {(x.groups || []).map((g) => (
            <div key={g.label} className="mt-2 w-full">
              <div className="text-xs font-semibold text-ink/80 mb-1">{g.label}</div>
              <div className="flex flex-wrap gap-2">
                {g.options?.map((o) => (
                  <span key={o} className="inline-flex items-center rounded-full bg-ink/5 px-3 py-1 text-xs text-ink ring-1 ring-ink/10">
                    {o}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Excursions() {
  const { t } = useTranslation();

  // Normalize i18n payload to an array.
  const raw = t("activities_page.excursions.items", { returnObjects: true });
  const items = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object"
    ? Object.entries(raw).map(([id, v]) => ({ id, ...(v || {}) }))
    : [];

  const copy = {
    title: t("activities_page.excursions.title"),
    intro: t("activities_page.excursions.intro"),
    transportNote: t("activities_page.excursions.transport_global_note"),
    durationLabel: t("activities_page.excursions.duration_label"),
    cta: t("activities_page.excursions.cta"),
  };

  const withCommon = (x) => ({
    ...x,
    id: x.id || x.key || x.slug,
    durationLabel: copy.durationLabel,
    cta: x.cta || copy.cta,
    transportNote: copy.transportNote,
  });

  // choose 3 featured ids (order matters)
  const FEATURED = ["agafay", "ourika-walking", "imlil-toubkal"];

  const byId = Object.fromEntries(items.map((it) => [it.id, it]));

  const featured = FEATURED.map((id) => byId[id]).filter(Boolean).map(withCommon);

  const rest = items.filter((d) => !FEATURED.includes(d.id)).map(withCommon);

  return (
    <section className="relative bg-ec">
      <div className="container-grid section">
        <header className="mb-6 md:mb-8">
          <h2 className="display-title text-ink">{copy.title}</h2>
          <p className="mt-2 text-ink/70">{copy.intro}</p>
          {copy.transportNote && <p className="mt-1 text-sm text-fcd">{copy.transportNote}</p>}
        </header>

        {/* Featured 3 */}
        <div className="space-y-14 md:space-y-16">
          {featured.map((x, i) => (
            <FeaturedRow key={x.id || i} i={i} x={x} t={t} />
          ))}
        </div>

        {/* Others */}
        {rest.length > 0 && (
          <div className="mt-12 md:mt-16">
            <div className="mb-4 h-1 w-24 rounded-full bg-olive/30" aria-hidden />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((x, idx) => (
                <SmallItem key={x.id || idx} x={x} i={idx} t={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
