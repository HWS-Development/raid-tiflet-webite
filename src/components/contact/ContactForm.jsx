// src/components/contact/ContactForm.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();
  const [data, setData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

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

  const disabledEmail = !data.name || !validEmail(data.email) || !data.message;
  const disabledWA = !data.name || !data.message;

  return (
    <section className="rounded-2xl bg-ec p-3">
      <div className="rounded-2xl border border-olive/10 bg-ec p-5 md:p-7 shadow-soft ring-1 ring-black/5">
        <header className="mb-4">
          <h2 className="font-display text-2xl text-ink">{t("contact_page.form.title")}</h2>
          <p className="mt-1 text-sm text-ink/60">{t("contact_page.form.subtitle", "We reply within 24h.")}</p>
        </header>

        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          {/* Inputs on white for readability */}
          <div>
            <label className="mb-1 block text-xs text-ink/70">{t("contact_page.form.name")}</label>
            <input name="name" value={data.name} onChange={onChange} className="w-full rounded-xl border border-olive/15 bg-white px-3 py-2 text-sm shadow-sm" required />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/70">{t("contact_page.form.email")}</label>
            <input type="email" name="email" value={data.email} onChange={onChange} placeholder="you@email.com" className="w-full rounded-xl border border-olive/15 bg-white px-3 py-2 text-sm shadow-sm" />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/70">{t("contact_page.form.phone")}</label>
            <input name="phone" value={data.phone} onChange={onChange} placeholder="+212…" className="w-full rounded-xl border border-olive/15 bg-white px-3 py-2 text-sm shadow-sm" />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/70">{t("contact_page.form.subject")}</label>
            <input name="subject" value={data.subject} onChange={onChange} placeholder={t("contact_page.form.default_subject")} className="w-full rounded-xl border border-olive/15 bg-white px-3 py-2 text-sm shadow-sm" />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs text-ink/70">{t("contact_page.form.message")}</label>
            <textarea name="message" value={data.message} onChange={onChange} className="min-h-[140px] w-full rounded-xl border border-olive/15 bg-white px-3 py-2 text-sm shadow-sm" />
          </div>

          <div className="sm:col-span-2 mt-1 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => { if (!disabledEmail) window.location.href = buildMailto(); }}
              disabled={disabledEmail}
              className={`inline-flex items-center rounded-pill px-5 py-2.5 text-sm font-medium transition
                ${disabledEmail ? "bg-ink/10 text-ink/50 cursor-not-allowed" : "bg-fcd text-white hover:bg-accent-terracottaDark shadow-soft"}`}
            >
              {t("contact_page.form.send_email")}
            </button>

            <button
              type="button"
              onClick={() => { if (!disabledWA) window.open(buildWhatsApp(), "_blank"); }}
              disabled={disabledWA}
              className={`inline-flex items-center rounded-pill px-5 py-2.5 text-sm font-medium border transition
                ${disabledWA ? "border-ink/10 text-ink/50 cursor-not-allowed" : "border-olive/30 text-ink hover:bg-ec"}`}
            >
              {t("contact_page.form.send_whatsapp")}
            </button>
          </div>

          <p className="sm:col-span-2 text-xs text-ink/60">
            {t("contact_page.form.note")}
          </p>
        </form>
      </div>
    </section>
  );
}
