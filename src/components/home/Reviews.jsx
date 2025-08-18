import { useTranslation } from "react-i18next";
import ReviewsSlider from "./ReviewsSlider";

function initials(name = "") {
  return name.split(" ").map((s) => s[0]).join("").slice(0,2).toUpperCase();
}

function ReviewCard({ r }) {
  return (
    <article className="h-full rounded-2xl border border-black/5 shadow-soft p-5 bg-white">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-brand-ivory flex items-center justify-center text-brand-terracotta font-semibold">
          {initials(r.name)}
        </div>
        <div>
          <div className="font-semibold text-brand-charcoal">{r.name}</div>
          <div className="text-xs text-gray-500">{r.country} • {r.date}</div>
        </div>
      </div>
      <p className="mt-4 text-[15px] leading-7 text-gray-800">
        <span className="text-brand-terracotta text-lg mr-1">“</span>
        {r.text}
        <span className="text-brand-terracotta text-lg ml-1">”</span>
      </p>
    </article>
  );
}

export default function Reviews() {
  const { t } = useTranslation();
  const reviews = t("reviews.items", { returnObjects: true }) || [];

  return (
    <section className="py-10 sm:py-12">
      <div className="container-grid">
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand-charcoal">
          {t("reviews.title", "Guest Reviews")}
        </h2>

        <ReviewsSlider
          className="mt-6 max-w-5xl mx-auto"
          items={reviews}
          perView={{ base: 1, md: 2, lg: 2 }}
          autoplayMs={5500}
          renderItem={(r) => <ReviewCard r={r} />}
        />
      </div>
    </section>
  );
}
