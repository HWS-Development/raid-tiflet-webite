import { useTranslation } from "react-i18next";
import CurveBand from "../ui/CurveBand";

/**
 * RoomsHero
 * - Micro-hero (not full screen) with a soft green tint over the photo
 * - Waves/curve into the page using your CurveBand component
 * - i18n title & legend
 *
 * Props:
 *   image?: {
 *     avif?: string; webp?: string; jpg?: string;   // preferred (srcset-ready)
 *     alt?: string;
 *   } | string                                   // or a single URL
 *   height?: string                               // tailwind height classes (default responsive)
 *   overlay?: string                              // rgba() tint (default: green at 35%)
 */
export default function RoomsHero({
  height = "h-[32vh] min-h-[220px] md:h-[42vh]",
  overlay = "rgba(15,91,74,0.35)",
}) {
  const { t, } = useTranslation();


  return (
    <section className="relative isolate">
      <div className={`relative overflow-hidden ${height}`}>
        {/* Photo */}
        <picture>
          <img
            src={'/images/room_hero.png'}
            alt={'hero image'}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchpriority="high"
            sizes="100vw"
          />
        </picture>

        {/* Soft tint + gentle top-to-bottom gradient for legibility */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: overlay }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
          aria-hidden
        />

        {/* Copy */}
        <div className="relative z-10 h-full">
          <div className="container-grid h-full flex items-end pb-6 md:pb-8">
            <div className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.4)]">
              <h1 className="display-title text-white">
                {t("rooms.title")}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Curve into the page (hero → ivory content) */}
      {/* If you see a hard edge on some screens, set `from` to '#0f5b4a14'. */}
      <CurveBand position="bottom" from="transparent" to="#F6F1E8" height={120} />
    </section>
  );
}
