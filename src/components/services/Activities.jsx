import { useTranslation } from "react-i18next";

// Two hand-drawn-ish paths (600x420 viewBox). Add more if you like.
const SHAPES = [
  // shape A — wavy top & bottom
  "M40,150 C30,90 100,40 200,50 C300,60 350,20 430,50 C510,80 560,110 570,170 C580,230 540,320 470,350 C400,380 320,395 240,380 C160,365 80,350 55,295 C30,240 50,210 40,150 Z",
  // shape B — asymmetric blob
  "M60,160 C40,90 150,30 260,45 C370,60 420,60 480,110 C540,160 580,240 540,300 C500,360 400,385 310,390 C220,395 150,380 110,335 C70,290 80,230 60,160 Z",
];

function BlobImage({ src, title, cta, shapeIndex = 0, onCta }) {
  const id = `clip-blob-${shapeIndex}-${title.replace(/\s+/g, "-")}`;

  return (
    <figure className="relative isolate blob-shadow">
      {/* SVG with clipPath to mask the image */}
      <svg
        viewBox="0 0 600 420"
        className="w-full h-auto"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            {/* Convert absolute to objectBoundingBox in a simple way via SVG transform */}
            {/* Instead, we scale the path by wrapping in a <g> that scales 1/600 and 1/420 */}
            <g transform="scale(0.0016667,0.002381)"> 
              <path d={SHAPES[shapeIndex % SHAPES.length]} />
            </g>
          </clipPath>
        </defs>

        {/* Image layer */}
        <image
          href={src}
          width="600"
          height="420"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${id})`}
          className="origin-center transition-transform duration-700 will-change-transform hover:scale-[1.03]"
        />

        {/* Soft top-to-bottom gradient for legibility */}
        <g clipPath={`url(#${id})`}>
          <rect
            x="0" y="0" width="600" height="420"
            fill="url(#overlayGradient)"
            opacity="0.85"
          />
        </g>

        {/* gradient defs */}
        <defs>
          <linearGradient id="overlayGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0.00)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Overlay content */}
      <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex gap-2">
          <span className="pointer-events-auto inline-block rounded-full bg-black/40 text-white/90 px-3 py-1 text-xs tracking-wide">
            • {title}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          {/* You can surface a short descriptor here if you like */}
          <div />

          <button
            type="button"
            onClick={onCta}
            className="pointer-events-auto rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-sm font-medium text-black hover:bg-white transition"
          >
            {cta}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

export default function ActivitiesOrganic() {
  const { t } = useTranslation();
  const activities = t("services.activities.items", { returnObjects: true }) || [];
  const cta = t("services.activities.cta", "Ask us to arrange");

  return (
    <section className="mt-8 sm:mt-10">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {activities.map((a, i) => (
          <BlobImage
            key={a.id}
            src={a.img}
            title={a.title}
            cta={cta}
            shapeIndex={i % SHAPES.length}
            onCta={() => {
              // Route to contact/WhatsApp or open modal – keep your existing action
              const wa = t("footer.whatsapp", "", { defaultValue: "" });
              if (wa) window.open(wa, "_blank", "noopener,noreferrer");
            }}
          />
        ))}
      </div>
    </section>
  );
}
