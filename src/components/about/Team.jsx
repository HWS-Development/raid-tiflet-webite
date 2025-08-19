import { useTranslation } from "react-i18next";

export default function Team() {
  const { t } = useTranslation();
  const members =
    t("about_page.team.members", { returnObjects: true })?.filter(Boolean) ||
    [];

  return (
    <section className="tone-ivory">
      <div className="container-grid section">
        <h2 className="display-title text-ink mb-6">
          {t("about_page.team.title", "The Team")}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {members.map((m) => (
            <article
              key={m.id}
              className="bg-white rounded-2xl border border-black/5 shadow-soft overflow-hidden transition
                         hover:-translate-y-[2px]"
            >
              <img
                src={m.photo}
                alt={m.name}
                className="h-64 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
                  <h3 className="font-semibold">{m.name}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/80">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
