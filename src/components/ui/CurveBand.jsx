export default function CurveBand({
    position = "bottom",      // "top" | "bottom"
    from = "#DCE5D9",         // color of the current section
    to = "#F6F1E8",           // color of the next section
    height = 140              // curve height in px (make it big so it shows)
  }) {
    const rotate = position === "top" ? "rotate-180" : "";
    return (
      <div className={`pointer-events-none select-none relative w-full ${position === "top" ? "mt-[-1px]" : ""}`}>
        <svg
          className={`block w-full ${rotate}`}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height }}
          aria-hidden="true"
        >
          {/* background of the band (the section you are leaving) */}
          <rect x="0" y="0" width="1440" height="320" fill={from} />
          {/* the actual curve shape to the next section */}
          <path
            fill={to}
            d="M0,96 C240,10 480,180 720,110 C960,40 1200,160 1440,96 L1440,320 L0,320 Z"
          />
        </svg>
      </div>
    );
  }
  