import { useTranslation } from "react-i18next";

export default function MapBlock() {
  const { t } = useTranslation();

  return (
    <section className="py-10 sm:py-12">
      <div className="container-grid grid lg:grid-cols-2 gap-8 items-start">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-black/5 shadow-soft">
          <iframe
            title="Dar Tiflet location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.1741083945108!2d-7.986508724544422!3d31.62908297416441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d963d1e87%3A0xa962511e23a1085d!2sRiad%20Dar%20Tiflet!5e0!3m2!1sen!2sma!4v1755513400252!5m2!1sen!2sma"
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen=""
          />
        </div>

        {/* Info */}
        <aside>
          <h3 className="text-xl sm:text-2xl font-semibold text-brand-charcoal">
            {t("about_page.map.title")}
          </h3>
          <p className="mt-2 text-gray-700">{t("about_page.map.body")}</p>

          <div className="mt-4 bg-white rounded-2xl border border-black/5 shadow-soft p-4 text-sm text-gray-800">
            <div>{t("footer.address_lines.0")}</div>
            <div>{t("footer.address_lines.1")}</div>
            <div>{t("footer.address_lines.2")}</div>
            <div className="mt-2">
              <a href={`tel:${t("footer.phone_raw")}`} className="hover:text-brand-terracotta transition">
                {t("footer.phone")}
              </a>
              {" · "}
              <a href={`mailto:${t("footer.email")}`} className="hover:text-brand-terracotta transition">
                {t("footer.email")}
              </a>
            </div>
            <div className="mt-3">
              <a
                href="https://maps.google.com/?q=Riad%20Dar%20Tiflet%2C%20Marrakech"
                target="_blank"
                rel="noreferrer"
                className="inline-flex px-3 py-2 rounded-xl bg-brand-terracotta text-white hover:bg-brand-terracottaDark transition"
              >
                {t("about_page.map.cta")}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
