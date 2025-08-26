import { useMemo, useState } from "react";

function buildHotelRunnerUrl({ checkin, checkout, adults, children, rooms = 1 }) {
  const dayCount = Math.max(
    1,
    Math.floor((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24))
  );

  const payload = {
    checkin_date: checkin,
    checkout_date: checkout,
    day_count: dayCount,
    room_count: rooms,
    total_adult: adults,
    total_child: children,
    rooms: [{ adult_count: adults, guest_count: adults + children, child_count: children, child_ages: [] }],
    guest_rooms: { "0": { adult_count: adults, guest_count: adults + children, child_count: children, child_ages: [] } }
  };

  return "https://riad-dar-tiflet-1.hotelrunner.com/bv3/search?search=" +
    encodeURIComponent(JSON.stringify(payload));
}

function toISODate(d) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export default function BookingForm() {
  const today = useMemo(() => toISODate(new Date()), []);
  const tomorrow = useMemo(() => {
    const d = new Date(); d.setDate(d.getDate() + 1); return toISODate(d);
  }, []);

  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    window.open(buildHotelRunnerUrl({ checkin, checkout, adults, children }), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-3 bg-white shadow-soft ring-1 ring-ink/10">
      <div className="col-span-2">
        <h3 className="font-semibold text-brand-charcoal">Availability & Prices</h3>
      </div>

      <label className="text-sm text-gray-700">Check-in
        <input type="date" value={checkin} min={toISODate(new Date())}
               onChange={(e) => setCheckin(e.target.value)}
               className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2" required />
      </label>

      <label className="text-sm text-gray-700">Check-out
        <input type="date" value={checkout} min={checkin}
               onChange={(e) => setCheckout(e.target.value)}
               className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2" required />
      </label>

      <label className="text-sm text-gray-700">Adults
        <input type="number" min="1" value={adults}
               onChange={(e) => setAdults(parseInt(e.target.value || "1", 10))}
               className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2" required />
      </label>

      <label className="text-sm text-gray-700">Children
        <input type="number" min="0" value={children}
               onChange={(e) => setChildren(parseInt(e.target.value || "0", 10))}
               className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2" />
      </label>

      <div className="col-span-2">
        <button type="submit"
                className="bg-accent-terracotta hover:bg-accent-terracottaDark text-white">
          Search
        </button>
      </div>
    </form>
  );
}
