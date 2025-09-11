// src/components/about/Team.jsx
import { useTranslation } from "react-i18next";

export default function Team() {
  const { t } = useTranslation();
  const title = t("about_page.team.title", "The Team");
  const members =
    t("about_page.team.members", { returnObjects: true })?.filter(Boolean) || [];

  return (
    <section className="relative bg-ec">
      <div className="container-grid section">
        <h2 className="display-title text-ink mb-8">{title}</h2>

        {/* NOTE: center stitch line REMOVED */}
        <div className="space-y-16">
          {members.map((m, idx) => {
            const even = idx % 2 === 0;

            return (
              <article
                key={m.id || m.name || idx}
                className="grid items-center gap-8 lg:grid-cols-12"
              >
                {/* IMAGE — consistent orientation (no rotate differences) */}
                <div className={`${even ? "" : "lg:order-2"} lg:col-span-5`}>
                  <div className="relative">
                    {/* soft washes for warmth */}
                    <div className="pointer-events-none absolute -left-10 -top-6 h-24 w-24 rounded-full bg-fcd/22 blur-2xl" />
                    <div className="pointer-events-none absolute -right-10 -bottom-6 h-24 w-24 rounded-full bg-olive/18 blur-2xl" />

                    {/* IMPORTANT: rotate-0 on EVERY card */}
                    <figure className="relative overflow-hidden rounded-2xl ring-1 ring-ink/10 shadow-2xl bg-ec rotate-0">
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="h-56 md:h-64 lg:h-60 xl:h-64 w-full object-cover"
                        loading="lazy"
                      />
                    </figure>
                  </div>
                </div>

                {/* TEXT */}
                <div className={`${even ? "" : "lg:order-1"} lg:col-span-7`}>
                  <div className="max-w-[32rem]">
                    <h3 className="font-display text-[1.6rem] md:text-[1.75rem] font-semibold text-ink">
                      {m.name}
                    </h3>
                    {m.role ? (
                      <div className="mt-1 text-sm font-medium text-olive/80">
                        {m.role}
                      </div>
                    ) : null}
                    <p className="mt-3 text-[15px] leading-7 text-ink/80">
                      {m.bio}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
