import { useTranslation } from "react-i18next";

export default function BarSection() {
  const { t } = useTranslation();
  const categories = t("dining_page.bar.categories", { returnObjects: true }) || [];

  const IMG =
    "/images/riad-8.jpg";

  return (
    <section className="py-8 sm:py-10">
      <div className="container-grid grid lg:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <figure className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-soft border border-black/5">
          <img
            src={IMG}
            alt={t("dining_page.bar.title")}
            className="absolute inset-0 w-full h-full object-cover bg-brand-ivory"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = "https://picsum.photos/1200/800?grayscale"; }}
          />
        </figure>

        {/* Text & small cards */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-brand-charcoal">
            {t("dining_page.bar.title")}
          </h3>
          <p className="mt-3 text-gray-700">{t("dining_page.bar.body")}</p>

          <div className="mt-5 grid sm:grid-cols-2 gap-5">
            {categories.map((cat) => (
              <article key={cat.id} className="bg-white rounded-2xl border border-black/5 p-4 shadow-soft">
                <h4 className="text-sm font-semibold text-brand-charcoal">{cat.title}</h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-800 list-disc pl-5">
                  {cat.items.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500">{t("dining_page.bar.note")}</p>
        </div>
      </div>
    </section>
  );
}
