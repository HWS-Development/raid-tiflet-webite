import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";
import { safeArray } from "../../utils/safeArray";
import RoomModal from "../rooms/RoomModal";

export default function RoomsTeaser() {
  const { t } = useTranslation();
  const rooms = safeArray(t("rooms.items", { returnObjects: true })).slice(0, 3);
  const [openRoom, setOpenRoom] = useState(null);

  return (
    <section className="py-12 sm:py-16">
      <div className="container-grid">
        <SectionHeading>{t("rooms.title")}</SectionHeading>
        <p className="text-sm text-gray-600 mb-8">{t("rooms.legend")}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <article key={room.id}
              className="bg-white rounded-2xl shadow-soft overflow-hidden border border-black/5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="h-1" style={{ backgroundColor: room.color || "#C94F44" }}></div>
              <img
                src={
                  room.id === "green"   ? "/images/rooms/Green Room1.jpg" :
                  room.id === "bigarree"? "/images/rooms/Bigarree room1.jpg" :
                  "/images/rooms/Yellow Room1.jpg"
                }
                alt={room.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-semibold text-brand-charcoal flex items-center gap-2">
                  {room.name}
                  {room.color && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: room.color }} />}
                </h3>
                {room.type && <p className="text-sm text-gray-600 mt-1">{room.type}</p>}

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setOpenRoom(room)}
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
          ))}
        </div>
      </div>

      {openRoom && (
        <RoomModal
          room={openRoom}
          onClose={() => setOpenRoom(null)}
        />
      )}
    </section>
  );
}
