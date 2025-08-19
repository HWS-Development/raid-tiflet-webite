// src/pages/RoomShow.jsx
import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CurveBand from "../components/ui/CurveBand";

// --- small helpers (same engine as your booking form) ---
const ENGINE_BASE = "https://riad-dar-tiflet-1.hotelrunner.com/bv3/search";
function toISO(d) {
  const x = new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(
    x.getDate()
  ).padStart(2, "0")}`;
}
function buildHotelRunnerUrl({ checkin, checkout, adults, children, rooms = 1 }) {
  const dayCount = Math.max(1, Math.floor((new Date(checkout) - new Date(checkin)) / 86400000));
  const payload = {
    checkin_date: checkin,
    checkout_date: checkout,
    day_count: dayCount,
    room_count: rooms,
    total_adult: adults,
    total_child: children,
    rooms: [
      {
        adult_count: adults,
        guest_count: adults + children,
        child_count: children,
        child_ages: [],
      },
    ],
    guest_rooms: {
      "0": {
        adult_count: adults,
        guest_count: adults + children,
        child_count: children,
        child_ages: [],
      },
    },
  };
  return `${ENGINE_BASE}?search=${encodeURIComponent(JSON.stringify(payload))}`;
}

// quick shade util so each room gets its own deep band
function shade(hex, percent = -12) {
  // supports #RRGGBB
  const i = parseInt(hex.replace("#", ""), 16);
  if (Number.isNaN(i)) return hex;
  const r = (i >> 16) & 255,
    g = (i >> 8) & 255,
    b = i & 255;
  const t = 255 * (percent > 0 ? 1 : 0);
  const p = Math.abs(percent) / 100;
  const R = Math.round((t - r) * p + r);
  const G = Math.round((t - g) * p + g);
  const B = Math.round((t - b) * p + b);
  return `#${(1 << 24 | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7821?q=80&w=1600&auto=format&fit=crop";

export default function RoomShow() {
  const { id } = useParams();              // e.g. "green" / "yellow" / "safi" etc.
  const { t } = useTranslation();
  const nav = useNavigate();

  const rooms = t("rooms.items", { returnObjects: true }) || [];
  const room = rooms.find((r) => r.id === id) || rooms[0];

  // today + tomorrow defaults for booking payload
  const today = useMemo(() => toISO(new Date()), []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toISO(d);
  }, []);

  const color = room?.color || "#0F5B4A";
  const band = shade(color, -10);     // deep band
  const bandToIvory = "#F6F1E8";

  const imgs = (Array.isArray(room.images) ? room.images : []).filter(Boolean);
  const hero = imgs[0] || FALLBACK;
  const heroSide1 = imgs[1] || FALLBACK;
  const heroSide2 = imgs[2] || FALLBACK;
  const rest = imgs.slice(3);

  const handleBook = () => {
    const url = buildHotelRunnerUrl({
      checkin: today,
      checkout: tomorrow,
      adults: 2,
      children: 0,
      rooms: 1,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!room) {
    // if translation not loaded yet, or id wrong
    return (
      <main className="min-h-[60vh] grid place-items-center">
        <div className="text-center">
          <p className="mb-4">Room not found.</p>
          <button
            onClick={() => nav(-1)}
            className="btn btn-outline rounded-full px-5 py-2"
          >
            {t("ui.prev", "Back")}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main id={`room-${room.id}`}>
      {/* COLOR BAND HERO */}
      <section className="relative text-white" style={{ backgroundColor: band }}>
        <div className="container-grid py-10 md:pt-36">

          {/* TOP GRID: vertical title + hero mosaic */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-end">
            {/* Vertical title on desktop */}
            <h1
              className="md:col-span-3 display-art text-4xl md:text-5xl leading-none writing-vertical hidden md:block"
              aria-label={room.name}
            >
              {room.name}
            </h1>

            {/* Hero mosaic */}
            <div className="md:col-span-9 grid grid-cols-3 gap-3 md:gap-4">
              <div className="col-span-2 relative rounded-[22px] overflow-hidden shadow-2xl aspect-[5/4]">
                <img
                  src={hero}
                  alt={`${room.name} — hero`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <div className="col-span-1 grid grid-rows-2 gap-3 md:gap-4">
                <div className="relative rounded-[22px] overflow-hidden shadow-2xl aspect-[4/3]">
                  <img
                    src={heroSide1}
                    alt={`${room.name} — detail 1`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="relative rounded-[22px] overflow-hidden shadow-2xl aspect-[4/3]">
                  <img
                    src={heroSide2}
                    alt={`${room.name} — detail 2`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* Mobile title */}
            <h1 className="md:hidden display-art text-3xl mt-3">{room.name}</h1>
          </div>

          {/* Quick facts / CTA */}
          <div className="mt-8 md:mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {typeof room.capacity === "number" && (
              <FactCard label={t("rooms.capacity")} value={`${room.capacity} ${t("rooms.guests")}`} />
            )}
            {room.size && <FactCard label={t("rooms.size")} value={room.size} />}
            {room.floor && (
              <FactCard
                label={t("rooms.floor")}
                value={room.floor === "rdc" ? t("rooms.ground_floor") : t("rooms.first_floor")}
              />
            )}
            <button
              onClick={handleBook}
              className="rounded-full bg-white text-black/90 px-6 py-3 font-medium shadow-lg hover:bg-white/90 transition"
            >
              {t("rooms.book_now", "Book now")}
            </button>
          </div>
        </div>

        {/* curve down into ivory content */}
        <CurveBand position="bottom" from={band} to={bandToIvory} height={160} />
      </section>

      {/* DETAILS */}
      <section className="tone-ivory">
        <div className="container-grid py-12 md:py-16 grid md:grid-cols-5 gap-8">
          {/* Description */}
          <article className="md:col-span-3 space-y-4">
            <h2 className="display-title">{t("rooms.details", "Details")}</h2>
            <p className="max-w-prose">{room.description}</p>

            {/* amenities pills */}
            {Array.isArray(room.amenities) && room.amenities.length > 0 && (
              <>
                <h3 className="mt-6 font-semibold">{t("rooms.amenities")}</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {room.amenities.map((a) => (
                    <li
                      key={a}
                      className="px-3 py-1 rounded-full bg-black/5 text-sm border border-black/10"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>

          {/* Facts card */}
          <aside className="md:col-span-2">
            <div className="rounded-[22px] bg-white shadow-soft p-5 space-y-3">
              <InfoRow label={t("rooms.beds")} value={room.beds} />
              <InfoRow label={t("rooms.bath")} value={room.bath} />
              {room.windows && <InfoRow label={t("rooms.windows")} value={room.windows} />}
              {room.ac && <InfoRow label={t("rooms.ac")} value={t("rooms.ac")} />}
              <div className="pt-4">
                <button
                  onClick={handleBook}
                  style={{ backgroundColor: band }}
                  className="btn btn-primary w-full rounded-full"
                >
                  {t("rooms.book_now")}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* GALLERY */}
      {rest.length > 0 && (
        <section className="tone-ivory">
          <div className="container-grid pb-14 md:pb-20 -mt-6">
            <h2 className="display-title mb-6">{t("rooms.gallery", "Gallery")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {rest.map((src, idx) => (
                <figure
                  key={idx}
                  className="relative rounded-[22px] overflow-hidden shadow-xl aspect-[4/3]"
                >
                  <img
                    src={src}
                    alt={`${room.name} — photo ${idx + 4}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// ---------- local tiny components ----------

function FactCard({ label, value }) {
  return (
    <div className="rounded-full border border-white/25 bg-white/10 px-5 py-3 backdrop-blur-[1px]">
      <span className="text-white/70 text-sm">{label}</span>
      <span className="ml-2 font-semibold">{value}</span>
    </div>
  );
}

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-3">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-ink text-right">{value}</span>
    </div>
  );
}
