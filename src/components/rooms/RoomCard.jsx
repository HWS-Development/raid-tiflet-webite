import { useTranslation } from "react-i18next";

const FALLBACK =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7821?q=80&w=1600&auto=format&fit=crop";

export default function RoomCard({ room, onView }) {
  const { t } = useTranslation();
  const firstImage =
    (Array.isArray(room.images) && typeof room.images[0] === "string" && room.images[0]) || FALLBACK;

  return (
    <article className="group bg-white rounded-2xl shadow-soft overflow-hidden border border-black/5 hover:-translate-y-1 hover:shadow-lg transition">
      <div className="h-1" style={{ backgroundColor: room.color || "#C94F44" }} />

      <button
        onClick={onView}
        className="relative w-full block overflow-hidden aspect-[16/10]" /* keeps a clean ratio */
        aria-label={`${t("rooms.view")} — ${room.name}`}
      >
        <img
          src={firstImage}
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white drop-shadow">
            <span className="font-semibold">{room.name}</span>
            {room.color && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: room.color }} />}
          </div>
          {room.type && (
            <span className="hidden sm:inline text-xs text-white/90 drop-shadow px-2 py-1 rounded-full bg-black/30">
              {room.type}
            </span>
          )}
        </div>
      </button>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 text-xs">
          {typeof room.capacity === "number" && (
            <span className="px-2 py-1 rounded-full bg-brand-ivory border border-black/10">
              {t("rooms.capacity")}: {room.capacity} {t("rooms.guests")}
            </span>
          )}
          {room.size && <span className="px-2 py-1 rounded-full bg-brand-ivory border border-black/10">{room.size}</span>}
          {room.floor && (
            <span className="px-2 py-1 rounded-full bg-brand-ivory border border-black/10">
              {room.floor === "rdc" ? t("rooms.ground_floor") : t("rooms.first_floor")}
            </span>
          )}
          {room.ac && <span className="px-2 py-1 rounded-full bg-brand-ivory border border-black/10">{t("rooms.ac")}</span>}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={onView}
            className="inline-flex px-4 py-2 rounded-xl border border-brand-terracotta text-brand-terracotta hover:bg-brand-terracotta hover:text-white transition"
          >
            {t("rooms.view")}
          </button>
          <a
            href="https://riad-dar-tiflet-1.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noreferrer"
            className="inline-flex px-4 py-2 rounded-xl bg-brand-terracotta text-white hover:bg-brand-terracottaDark transition"
          >
            {t("rooms.book")}
          </a>
        </div>
      </div>
    </article>
  );
}
