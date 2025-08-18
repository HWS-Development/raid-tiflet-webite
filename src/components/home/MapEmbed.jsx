import { useTranslation } from "react-i18next";
import { safeArray } from "../../utils/safeArray";

export default function MapEmbed() {
  const { t } = useTranslation();
  const tips = safeArray(t("location.tips", { returnObjects: true }));

  return (
    <section className="py-12 sm:py-16">
      <div className="container-grid grid md:grid-cols-2 gap-6 h-72 md:h-96">
        {/* Location info */}
        <div className="bg-white rounded-2xl shadow-soft border border-black/5 p-5 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-charcoal mb-3">
            {t("location.title")}
          </h2>
          <p className="text-gray-700 leading-7 mb-3">
            {t("location.desc")}
          </p>

          {/* Address / access note */}
          <div className="text-sm text-gray-700 space-y-1 mb-4">
            {t("location.address") && <p>{t("location.address")}</p>}
            {/* Fallback to the existing hint if you want both */}
            <p>{t("contact.address_hint")}</p>
          </div>

          {/* Tips list (optional) */}
          {tips.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-brand-charcoal mb-1">{t("location.tips_title")}</h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                {tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}

          <a
            href="https://www.google.com/maps/search/?api=1&query=Riad%20Dar%20Tiflet%20Marrakech"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-terracotta text-brand-terracotta hover:bg-brand-terracotta hover:text-white transition"
          >
            {t("location.open_maps")}
            <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Map (compact) */}
        <div className="rounded-2xl overflow-hidden shadow-soft border border-black/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.1741083945108!2d-7.986508724544422!3d31.62908297416441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d963d1e87%3A0xa962511e23a1085d!2sRiad%20Dar%20Tiflet!5e0!3m2!1sen!2sma!4v1755513400252!5m2!1sen!2sma"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            title="Dar Tiflet Map"
          />
        </div>
      </div>
    </section>
  );
}
