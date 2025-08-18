// src/components/contact/ContactForm.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const onChange = (e) => setData((s) => ({ ...s, [e.target.name]: e.target.value }));
  const validEmail = (v) => /\S+@\S+\.\S+/.test(v);

  const buildMailto = () => {
    const to = encodeURIComponent(t("footer.email"));
    const subject = encodeURIComponent(data.subject || t("contact_page.form.default_subject"));
    const body = encodeURIComponent(
      `${data.message}

— ${t("contact_page.form.from")} ${data.name || "Guest"}
${data.email ? `\n${t("contact_page.form.email")}: ${data.email}` : ""}
${data.phone ? `\n${t("contact_page.form.phone")}: ${data.phone}` : ""}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const buildWhatsApp = () => {
    const base = t("footer.whatsapp");
    const text = encodeURIComponent(
      `${data.subject || t("contact_page.form.default_subject")}

${data.message}

— ${t("contact_page.form.from")} ${data.name || "Guest"}
${data.email ? `\n${t("contact_page.form.email")}: ${data.email}` : ""}
${data.phone ? `\n${t("contact_page.form.phone")}: ${data.phone}` : ""}`
    );
    return `${base}${base.includes("?") ? "&" : "?"}text=${text}`;
  };

  const sendEmail = () => {
    if (!data.name || !validEmail(data.email) || !data.message) return;
    window.location.href = buildMailto();
  };
  const sendWhatsApp = () => {
    if (!data.name || !data.message) return;
    window.open(buildWhatsApp(), "_blank");
  };

  const disabledEmail = !data.name || !validEmail(data.email) || !data.message;
  const disabledWA = !data.name || !data.message;

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-soft p-5 md:p-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-brand-charcoal">
        {t("contact_page.form.title")}
      </h2>

      <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="sm:col-span-1">
          <label className="block text-xs text-gray-600 mb-1">{t("contact_page.form.name")}</label>
          <input name="name" value={data.name} onChange={onChange}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm" required />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs text-gray-600 mb-1">{t("contact_page.form.email")}</label>
          <input type="email" name="email" value={data.email} onChange={onChange}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm" placeholder="you@email.com" />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs text-gray-600 mb-1">{t("contact_page.form.phone")}</label>
          <input name="phone" value={data.phone} onChange={onChange}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm" placeholder="+212…" />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs text-gray-600 mb-1">{t("contact_page.form.subject")}</label>
          <input name="subject" value={data.subject} onChange={onChange}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm" placeholder={t("contact_page.form.default_subject")} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-600 mb-1">{t("contact_page.form.message")}</label>
          <textarea name="message" value={data.message} onChange={onChange}
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm min-h-[140px]" />
        </div>

        <div className="sm:col-span-2 flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={sendEmail}
            disabled={disabledEmail}
            className={`inline-flex px-4 py-2 rounded-xl transition ${
              disabledEmail
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-brand-terracotta text-white hover:bg-brand-terracottaDark"
            }`}
          >
            {t("contact_page.form.send_email")}
          </button>

          <button
            type="button"
            onClick={sendWhatsApp}
            disabled={disabledWA}
            className={`inline-flex px-4 py-2 rounded-xl border transition ${
              disabledWA
                ? "text-gray-500 border-gray-200 cursor-not-allowed"
                : "text-brand-charcoal border-black/10 hover:bg-brand-ivory"
            }`}
          >
            {t("contact_page.form.send_whatsapp")}
          </button>
        </div>

        <p className="sm:col-span-2 text-xs text-gray-500">
          {t("contact_page.form.note")}
        </p>
      </form>
    </div>
  );
}
