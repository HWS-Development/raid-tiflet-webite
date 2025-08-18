// src/components/about/Team.jsx
import { useTranslation } from "react-i18next";

const FALLBACK =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop";

export default function Team() {
  const { t } = useTranslation();
  const members = t("about_page.team.members", { returnObjects: true }) || [];

  return (
    <section className="py-8 sm:py-10">
      <div className="container-grid">
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand-charcoal">
          {t("about_page.team.title")}
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {members.map((m, i) => (
            <article
              key={m.id || i}
              className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-soft hover:shadow-lg transition"
            >
              {/* Large, consistent image */}
              <figure className="relative aspect-[4/3] bg-brand-ivory">
                <img
                  src={m.photo || FALLBACK}
                  alt={m.name ? `${m.name} — Dar Tiflet` : "Team member"}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = FALLBACK)}
                />
              </figure>

              {/* Name + short bio */}
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-terracotta" />
                  <h3 className="text-base sm:text-lg font-semibold text-brand-charcoal">
                    {m.name || "—"}
                  </h3>
                </div>

                {m.bio && (
                  <p className="mt-3 text-sm text-gray-800 leading-6">{m.bio}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
