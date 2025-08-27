import { useTranslation } from "react-i18next";

/** helper to get initials */
// function initials(name = "") {
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 3)
//     .toUpperCase();
// }

export default function Team() {
  const { t } = useTranslation();
  const title = t("about_page.team.title", "The Team");
  const members =
    t("about_page.team.members", { returnObjects: true })?.filter(Boolean) ||
    [];

  return (
    <section className="relative bg-ec">
      <div className="container-grid section">
        <h2 className="display-title text-ink mb-6">{title}</h2>

        <div className="relative">
          {/* center stitching line on large screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />
          </div>

          <div className="space-y-20">
            {members.map((m, idx) => {
              const even = idx % 2 === 0;
              return (
                <div
                  key={m.id}
                  className="grid items-center gap-8 lg:grid-cols-12"
                >
                  {/* IMAGE */}
                  <div
                    className={`lg:col-span-7 ${
                      even ? "" : "lg:order-last"
                    }`}
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
                      {/* <span
                        className="
                          absolute -bottom-2 -right-2 bg-white text-ink/80
                          rounded-full shadow-lg ring-1 ring-black/5 px-3 py-1 text-xs font-medium
                        "
                        title={m.name}
                      >
                        {initials(m.name)}
                      </span> */}

                      {/* small ribbon label */}
                      {/* <span
                        className={`
                          absolute top-3 ${
                            even ? "-left-3" : "-right-3"
                          } rotate-[-90deg]
                          bg-black/5 text-ink/60 rounded-full
                          px-2 py-1 text-[10px] uppercase tracking-wider
                        `}
                      >
                        Dar Tiflet
                      </span> */}
                    </div>
                  </div>

                  {/* BIO NOTE */}
                  <div
                    className={`lg:col-span-5 ${
                      even ? "" : "lg:order-first"
                    }`}
                  >
                    <div className="max-w-[36rem]">
                      {/* Removed squiggle + white card */}
                      <h3 className="font-display text-2xl font-semibold text-ink">
                        {m.name}
                      </h3>
                      <p className="mt-3 text-[15px] leading-7 text-ink/80">
                        {m.bio}
                      </p>
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
