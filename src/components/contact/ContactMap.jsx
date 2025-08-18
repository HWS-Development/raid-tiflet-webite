import { useTranslation } from "react-i18next";

export default function ContactMap() {
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl overflow-hidden border border-black/5 shadow-soft">
      <iframe
        title={t("contact_page.map_title")}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.1741083945108!2d-7.986508724544422!3d31.62908297416441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d963d1e87%3A0xa962511e23a1085d!2sRiad%20Dar%20Tiflet!5e0!3m2!1sen!2sma!4v1755513400252!5m2!1sen!2sma"
        width="100%"
        height="280"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen=""
      />
    </div>
  );
}
