import { useTranslation } from "react-i18next";

// Matches your i18n: spark, patio, salon, rooftop
const ICON = {
  spark: "✨",
  patio: "🏡",
  salon: "🗣️",
  rooftop: "🌇",
};

/**
 * Cards-only highlights grid (no heading/section/curves).
 * Use inside your green band in About.tsx.
 */
export default function Highlights() {
  const { t } = useTranslation();

  const items =
    t("about_page.highlights", { returnObjects: true })?.filter(Boolean) || [];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map(
        (
          h,
          idx
        ) => (
          <div
            key={h.id || idx}
            className="group rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 text-white/90 shadow-sm backdrop-blur
                       transition hover:bg-white/[0.10]"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{ICON[h.icon || "spark"]}</span>
              <div>
                <h3 className="font-medium">{h.title}</h3>
                <p className="mt-1 text-sm text-white/80">{h.body}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
