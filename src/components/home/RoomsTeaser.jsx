import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const FALLBACK =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7821?q=80&w=1600&auto=format&fit=crop";

function RoomTile({ room, onView }) {
  const { t } = useTranslation();
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onView?.();
    }
  };

  return (
    <article
      className="relative overflow-hidden rounded-[28px] shadow-2xl group aspect-[4/5] cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={onView}
      onKeyDown={handleKey}
      aria-label={`${t("rooms.view")} — ${room.name}`}
    >
      {/* image */}
      <img
        src={room.image}
        alt={room.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />


      {/* bottom title + CTA */}
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between gap-4">
        <h3 className="text-white drop-shadow-2xl font-serif text-2xl sm:text-3xl tracking-wide uppercase">
          {room.name}
        </h3>

        <a
          // onClick={(e) => {
          //   e.stopPropagation();
          //   onView?.();
          // }}
          href={`/rooms/${room.id}`}
          aria-label={`${t("rooms.view")} — ${room.name}`}
          className="rounded-full text-center border border-white/70 text-white/90 hover:bg-white hover:text-black px-4 py-1.5 text-sm transition"
        >
          {t("rooms.view")}
        </a>
      </div>
    </article>
  );
}

export default function RoomsTeaser() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const rooms = useMemo(() => t("rooms.home", { returnObjects: true }) || [], [t]);

  return (
    <>
      <header className="mb-8">
        <h2 className="font-serif text-ink text-3xl md:text-4xl tracking-wider display-title">
          {t("rooms.title")}
        </h2>
        {/* <p className="mt-1 text-black">{t("rooms.legend")}</p> */}
      </header>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {rooms.slice(0, 3).map((r) => (
          <RoomTile
            key={r.id}
            room={r}
            onView={() => navigate(`/rooms/${r.id}`)}
          />
        ))}
      </div>

      {/* Show more → /rooms */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/rooms")}
          className="rounded-full border border-black/15 px-4 py-2 text-sm hover:bg-black/5 transition"
        >
          {t("rooms.show_all", "See all rooms")}
        </button>
      </div>
    </>
  );
}
