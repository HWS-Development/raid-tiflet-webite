import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function SocialIcon({ type }) {
  const common = "w-5 h-5";
  switch (type) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7m9.75 2.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path fill="currentColor" d="M22 12.06C22 6.504 17.523 2 12 2S2 6.504 2 12.06C2 17.08 5.657 21.206 10.438 22v-7.02H7.898v-2.92h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.47h-1.261c-1.243 0-1.63.776-1.63 1.571v1.889h2.773l-.443 2.92h-2.33V22C18.343 21.206 22 17.08 22 12.06Z"/>
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path fill="currentColor" d="M20 3.9A10 10 0 0 0 2.1 16.7L2 22l5.4-1.9A10 10 0 1 0 20 3.9m-8 16.3a8.3 8.3 0 0 1-4.2-1.1l-.3-.2-3.2 1.1.9-3.1-.2-.3a8.4 8.4 0 1 1 7 3.6m4.6-6.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1a6.8 6.8 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.8c-.2-.3 0-.5.1-.7l.3-.4.2-.4c.1-.2 0-.4 0-.5L9 8.4c-.1-.4-.3-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.7.6-1 1.5-1 2.5 0 .3 0 .6.2 1 .4 1 .9 1.8 1.7 2.6a8.3 8.3 0 0 0 3.2 2.1c.4.2.8.2 1.1.2.4 0 .8 0 1.2-.3.4-.2 1.1-.8 1.3-1.3.2-.5.2-1 .1-1.1 0-.2-.2-.2-.4-.3Z"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const { t } = useTranslation();
  const links = t("footer.links", { returnObjects: true }) || [];
  const address = t("footer.address_lines", { returnObjects: true }) || [];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-brand-ivory border-t border-black/10 text-brand-charcoal">
      <div className="container-grid py-8 sm:py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              {/* If you have a real logo file, replace src below */}
              <img
                src="/logo.svg"
                alt={t("footer.brand")}
                className="w-9 h-9 object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <span className="text-lg font-semibold">{t("footer.brand")}</span>
            </div>
            <p className="mt-2 text-sm text-gray-700 max-w-xs">{t("footer.tagline")}</p>
          </div>

          {/* Explore */}
          <nav aria-label={t("footer.links_title")}>
            <div className="text-sm font-semibold mb-2">{t("footer.links_title")}</div>
            <ul className="space-y-2 text-sm">
              {links.map((l) =>
                l.to?.startsWith("http") ? (
                  <li key={l.to}>
                    <a href={l.to} className="hover:text-brand-terracotta transition" target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-brand-terracotta transition">
                      {l.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Contact + socials */}
          <div>
            <div className="text-sm font-semibold mb-2">{t("footer.contact_title")}</div>
            <address className="not-italic text-sm text-gray-800 space-y-1">
              {address.map((line, i) => <div key={i}>{line}</div>)}
              <div>
                <a href={`tel:${t("footer.phone_raw")}`} className="hover:text-brand-terracotta transition">
                  {t("footer.phone")}
                </a>
              </div>
              <div>
                <a href={`mailto:${t("footer.email")}`} className="hover:text-brand-terracotta transition">
                  {t("footer.email")}
                </a>
              </div>
            </address>

            <div className="mt-3 flex items-center gap-3">
              {t("footer.instagram") && (
                <a
                  href={t("footer.instagram")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-black/10 text-brand-charcoal hover:text-brand-terracotta transition"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <SocialIcon type="instagram" />
                </a>
              )}
              {t("footer.facebook") && (
                <a
                  href={t("footer.facebook")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-black/10 text-brand-charcoal hover:text-brand-terracotta transition"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <SocialIcon type="facebook" />
                </a>
              )}
              {t("footer.whatsapp") && (
                <a
                  href={t("footer.whatsapp")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-black/10 text-brand-charcoal hover:text-brand-terracotta transition"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <SocialIcon type="whatsapp" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/10">
        <div className="container-grid py-4 text-xs text-gray-600">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>{t("footer.copyright", { year })}</span>
            <span className="text-gray-500">{t("footer.made_with_love")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
