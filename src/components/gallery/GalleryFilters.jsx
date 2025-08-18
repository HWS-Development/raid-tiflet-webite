import { useTranslation } from "react-i18next";

export default function GalleryFilters({
  categories = [],
  activeCat, setActiveCat,
  query, setQuery,
  resultCount,
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-black/5 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Category chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Chip
            label={t("gallery_page.filters.all")}
            active={activeCat === "all"}
            onClick={() => setActiveCat("all")}
          />
          {categories.map((c) => (
            <Chip
              key={c.id}
              label={c.label}
              active={activeCat === c.id}
              onClick={() => setActiveCat(c.id)}
            />
          ))}
        </div>

        {/* Search + count */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-600">
            {t("gallery_page.results", { count: resultCount })}
          </div>
          <input
            type="text"
            value={query}
            placeholder={t("gallery_page.search_placeholder")}
            onChange={(e) => setQuery(e.target.value)}
            className="w-56 md:w-64 rounded-xl border border-black/10 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-sm border transition ${
        active
          ? "bg-brand-terracotta text-white border-brand-terracotta"
          : "bg-brand-ivory text-brand-charcoal border-black/10 hover:bg-white"
      }`}
    >
      {label}
    </button>
  );
}
