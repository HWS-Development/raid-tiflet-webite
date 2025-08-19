import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RoomsHero from "../components/rooms/RoomsHero";
import CurveBand from "../components/ui/CurveBand";

const FALLBACK =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7821?q=80&w=1600&auto=format&fit=crop";

/** Ratios to create varied heights (looped across cards) */
const RATIOS = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[5/4]", "aspect-square"];

function RoomTile({ room, onView, ratioClass }) {
  const { t } = useTranslation();
  const img =
    (Array.isArray(room.images) && typeof room.images[0] === "string" && room.images[0]) ||
    FALLBACK;

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onView?.();
    }
  };

  return (
    <article className="mb-6 break-inside-avoid">
      <div
        className={`relative overflow-hidden rounded-[28px] ${ratioClass} cursor-pointer`}
        role="button"
        tabIndex={0}
        onClick={onView}
        onKeyDown={handleKey}
        aria-label={`${t("rooms.view")} — ${room.name}`}
      >
        {/* photo (no shadow, no overlays) */}
        <img
          src={img}
          alt={room.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />

        {/* bottom in-card bar with name + CTA (still no global wash/gradient) */}
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
      </div>
    </article>
  );
}

export default function RoomsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const rooms = useMemo(() => t("rooms.items", { returnObjects: true }) || [], [t]);

  return (
    <main id="rooms">
       <RoomsHero />
      <section className="tone-ivory">
        <div className="container-grid">

          {/* Masonry using CSS columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {rooms.map((r, idx) => (
              <RoomTile
                key={r.id}
                room={r}
                ratioClass={RATIOS[idx % RATIOS.length]}
                onView={() => navigate(`/rooms/${r.id}`)}
              />
            ))}
          </div>
        </div>
      </section>
      <CurveBand position="bottom" from="#F6F1E8" to="#254E3E" height={140} />
    </main>
  );
}
