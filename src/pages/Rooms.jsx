// src/pages/Rooms.jsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { safeArray } from "../utils/safeArray";

import RoomsHero from "../components/rooms/RoomsHero";
import RoomCard from "../components/rooms/RoomCard";
import RoomModal from "../components/rooms/RoomModal";

export default function Rooms() {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();

  // Stable rooms array keyed by language (prevents effects from re-firing)
  const rooms = useMemo(
    () => safeArray(t("rooms.items", { returnObjects: true })),
    [i18n.language]
  );

  const [openRoom, setOpenRoom] = useState(null);
  const rid = useMemo(() => params.get("room") || "", [params]);

  // 👉 Open from deep-link only when rid or rooms change
  useEffect(() => {
    if (!rid) return;
    const r = rooms.find((x) => x.id === rid);
    if (r) setOpenRoom((prev) => (prev?.id === r.id ? prev : r));
  }, [rid, rooms]); // ⬅️ no openRoom in deps

  const openModal = (room) => {
    if (!room) return;
    const next = new URLSearchParams(params);
    next.set("room", room.id);
    setParams(next, { replace: false });
    setOpenRoom(room);
  };

  const closeModal = () => {
    // Clear the URL first, then clear state on the next tick
    const next = new URLSearchParams(params);
    next.delete("room");
    setParams(next, { replace: false });
    setTimeout(() => setOpenRoom(null), 0); // avoids race where rid is still the old value
  };

  const ordered = useMemo(
    () =>
      [...rooms].sort(
        (a, b) => (a.capacity || 0) - (b.capacity || 0) || a.name.localeCompare(b.name)
      ),
    [rooms]
  );

  return (
    <main id="rooms" className="pt-16 pb-12 sm:pb-16">
      <RoomsHero />

      <section className="pt-8 sm:pt-10">
        <div className="container-grid">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {ordered.map((room) => (
              <RoomCard key={room.id} room={room} onView={() => openModal(room)} />
            ))}
          </div>
        </div>
      </section>

      {openRoom && <RoomModal room={openRoom} onClose={closeModal} />}
    </main>
  );
}
