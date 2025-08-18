import { useTranslation } from "react-i18next";

export default function ReserveBlock() {
  const { t } = useTranslation();
  return (
    <section className="py-10 sm:py-12">
      <div className="container-grid">
        <div className="bg-white rounded-2xl shadow-soft border border-black/5 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-brand-charcoal">
              {t("dining_page.reserve_title")}
            </h4>
            <p className="text-sm text-gray-700 mt-1">{t("dining_page.reserve_note")}</p>
          </div>
          <div className="flex gap-3">
            <a
              href={t("dining_page.reserve_link")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex px-4 py-2 rounded-xl bg-brand-terracotta text-white hover:bg-brand-terracottaDark transition"
            >
              {t("dining_page.cta_reserve")}
            </a>
            <a
              href="/contact"
              className="inline-flex px-4 py-2 rounded-xl border border-black/10 text-brand-charcoal hover:bg-brand-ivory transition"
            >
              {t("dining_page.cta_contact")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
