import { useTranslation } from "react-i18next";

export default function MenuSection() {
  const { t } = useTranslation();
  const highlights = t("dining_page.menu.highlights", { returnObjects: true }) || [];
  const sections = t("dining_page.menu.sections", { returnObjects: true }) || [];

  const IMG =
    "/images/rooftop.jpg";

  return (
    <section className="py-8 sm:py-10">
      <div className="container-grid grid lg:grid-cols-2 gap-8 items-start">
        {/* Text column */}
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-charcoal">
            {t("dining_page.menu.title")}
          </h2>

          {/* highlights → tidy two-col list with brand dots */}
          <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-800">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* three menu cards */}
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {sections.map((s) => (
              <article
                key={s.id}
                className="bg-white rounded-2xl border border-black/5 shadow-soft p-4"
              >
                <h3 className="text-sm font-semibold text-brand-charcoal">{s.title}</h3>
                <ul className="mt-3 space-y-2">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-800">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/50 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* Image column */}
        <figure className="relative order-1 lg:order-2 aspect-[16/10] rounded-2xl overflow-hidden shadow-soft border border-black/5">
          <img
            src={IMG}
            alt={t("dining_page.menu.title")}
            className="absolute inset-0 w-full h-full object-cover bg-brand-ivory"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = "https://picsum.photos/1200/800"; }}
          />
        </figure>
      </div>
    </section>
  );
}
