import { useTranslation } from "react-i18next";

export default function DiningSection() {
  const { t } = useTranslation();
  const bullets = t("dining.bullets", { returnObjects: true }) || [];

  return (
    <section className="py-12 sm:py-16">
      <div className="container-grid grid lg:grid-cols-2 gap-8 items-center">
        {/* Restaurant block */}
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-charcoal">
            {t("dining.title")}
          </h2>
          <p className="mt-3 text-gray-700">{t("dining.subtitle")}</p>

          <ul className="mt-4 space-y-2 text-sm text-gray-800 list-disc pl-5">
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>

          <p className="mt-4 text-sm text-gray-600">
            {t("dining.reserve_note")}
          </p>
        </div>

        <div className="relative order-1 lg:order-2 aspect-[16/10] rounded-2xl overflow-hidden shadow-soft border border-black/5">
          <img
            src="/images/rooftop.jpg"
            alt="Terrace dining"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bar */}
      <div className="container-grid mt-10 grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-soft border border-black/5">
          <img
            src="/images/riad-8.jpg"
            alt="Non-alcoholic bar"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-brand-charcoal">
            {t("dining.bar_title")}
          </h3>
          <p className="mt-3 text-gray-700">{t("dining.bar_body")}</p>
        </div>
      </div>
    </section>
  );
}
