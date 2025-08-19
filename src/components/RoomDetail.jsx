import RoomCanvas from "@/components/RoomCanvas";
import { CurveTop, CurveBottom } from "@/components/Curves";

export default function RoomDetail({ room }) {
  // you already have room from i18n JSON; pass via route loader or prop
  return (
    <>
      <CurveTop color="var(--paper)" />
      <RoomCanvas color={room.color}>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-white">
          <div className="grid md:grid-cols-[1fr,420px] gap-10 items-start">
            {/* Left: hero image collage */}
            <div className="relative">
              <img src={room.images?.[0]} alt={room.name}
                   className="w-full rounded-2xl shadow-soft object-cover" />
              {/* vertical label */}
              <div className="hidden md:block absolute -left-12 top-8 tracking-[.25em] font-display text-5xl uppercase rotate-[-90deg] origin-left">
                {room.name}
              </div>
            </div>

            {/* Right: short facts on tinted card */}
            <div className="bg-white/08 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-white/15">
              <h1 className="font-display text-4xl leading-tight mb-3">{room.name}</h1>
              <p className="opacity-90">{room.description}</p>

              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20">
                  {room.capacity} {/**/}guests
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20">{room.size}</span>
                <span className="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20">
                  {room.ac ? "A/C" : ""}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <a href="https://riad-dar-tiflet-1.hotelrunner.com/bv3/search"
                   target="_blank" rel="noreferrer"
                   className="inline-flex px-5 py-2.5 rounded-xl bg-brand-terracotta text-white hover:bg-brand-terracottaDark transition">
                  Book
                </a>
                <a href="/contact" className="inline-flex px-5 py-2.5 rounded-xl bg-white/10 ring-1 ring-white/20">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </RoomCanvas>
      <CurveBottom color="var(--paper)" />
    </>
  );
}
