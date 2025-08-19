import { useTranslation } from "react-i18next";

const FALLBACK =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7821?q=80&w=1600&auto=format&fit=crop";

export default function RoomCard({ room, onView }) {
  const { t } = useTranslation();
  const firstImage =
    (Array.isArray(room.images) && typeof room.images[0] === "string" && room.images[0]) || FALLBACK;

  const tint = room.color || "#C94F44"; // fallback terracotta

  return (
    <article className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
      {/* Ratio */}
      <div className="relative w-full aspect-[16/10]">
        {/* Image */}
        <img
          src={firstImage}
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Full color overlay */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-65 group-hover:opacity-70 transition"
          style={{ backgroundColor: tint }}
        />

        {/* Subtle top->bottom gradient to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/35" />

        {/* Title & action */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold text-lg md:text-xl drop-shadow-sm">
              {room.name}
            </span>
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/50"
              style={{ backgroundColor: tint }}
            />
          </div>

          <button
            onClick={onView}
            className="inline-flex items-center gap-2 rounded-full border border-white/80 text-white/95 backdrop-blur px-3.5 py-1.5 text-sm hover:bg-white hover:text-black transition"
            aria-label={`${t("rooms.view")} — ${room.name}`}
          >
            {t("rooms.view")}
          </button>
        </div>
      </div>

      {/* Small spec chips (optional, unchanged strings) */}
      <div className="bg-white px-4 pb-4 pt-3">
        <div className="flex flex-wrap gap-2 text-xs">
          {typeof room.capacity === "number" && (
            <span className="px-2 py-1 rounded-full bg-black/5">
              {t("rooms.capacity")}: {room.capacity} {t("rooms.guests")}
            </span>
          )}
          {room.size && <span className="px-2 py-1 rounded-full bg-black/5">{room.size}</span>}
          {room.ac && <span className="px-2 py-1 rounded-full bg-black/5">{t("rooms.ac")}</span>}
        </div>
      </div>
    </article>
  );
}
