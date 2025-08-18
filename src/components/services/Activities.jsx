import { useTranslation } from "react-i18next";

function ActivityCard({ a, cta }) {
  return (
    <article className="rounded-3xl overflow-hidden border border-black/5 bg-white shadow-soft flex flex-col">
      <div className="relative">
        <img
          src={a.img}
          alt={a.title}
          className="h-56 w-full object-cover"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs bg-white/90 text-brand-charcoal border border-black/10">
          On request
        </span>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-brand-charcoal">{a.title}</h3>
        <p className="text-[15px] leading-7 text-gray-700">{a.desc}</p>
        <div className="mt-1">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-terracotta text-white hover:bg-brand-terracottaDark transition"
          >
            {cta}
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" className="-mr-0.5">
              <path d="M12.293 3.293a1 1 0 0 1 1.414 0l4.999 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L15.586 11H3a1 1 0 1 1 0-2h12.586l-3.293-3.293a1 1 0 0 1 0-1.414z"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Activities() {
  const { t } = useTranslation();
  const title = t("services.activities.title");
  const cta = t("services.activities.cta");
  const items = t("services.activities.items", { returnObjects: true }) || [];

  return (
    <section id="activities" className="py-12">
      <div className="container-grid">
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand-charcoal">{title}</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((a) => (
            <ActivityCard key={a.id} a={a} cta={cta} />
          ))}
        </div>
      </div>
    </section>
  );
}
