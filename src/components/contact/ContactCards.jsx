// src/components/contact/ContactCards.jsx
import { useTranslation } from "react-i18next";

export default function ContactCards() {
  const { t } = useTranslation();

  const items = [
    {
      id: "phone",
      title: t("contact_page.cards.phone"),
      href: `tel:${t("footer.phone_raw")}`,
      label: t("footer.phone"),
      icon: "📞",
    },
    {
      id: "email",
      title: t("contact_page.cards.email"),
      href: `mailto:${t("footer.email")}`,
      label: t("footer.email"),
      icon: "✉️",
    },
    {
      id: "whatsapp",
      title: t("contact_page.cards.whatsapp"),
      href: t("footer.whatsapp"),
      label: t("footer.whatsapp"),
      icon: "💬",
    },
    {
      id: "address",
      title: t("contact_page.cards.address"),
      href: "https://maps.google.com/?q=Riad%20Dar%20Tiflet%2C%20Marrakech",
      label: `${t("footer.address_lines.0")}, ${t("footer.address_lines.1")}, ${t("footer.address_lines.2")}`,
      icon: "📍",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-soft p-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((it) => (
          <a
            key={it.id}
            href={it.href}
            target={it.id === "address" || it.id === "whatsapp" ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-start gap-3 rounded-xl border border-black/10 hover:border-brand-terracotta/50 bg-brand-ivory p-4 transition"
          >
            <div className="text-xl">{it.icon}</div>
            <div>
              <div className="text-sm font-semibold text-brand-charcoal">{it.title}</div>
              <div className="text-sm text-gray-700">{it.label}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
