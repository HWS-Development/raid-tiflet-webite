// components/gallery/GalleryFilters.jsx
import { useTranslation } from "react-i18next";

export default function GalleryFilters({
  categories,
  activeCat,
  setActiveCat,
  query,
  setQuery,
  resultCount,
}) {
  const { t } = useTranslation();

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-wrap items-center gap-3">
        {/* “All” pill */}
        <button
          onClick={() => setActiveCat("all")}
          className={`px-4 py-2 rounded-full border text-sm transition ${
            activeCat === "all"
              ? "bg-rose-600 text-white"
              : "border-black/15 hover:bg-black/5"
          }`}
        >
          {t("gallery_page.filters.all", "All")}
        </button>

        {/* category pills */}
        {(categories || []).map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              activeCat === c.id
                ? "bg-rose-600 text-white"
                : "border-black/15 hover:bg-black/5"
            }`}
          >
            {c.label}
          </button>
        ))}

        {/* search */}
        <div className="ml-auto flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("gallery_page.search_placeholder", "Search…")}
            className="rounded-full border border-black/15 px-4 py-2 text-sm w-[200px] md:w-[260px] bg-white/80 backdrop-blur"
          />
          <span className="text-xs text-black/60">
            {t("gallery_page.results", "{{count}} photos", { count: resultCount })}
          </span>
        </div>
      </div>
    </div>
  );
}
