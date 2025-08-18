import { useTranslation } from "react-i18next";

// tiny inline icons (as components)
const Icon = {
  shuttle: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7h14a4 4 0 0 1 4 4v5H3z" />
      <path d="M7 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  ),
  breakfast: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 10h13a4 4 0 0 1 0 8H3z" />
      <path d="M16 10V6a2 2 0 0 0-2-2H5" />
    </svg>
  ),
  tips: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2v4M6.8 4.8l2.8 2.8M17.2 4.8 14.4 7.6" />
      <path d="M4 14a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z" />
    </svg>
  ),
  luggage: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="7" y="6" width="10" height="14" rx="2" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  ),
};

function Chip({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-brand-ivory text-brand-charcoal border border-black/10">
      {children}
    </span>
  );
}

// NOTE: we now accept `icon` as a JSX node and render {icon} directly.
// This avoids the “defined but never used” warning.
function ItemCard({ icon, title, desc, badge, cta, href }) {
  return (
    <article className="shrink-0 snap-start w-[90%] sm:w-auto sm:min-w-0 rounded-2xl border border-black/5 bg-white shadow-soft p-4 flex flex-col h-full">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-brand-charcoal">{title}</h3>
      </div>
      {badge && (
        <div className="mt-2">
          <Chip>{badge}</Chip>
        </div>
      )}
      <p className="mt-3 text-[15px] leading-6 text-gray-700">{desc}</p>
      {cta && (
        <div className="mt-3">
          <a
            href={href || "/contact"}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-terracotta text-white hover:bg-brand-terracottaDark transition"
          >
            {cta}
          </a>
        </div>
      )}
    </article>
  );
}

export default function EssentialsStrip() {
  const { t } = useTranslation();

  const items = [
    {
      id: "shuttle",
      icon: <Icon.shuttle />, // pass JSX
      title: t("services.items.0.name", "Airport / Train shuttle"),
      desc: t(
        "services.shuttle.desc",
        "We meet you at the exit with a sign, handle the last meters and ride together to the riad. Late arrivals ok."
      ),
      badge: t("services.badges.doortodoor", "Door-to-door"),
      cta: t("services.cta.requestTransfer", "Request transfer"),
    },
    {
      id: "breakfast",
      icon: <Icon.breakfast />,
      title: t("services.items.1.name", "Breakfast (direct bookings)"),
      desc: t(
        "services.breakfast.desc",
        "Mixed European & Moroccan breakfast with pastries, pancakes and fruit. Allergies or vegetarian? Tell us."
      ),
      badge: t("services.badges.includedDirect", "Included for direct bookings"),
    },
    {
      id: "tips",
      icon: <Icon.tips />,
      title: t("services.items.2.name", "City tips & excursion info"),
      desc: t(
        "services.tips.desc",
        "Personalized map, best times to visit, new restaurants, gift ideas, trusted partners for day trips."
      ),
      badge: t("services.badges.tailormade", "Tailor-made"),
    },
    {
      id: "luggage",
      icon: <Icon.luggage />,
      title: t("services.items.3.name", "Luggage storage"),
      desc: t(
        "services.luggage.desc",
        "Between two stays or while you explore, we keep your bulky luggage safe. Space for 1–2 bikes as well."
      ),
      badge: t("services.badges.free", "Free"),
    },
  ];

  return (
    <section className="py-8">
      <div className="container-grid">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <ItemCard key={it.id} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
