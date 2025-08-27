import { useTranslation } from "react-i18next";
import CurveBand from "./ui/CurveBand";

const Icon = {
  ig: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  fb: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.7V12h2.7V9.7c0-2.6 1.6-4 3.9-4 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.8l-.45 2.9h-2.35v7A10 10 0 0 0 22 12z" />
    </svg>
  ),
  wa: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 2.4 17.6L1 23l5.6-1.4A11 11 0 0 0 20.5 3.5Zm-8.4 16.6a9.1 9.1 0 0 1-4.6-1.3l-.33-.2-3.3.8.88-3.2-.21-.34a9.1 9.1 0 1 1 7.56 4.3ZM17 14.2c-.24-.12-1.45-.71-1.67-.79-.22-.08-.37-.12-.53.12-.16.24-.61.79-.75.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.2a7.23 7.23 0 0 1-1.33-1.64c-.14-.24 0-.37.1-.49.1-.1.24-.28.36-.41.12-.13.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.27-.73-1.73-.19-.46-.38-.4-.53-.4h-.45c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.19.86 2.35.98 2.51.12.16 1.69 2.59 4.1 3.58.57.25 1.02.4 1.37.52.57.18 1.08.16 1.49.1.46-.07 1.45-.59 1.66-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  ),
};

export default function ArtFooter() {
  const { t } = useTranslation();
  const links = t("footer.links", { returnObjects: true }) || [];
  const address = t("footer.address_lines", { returnObjects: true }) || [];
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-ec">
      <CurveBand position="bottom" from="#F5EFE4" to="#556B2F" height={140} />
      {/* Curved top (paper -> palm) */}
      <div style={{ background: "#556B2F" }} >
        <div className="container-grid py-12 md:py-16 grid gap-10 md:grid-cols-[1.2fr_.8fr_.9fr]">
          {/* Brand / tagline */}
          <div>
            <h3 className="display-title text-ec mb-2">{t("footer.brand")}</h3>
            <p className="text-ec max-w-sm">{t("footer.tagline")}</p>
          </div>

          {/* Explore */}
          <nav className="text-ec">
            <h4 className="font-semibold mb-3 text-ec">{t("footer.links_title")}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <a href={l.to} className="hover:underline">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-ec">{t("footer.contact_title")}</h4>
            <address className="not-italic text-ec space-y-1">
              {address.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </address>
            <div className="mt-3 space-y-1">
              <a href={`tel:${t("footer.phone_raw")}`} className="block hover:underline">{t("footer.phone")}</a>
              <a href={`mailto:${t("footer.email")}`} className="block hover:underline">{t("footer.email")}</a>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <a
                className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                href={t("footer.instagram")}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                {Icon.ig}
              </a>
              <a
                className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                href={t("footer.facebook")}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                {Icon.fb}
              </a>
              <a
                className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                href={t("footer.whatsapp")}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                {Icon.wa}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15">
          <div className="container-grid py-4 text-sm flex flex-col sm:flex-row items-center gap-3 justify-between text-ec">
            <span>{t("footer.copyright", { year })}</span>
            <span>{t("footer.made_with_love")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
