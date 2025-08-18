import { useMemo, useRef, useState } from "react";
import CalendarPopover from "./CalendarPopover";
import RangeCalendar from "./RangeCalendar"; // keep if you import types from it (not required here)

// ---- helpers in-file ----
const ENGINE_BASE = "https://riad-dar-tiflet-1.hotelrunner.com/bv3/search";
function toISODate(d){ const x=new Date(d); return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}-${String(x.getDate()).padStart(2,"0")}`;}
function buildHotelRunnerUrl({ checkin, checkout, adults, children, rooms = 1 }) {
  const dayCount = Math.max(1, Math.floor((new Date(checkout) - new Date(checkin)) / 86400000));
  const payload = {
    checkin_date: checkin, checkout_date: checkout, day_count: dayCount,
    room_count: rooms, total_adult: adults, total_child: children,
    rooms: [{ adult_count: adults, guest_count: adults + children, child_count: children, child_ages: [] }],
    guest_rooms: { "0": { adult_count: adults, guest_count: adults + children, child_count: children, child_ages: [] } }
  };
  return `${ENGINE_BASE}?search=${encodeURIComponent(JSON.stringify(payload))}`;
}

export default function BookingForm() {
  const today = useMemo(() => toISODate(new Date()), []);
  const tomorrow = useMemo(() => { const d=new Date(); d.setDate(d.getDate()+1); return toISODate(d); }, []);

  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // range calendar state
  const [openCal, setOpenCal] = useState(false);
  const [draft, setDraft] = useState({ start: new Date(checkin), end: new Date(checkout) });
  const anchorRef = useRef(null); // wraps the two date inputs

  const onSubmit = (e) => {
    e.preventDefault();
    window.open(buildHotelRunnerUrl({ checkin, checkout, adults, children }), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <h3 className="font-semibold text-brand-charcoal">Availability</h3>
      </div>

      {/* Date inputs wrapper = anchor for popover */}
      <div ref={anchorRef} className="col-span-2 grid grid-cols-2 gap-3">
        <label className="text-sm text-gray-700">
          Check-in
          <input
            type="text" readOnly value={checkin}
            onClick={() => { setDraft({ start: new Date(checkin), end: new Date(checkout) }); setOpenCal(true); }}
            className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 cursor-pointer" required
          />
        </label>

        <label className="text-sm text-gray-700">
          Check-out
          <input
            type="text" readOnly value={checkout}
            onClick={() => { setDraft({ start: new Date(checkin), end: new Date(checkout) }); setOpenCal(true); }}
            className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 cursor-pointer" required
          />
        </label>
      </div>

      {/* Popover / Bottom sheet (portal) */}
      <CalendarPopover
        open={openCal}
        onClose={() => setOpenCal(false)}
        anchorRef={anchorRef}
        value={draft}
        onChange={setDraft}
        onComplete={(finalRange) => {
          if (finalRange?.start && finalRange?.end) {
            setCheckin(toISODate(finalRange.start));
            setCheckout(toISODate(finalRange.end));
          }
          setOpenCal(false);
        }}
        locale={typeof navigator !== "undefined" ? navigator.language : "en"}
        minDate={new Date()}
      />

      <label className="text-sm text-gray-700">
        Adults
        <input type="number" min="1" value={adults}
               onChange={(e)=>setAdults(parseInt(e.target.value||"1",10))}
               className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2" required />
      </label>

      <label className="text-sm text-gray-700">
        Children
        <input type="number" min="0" value={children}
               onChange={(e)=>setChildren(parseInt(e.target.value||"0",10))}
               className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2" />
      </label>

      <div className="col-span-2">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-brand-terracotta text-white font-medium shadow-soft hover:bg-brand-terracottaDark transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
