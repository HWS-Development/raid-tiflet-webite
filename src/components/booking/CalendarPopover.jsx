import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import RangeCalendar from "./RangeCalendar";

export default function CalendarPopover({
  open,
  onClose,
  anchorRef,       // ref to the div wrapping both date inputs
  value,
  onChange,
  onComplete,
  locale = "en",
  minDate = new Date(),
}) {
  if (!open) return null;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  if (isMobile) {
    // Bottom sheet on small screens
    return createPortal(
      <div className="fixed inset-0 z-[90]">
        <button className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close" />
        <div
          className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl p-4 pb-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Select dates</span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-black/5"
              aria-label="Close"
            >✕</button>
          </div>
          <RangeCalendar
            value={value}
            onChange={onChange}
            onComplete={(r) => { onComplete?.(r); }}
            locale={locale}
            minDate={minDate}
            startWeekOnMonday
          />
        </div>
      </div>,
      document.body
    );
  }

  // Desktop: anchored popover positioned via portal
  return <AnchoredPanel
    open={open}
    onClose={onClose}
    anchorRef={anchorRef}
    locale={locale}
    minDate={minDate}
    value={value}
    onChange={onChange}
    onComplete={onComplete}
  />;
}

function AnchoredPanel({ open, onClose, anchorRef, value, onChange, onComplete, locale, minDate }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const panelRef = useRef(null);

  const compute = () => {
    const anchor = anchorRef?.current;
    if (!anchor) return;
    const r = anchor.getBoundingClientRect();
    const W = 340;        // calendar width
    const H = 360;        // approx. height
    let left = r.left;
    let top = r.bottom + 8;

    // keep within viewport
    const vw = window.innerWidth, vh = window.innerHeight;
    if (left + W > vw - 8) left = vw - 8 - W;
    if (left < 8) left = 8;
    if (top + H > vh - 8) top = r.top - 8 - H; // flip above if not enough space

    setPos({ top, left });
  };

  useEffect(() => {
    compute();
    const onEsc = (e) => e.key === "Escape" && onClose();
    const onWin = () => compute();
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, true);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin, true);
      window.removeEventListener("keydown", onEsc);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return createPortal(
    <div className="fixed inset-0 z-[90]">
      <button className="absolute inset-0" onClick={onClose} aria-label="Close outside" />
      <div
        ref={panelRef}
        className="absolute"
        style={{ top: pos.top, left: pos.left }}
        onClick={(e) => e.stopPropagation()}
      >
        <RangeCalendar
          value={value}
          onChange={onChange}
          onComplete={(r) => { onComplete?.(r); }}
          locale={locale}
          minDate={minDate}
          startWeekOnMonday
        />
      </div>
    </div>,
    document.body
  );
}
