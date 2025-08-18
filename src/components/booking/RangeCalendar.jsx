import { useEffect, useMemo, useState } from "react";

const DAY = 86400000;
const sod = (d) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
const same = (a,b) => a && b && sod(a).getTime() === sod(b).getTime();
const before = (a,b) => sod(a).getTime() < sod(b).getTime();
const addMonths = (d,m) => { const x=new Date(d); x.setMonth(x.getMonth()+m); return x; };
const dim = (y,m) => new Date(y,m+1,0).getDate();
const monthLabel = (d, locale) => d.toLocaleDateString(locale, { month:"long", year:"numeric" });

/**
 * Props:
 *  - value: { start: Date|null, end: Date|null }
 *  - onChange(next)
 *  - onComplete(next)  // called when END is picked
 *  - minDate, locale, startWeekOnMonday
 */
export default function RangeCalendar({
  value,
  onChange,
  onComplete,
  minDate = new Date(),
  locale = "en",
  startWeekOnMonday = true,
}) {
  const today = useMemo(() => sod(minDate), [minDate]);
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [hovered, setHovered] = useState(null);

  const start = value?.start ? sod(value.start) : null;
  const end   = value?.end ? sod(value.end) : null;

  // Build weekday labels
  const weekdays = useMemo(() => {
    const arr = [];
    for (let i=0;i<7;i++){
      const d = new Date(2020, 10, i+1);
      arr.push(d.toLocaleDateString(locale, { weekday:"short" }).slice(0,2));
    }
    return startWeekOnMonday ? [...arr.slice(1), arr[0]] : arr;
  }, [locale, startWeekOnMonday]);

  // Month grid (fixed 6 weeks = 42 cells)
  const cells = useMemo(() => {
    const y = month.getFullYear(), m = month.getMonth();
    const first = new Date(y,m,1);
    const lead = (first.getDay() + (startWeekOnMonday ? 6 : 0)) % 7;
    const dInM = dim(y,m);
    const prevLast = new Date(y,m,0).getDate();
    const out = [];
    for (let i=lead-1;i>=0;i--) out.push({ date: new Date(y, m-1, prevLast - i), outside:true });
    for (let d=1; d<=dInM; d++) out.push({ date: new Date(y, m, d), outside:false });
    while (out.length < 42) {
      const d = new Date(y, m, dInM + (out.length - (lead + dInM)) + 1);
      out.push({ date: d, outside:true });
    }
    return out;
  }, [month, startWeekOnMonday]);

  // Range + preview
  const hasPreview = !!(start && !end && hovered);
  const inFinalRange = (d) => (start && end) && sod(d) >= start && sod(d) <= end;
  const inPreviewRange = (d) => {
    if (!hasPreview) return false;
    const a = start, b = sod(hovered);
    const lo = before(a,b) ? a : b;
    const hi = before(a,b) ? b : a;
    return sod(d) >= lo && sod(d) <= hi;
  };

  const disabled = (d) => sod(d) < today;

  const handlePick = (d) => {
    if (disabled(d)) return;
    const day = sod(d);

    // 1st pick or reset
    if (!start || (start && end)) {
      onChange?.({ start: day, end: null });
      setHovered(null);
      return;
    }
    // 2nd pick
    const next = before(day, start) ? { start: day, end: start } : { start, end: day };
    onChange?.(next);
    onComplete?.(next); // << return the final range to the parent
    setHovered(null);
  };

  // If user already has a range, show that month
  useEffect(() => {
    const target = value?.end || value?.start;
    if (!target) return;
    const m = new Date(target.getFullYear(), target.getMonth(), 1);
    setMonth(m);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.end && value?.start]);

  return (
    <div className="w-[280px] sm:w-[340px] bg-white rounded-2xl border border-black/10 shadow-soft p-3 select-none">
    {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setMonth(addMonths(month,-1))}
          className="w-8 h-8 rounded-full hover:bg-brand-ivory"
          aria-label="Previous month"
        >‹</button>
        <div className="text-sm font-semibold">{monthLabel(month, locale)}</div>
        <button
          onClick={() => setMonth(addMonths(month,1))}
          className="w-8 h-8 rounded-full hover:bg-brand-ivory"
          aria-label="Next month"
        >›</button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-[11px] text-gray-500 mb-1">
        {weekdays.map(w => <div key={w} className="text-center py-1">{w}</div>)}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map(({ date, outside }, i) => {
          const day = sod(date);
          const dis = disabled(day);
          const isStart = start && same(day, start);
          const isEnd   = end && same(day, end);
          const inRange = inFinalRange(day);
          const inPrev  = inPreviewRange(day);

          let cls = "h-9 rounded-lg text-sm flex items-center justify-center transition";
          if (dis) cls += " text-gray-300 cursor-not-allowed";
          else if (isStart || isEnd) cls += " text-white bg-brand-terracotta";
          else if (inRange || inPrev) cls += " bg-brand-terracotta/15";
          else cls += " hover:bg-brand-ivory";
          if (outside) cls += " text-gray-400";

          return (
            <button
              key={i}
              type="button"
              disabled={dis}
              onClick={() => handlePick(day)}
              onMouseEnter={() => setHovered(day)}
              onMouseLeave={() => setHovered(null)}
              className={cls}
              aria-pressed={isStart || isEnd || inRange || inPrev}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Footer helper */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
        <span>
          {start ? start.toLocaleDateString(locale) : "—"} · {end ? end.toLocaleDateString(locale) : "—"}
        </span>
        <span>
          {start && end ? Math.max(1, Math.round((end - start)/DAY)) + " nights"
           : hasPreview ? Math.max(1, Math.round((sod(hovered) - start)/DAY)) + " nights"
           : ""}
        </span>
      </div>
    </div>
  );
}
