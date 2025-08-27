import { useTranslation } from "react-i18next";
import CurveBand from "../ui/CurveBand";

/**
 * Equal-height award cards, calmer headline, and an “art panel” field.
 * - all cards share the same vertical rhythm (logo area / score / label)
 * - object-contain keeps different logos tidy
 * - soft inner panel (like paper) sits on the sage band
 * - subtle ribbon and hover lift for personality
 */
export default function RatingsAwards() {
  const { t } = useTranslation();
  const items = t("ratings.items", { returnObjects: true }) || [];
  if (!items.length) return null;

  return (
    <section className="relative bg-white/55">
      {/* Sage band with waves */}
      <div className="relative bg-chb pb-6 md:pb-8 overflow-hidden">
        {/* <CurveBand position="bottom" from="#F6F1E8" to="#DCE5D9" height={120} /> */}

        {/* “paper” field */}
        <div className="container-grid relative z-10">
          <div className="rounded-[36px] bg-white/55 backdrop-blur-sm ring-1 ring-black/5 shadow-soft">
            {/* header */}
            <div className="px-6 py-7 sm:px-8">
              <div className="inline-flex items-baseline gap-3">
                <h2 className="display-title text-ink/90 leading-tight">
                  {t("ratings.title", "Loved by Guests")}
                </h2>
                <span
                  aria-hidden
                  className="mt-2 h-[6px] w-16 rounded-full bg-rose-400/70"
                />
              </div>
              <p className="mt-1 text-[15px] text-ink/70">
                {t(
                  "ratings.subtitle",
                  "Independent ratings & awards — proof that the charm is real."
                )}
              </p>
            </div>

            {/* grid of equal-height cards */}
            <ul className="grid justify-around gap-5 sm:grid-cols-2 lg:grid-cols-2 px-4 pb-6 sm:px-6 md:px-28">
              {items.map((b) => (
                <li className="" key={b.id}>
                  <article
                    className="group relative rounded-[28px] bg-white
                               ring-1 ring-black/5 shadow-soft p-5
                               transition-transform hover:-translate-y-1 hover:shadow-xl
                               flex md:flex-row flex-col  items-center justify-between
                               min-h-[220px] md:min-h-[240px] max-w-[30rem]"
                  >
                    {/* ribbon */}
                    {/* <span className="absolute -top-2 left-5 rounded-full bg-rose-500 text-white
                                     px-2 py-[2px] text-[10px] uppercase tracking-wide shadow">
                      {b.year || t("ratings.badge", "Award")}
                    </span> */}

                    {/* logo area (fixed) */}
                    <div className="">
                      <div className="h-24 md:h-28 flex items-center">
                        <img
                          src={b.src}
                          alt={b.alt}
                          loading="lazy"
                          className="max-h-28 md:max-h-52 object-contain mix-blend-multiply
                                     transition-transform group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                    <div>

                      {/* score (fixed line-height) */}
                      {b.score ? (
                        <div className="mt-3 text-2xl font-semibold text-ink tabular-nums">
                          {b.score}
                        </div>
                      ) : (
                        <div className="mt-3 h-7" /> // keeps vertical rhythm when no score
                      )}

                      {/* label (single line clamp for consistency) */}
                      <div className="mt-1 text-sm text-ink/70 line-clamp-1">
                        {b.label}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* soft waves under the panel */}
        {/* <CurveBand position="bottom" from="#DCE5D9" to="#F6F1E8" height={140} /> */}
      </div>
    </section>
  );
}
