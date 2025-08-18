import { useTranslation } from "react-i18next";

const icons = {
  patio: "🌿",
  rooftop: "🌇",
  salon: "🧉",
  hospitality: "🤝",
};

export default function Highlights() {
  const { t } = useTranslation();
  const items = t("about_page.highlights", { returnObjects: true }) || [];

  return (
    <section className="py-8 sm:py-10 bg-brand-ivory">
      <div className="container-grid">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <article
              key={it.id}
              className="bg-white rounded-2xl border border-black/5 shadow-soft p-4"
            >
              <div className="flex items-center gap-2">
                <div className="text-xl">{icons[it.icon] || "✦"}</div>
                <h3 className="text-sm font-semibold text-brand-charcoal">{it.title}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-700">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
