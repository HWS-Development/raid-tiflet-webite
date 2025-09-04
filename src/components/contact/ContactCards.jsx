// src/components/contact/ContactCards.jsx
import { useTranslation } from "react-i18next";

function Icon({ name, className = "" }) {
  const paths = {
    phone: "M6.6 2h2.8c.5 0 .9.3 1 .8l.5 3a1 1 0 01-.3.9l-1.6 1.6a12.6 12.6 0 005.7 5.7l1.6-1.6a1 1 0 01.9-.3l3 .5c.5.1.8.5.8 1v2.8c0 .6-.5 1-1.1 1A18.9 18.9 0 012 7.1C2 6.5 2.4 6 3 6h0z",
    email: "M3 6h18v12H3z M3 6l9 7 9-7",
    wa: "M12 3a9 9 0 100 18 9 9 0 000-18zm-1.1 5.7l.8 2.1a6.3 6.3 0 003 3l2.1.8.7-1.6c.1-.3 0-.7-.3-.9l-1.2-.8c-.3-.2-.7-.2-1 0l-.5.4a5.4 5.4 0 01-2.4-2.4l.4-.5c.2-.3.2-.7 0-1l-.8-1.2c-.2-.3-.6-.4-.9-.3l-1.6.7z",
    pin: "M12 21s7-7 7-11a7 7 0 10-14 0c0 4 7 11 7 11zm0-9a2 2 0 110-4 2 2 0 010 4z"
  };
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}

export default function ContactCards() {
  const { t } = useTranslation();
  const items = [
    { id: "phone", title: t("contact_page.cards.phone"), href: `tel:${t("footer.phone_raw")}`, label: t("footer.phone"), icon: "phone" },
    { id: "email", title: t("contact_page.cards.email"), href: `mailto:${t("footer.email")}`, label: t("footer.email"), icon: "email" },
    { id: "whatsapp", title: t("contact_page.cards.whatsapp"), href:`https://wa.me/${t("footer.phone_fr_raw")}`, label: t("footer.phone"), icon: "wa" },
    { id: "address", title: t("contact_page.cards.address"), href: "https://maps.google.com/?q=Riad%20Dar%20Tiflet%2C%20Marrakech", label: `${t("footer.address_lines.0")}, ${t("footer.address_lines.1")}, ${t("footer.address_lines.2")}`, icon: "pin" }
  ];

  return (
    <section className="rounded-2xl bg-ec p-3">
      <div className="rounded-2xl border border-olive/10 bg-ec p-4 shadow-soft ring-1 ring-black/5">
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((it) => (
            <a
              key={it.id}
              href={it.href}
              target={it.id === "address" || it.id === "whatsapp" ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-olive/10 bg-white/90 p-4 shadow-sm transition hover:shadow-md hover:border-olive/30"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-olive/10 text-fcd ring-1 ring-olive/15">
                <Icon name={it.icon} />
              </span>
              <div>
                <div className="text-sm font-semibold text-ink">{it.title}</div>
                <div className="text-sm text-ink/70 group-hover:text-ink/90">{it.label}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
