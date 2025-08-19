import { useTranslation } from "react-i18next";

/* Lightweight inline icons (no extra deps) */
function DotIcon(props){ return (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><circle cx="12" cy="12" r="6"/></svg>
);}
function ShuttleIcon(props){ return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
    <path d="M7 18a1 1 0 1 1-2 0m12 0a1 1 0 1 1-2 0M21.5 12h-3M2.5 12h2" />
  </svg>
);}
function BreakfastIcon(props){ return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M4 10h16M8 10v7a4 4 0 0 0 8 0v-7" />
    <path d="M16 7a2 2 0 1 0 0-4h-3v4z" />
  </svg>
);}
function TipsIcon(props){ return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 2v6M5 9l-3 3 3 3M19 9l3 3-3 3M8 22h8" />
    <path d="M8 18a4 4 0 0 1 8 0v1H8z" />
  </svg>
);}
function LuggageIcon(props){ return (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="6" y="7" width="12" height="14" rx="2" />
    <path d="M10 7V4h4v3" />
  </svg>
);}

const ICONS = {
  shuttle: ShuttleIcon,
  breakfast: BreakfastIcon,
  tips: TipsIcon,
  luggage: LuggageIcon,
};

export default function ServicePillsEnhanced() {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) || [];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => {
        const Icon = ICONS[s.id] || DotIcon;
        return (
          <article
            key={s.id}
            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/6 
                       backdrop-blur text-white/90 shadow-sm transition hover:bg-white/12"
          >
            {/* sweeping hairline (left→right) */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-[2px] w-0 bg-white/80
                         transition-[width] duration-500 ease-out group-hover:w-full"
            />
            <div className="flex items-start gap-4 px-5 py-6 min-h-[112px]">
              <Icon className="mt-1 h-6 w-6 shrink-0" />
              <div className="space-y-1">
                <h3 className="font-medium leading-snug">{s.name}</h3>
                {s.tag && (
                  <span className="inline-block text-[11px] tracking-wide rounded-full px-2 py-0.5 bg-white/10">
                    {s.tag}
                  </span>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
