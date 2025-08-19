import { useTranslation } from "react-i18next";

const FALLBACK =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7821?q=80&w=1600&auto=format&fit=crop";

export default function RoomTileArt({ room, onView }) {
  const { t } = useTranslation();
  const img =
    (Array.isArray(room.images) && typeof room.images[0] === "string" && room.images[0]) ||
    FALLBACK;

  return (
    <article className="relative overflow-hidden rounded-[28px] shadow-2xl group aspect-[4/3]">
      <img src={img} alt={room.name} className="absolute inset-0 w-full h-full object-cover" />
      {/* strong color wash from the room color */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-multiply transition group-hover:opacity-70"
        style={{ backgroundColor: room.color || "#C94F44" }}
      />
      {/* soft top/bottom gradient to make type pop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
        <h3 className="display-art text-white leading-none">
          {room.name}
        </h3>

        <button
          onClick={onView}
          className="whitespace-nowrap rounded-full border border-white/70 text-white/90 hover:bg-white hover:text-black px-4 py-1.5 text-sm tracking-wide transition"
        >
          {t("rooms.view")}
        </button>
      </div>
    </article>
  );
}
