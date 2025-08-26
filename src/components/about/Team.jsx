import { useTranslation } from "react-i18next";

/** tiny helper to get initials like “YT” or “MO” */
function initials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

/** small decorative squiggle */
function Squiggle({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M2 8c10-8 18 8 28 0s18 8 28 0 18 8 28 0c10-8 18 8 30 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-rose-500/70"
      />
    </svg>
  );
}

export default function Team() {
  const { t } = useTranslation();
  const title = t("about_page.team.title", "The Team");
  const members =
    t("about_page.team.members", { returnObjects: true })?.filter(Boolean) ||
    [];

  return (
    <section className="relative bg-ec">
      <div className="container-grid section">
        <h2 className="display-title text-ink mb-8">{title}</h2>

        {/* subtle center thread to stitch the mosaic on large screens */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />
          </div>

          <div className="space-y-14">
            {members.map((m, idx) => {
              const even = idx % 2 === 0;
              return (
                <div
                  key={m.id}
                  className={`
                    grid items-center gap-6
                    lg:grid-cols-12
                  `}
                >
                  {/* IMAGE */}
                  <div
                    className={`
                      lg:col-span-7
                      ${even ? "" : "lg:order-last"}
                    `}
                  >
                    <div
                      className={`
                        relative rounded-[28px] overflow-hidden
                        ring-1 ring-black/5 shadow-2xl
                        ${even ? "rotate-[-1.2deg]" : "rotate-[1.2deg]"}
                        bg-white
                      `}
                    >
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="h-[22rem] w-full object-cover"
                        loading="lazy"
                      />
                      {/* corner chip with initials */}
                      <span
                        className="
                          absolute -bottom-2 -right-2 bg-white text-ink/80
                          rounded-full shadow-lg ring-1 ring-black/5 px-3 py-1 text-xs font-medium
                        "
                        title={m.name}
                      >
                        {initials(m.name)}
                      </span>

                      {/* small ribbon label on the side (vertical) */}
                      <span
                        className={`
                          absolute top-3 ${
                            even ? "-left-3" : "-right-3"
                          } rotate-[-90deg]
                          bg-black/5 text-ink/60 rounded-full
                          px-2 py-1 text-[10px] uppercase tracking-wider
                        `}
                      >
                        Dar Tiflet
                      </span>
                    </div>
                  </div>

                  {/* BIO NOTE */}
                  <div
                    className={`
                      lg:col-span-5
                      ${even ? "" : "lg:order-first"}
                    `}
                  >
                    <div className="relative">
                      <Squiggle className="w-24 mb-2" />
                      <div
                        className="
                          rounded-3xl bg-white/80 backdrop-blur-sm
                          border border-black/5 shadow-soft p-5 max-w-[38rem]
                        "
                      >
                        <h3 className="font-semibold text-lg text-ink">
                          {m.name}
                        </h3>
                        <p className="mt-2 text-[15px] leading-7 text-ink/80">
                          {m.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
