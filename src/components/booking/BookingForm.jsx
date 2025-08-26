// src/components/BookingForm.jsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CalendarPopover from "./CalendarPopover";

// ---- helpers in-file ----
const ENGINE_BASE = "https://riad-dar-tiflet-1.hotelrunner.com/bv3/search";
function toISODate(d) {
  const x = new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
}

// NOTE: accepts optional `promo`
function buildHotelRunnerUrl({ checkin, checkout, adults, children, rooms = 1, promo }) {
  const dayCount = Math.max(1, Math.floor((new Date(checkout) - new Date(checkin)) / 86400000));
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
  let url = `${ENGINE_BASE}?search=${encodeURIComponent(JSON.stringify(payload))}`;
  if (promo && promo.trim()) url += `&coupon_code=${encodeURIComponent(promo.trim())}`;
  return url;
}

export default function BookingForm() {
  const { t } = useTranslation();

  const today = useMemo(() => toISODate(new Date()), []);
  const tomorrow = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 1); return toISODate(d); }, []);

  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // range calendar state
  const [openCal, setOpenCal] = useState(false);
  const [draft, setDraft] = useState({ start: new Date(checkin), end: new Date(checkout) });
  const anchorRef = useRef(null); // wraps the two date inputs

  // promo
  const [showPromo, setShowPromo] = useState(false);
  const [promo, setPromo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    window.open(
      buildHotelRunnerUrl({ checkin, checkout, adults, children, promo }),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-ink/10"
      aria-label={t("booking.ariaForm")}
    >
      <div className="col-span-2">
        <h3 className="font-semibold text-ink">{t("booking.titleShort")}</h3>
      </div>

      {/* Date inputs wrapper = anchor for popover */}
      <div ref={anchorRef} className="col-span-2 grid grid-cols-2 gap-3">
        <label htmlFor="checkin" className="text-sm text-ink">
          {t("booking.checkin")}
          <input
            id="checkin"
            type="text"
            readOnly
            value={checkin}
            onClick={() => {
              setDraft({ start: new Date(checkin), end: new Date(checkout) });
              setOpenCal(true);
            }}
            className="mt-1 w-full cursor-pointer rounded-xl border border-black/10 px-3 py-2"
            required
            aria-label={t("booking.checkin")}
          />
        </label>

        <label htmlFor="checkout" className="text-sm text-ink">
          {t("booking.checkout")}
          <input
            id="checkout"
            type="text"
            readOnly
            value={checkout}
            onClick={() => {
              setDraft({ start: new Date(checkin), end: new Date(checkout) });
              setOpenCal(true);
            }}
            className="mt-1 w-full cursor-pointer rounded-xl border border-black/10 px-3 py-2"
            required
            aria-label={t("booking.checkout")}
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

      <label htmlFor="adults" className="text-sm text-ink">
        {t("booking.adults")}
        <input
          id="adults"
          type="number"
          min="1"
          value={adults}
          onChange={(e) => setAdults(parseInt(e.target.value || "1", 10))}
          className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2"
          required
          aria-label={t("booking.adults")}
        />
      </label>

      <label htmlFor="children" className="text-sm text-ink">
        {t("booking.children")}
        <input
          id="children"
          type="number"
          min="0"
          value={children}
          onChange={(e) => setChildren(parseInt(e.target.value || "0", 10))}
          className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2"
          aria-label={t("booking.children")}
        />
      </label>

      {/* Promo toggle/field */}
      <div className="col-span-2">
        {!showPromo ? (
          <button
            type="button"
            onClick={() => setShowPromo(true)}
            aria-expanded={showPromo}
            className="text-sm text-fcd underline underline-offset-2 hover:text-accent-terracottaDark"
          >
            {t("booking.promo.toggle")}
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <label htmlFor="promo" className="col-span-2 text-sm text-ink sm:col-span-1">
              {t("booking.promo.label")}
              <input
                id="promo"
                name="promo"
                type="text"
                inputMode="text"
                autoComplete="off"
                placeholder={t("booking.promo.placeholder")}
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2"
              />
            </label>
            <div className="col-span-2 flex items-end sm:col-span-1">
              <button
                type="button"
                onClick={() => { setPromo(""); setShowPromo(false); }}
                className="text-sm text-ink/70 underline underline-offset-2 hover:text-fcd"
              >
                {t("common.cancel")}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-blob bg-fcd px-4 py-3 font-medium text-white transition hover:bg-accent-terracottaDark focus:outline-none focus:ring-4 focus:ring-terracotta/30"
        >
          {t("booking.search")}
        </button>
      </div>
    </form>
  );
}
