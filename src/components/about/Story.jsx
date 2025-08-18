import { useTranslation } from "react-i18next";
import { safeArray } from "../../utils/safeArray";

export default function Story() {
  const { t } = useTranslation();

  const paras = safeArray(t("about_page.story.paragraphs", { returnObjects: true }));
  const bullets = safeArray(t("about_page.story.heritage", { returnObjects: true }));

  return (
    <section className="py-8 sm:py-10">
      <div className="container-grid grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-charcoal">
            {t("about_page.story.title")}
          </h2>
          <div className="mt-4 space-y-4 text-sm sm:text-base text-gray-800">
            {paras.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        <aside className="bg-white rounded-2xl border border-black/5 shadow-soft p-5">
          <div className="text-sm font-semibold text-brand-charcoal">
            {t("about_page.story.heritage_title")}
          </div>
          <ul className="mt-3 space-y-2 text-sm text-gray-800">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
