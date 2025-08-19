import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const FALLBACK =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7821?q=80&w=1600&auto=format&fit=crop";

function RoomTile({ room, onView }) {
  const { t } = useTranslation();
  const img =
    (Array.isArray(room.images) && typeof room.images[0] === "string" && room.images[0]) ||
    FALLBACK;


  return (
    <article className="relative overflow-hidden rounded-[28px] shadow-2xl group aspect-[4/5]">
      {/* image */}
      <img
        src={img}
        alt={room.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />


      {/* bottom title + CTA */}
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between gap-4">
        <h3 className="text-white drop-shadow-2xl font-serif text-2xl sm:text-3xl tracking-wide uppercase">
          {room.name}
        </h3>

        <button
          onClick={onView}
          aria-label={`${t("rooms.view")} — ${room.name}`}
          className="rounded-full border border-white/70 text-white/90 hover:bg-white hover:text-black px-4 py-1.5 text-sm transition"
        >
          {t("rooms.view")}
        </button>
      </div>
    </article>
  );
}

export default function RoomsTeaser({ onViewRoom }) {
  const { t } = useTranslation();
  const rooms = useMemo(() => t("rooms.items", { returnObjects: true }) || [], [t]);

  return (
    <>
      <header className="mb-8">
        <h2 className="font-serif text-ink text-3xl md:text-4xl tracking-wider">
          {t("rooms.title")}
        </h2>
        {/* <p className="mt-1 text-black">{t("rooms.legend")}</p> */}
      </header>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {(rooms.slice(0, 3)).map((r) => (
          <RoomTile key={r.id} room={r} onView={() => onViewRoom?.(r)} />
        ))}
      </div>

      {/* Show more → /rooms */}
      <div className="mt-6 flex justify-center">
        <a
          href="/rooms"
          className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm
                    hover:bg-black hover:text-white transition"
          aria-label={t("rooms.show_all")}
        >
          {t("rooms.show_all")}
        </a>
      </div>
    </>
  );
}
