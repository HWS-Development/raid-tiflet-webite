import { useTranslation } from "react-i18next";
import CurveBand from "./ui/CurveBand";

/* Icon set — slightly thicker for better legibility on dark bg */
const Icon = {
  ig: (
    <svg
      viewBox="0 0 24 24"
      className="w-[36px] h-[36px] text-ec"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.5" cy="6.5" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  fb: (
    <svg
      viewBox="0 0 24 24"
      className="w-[36px] h-[36px] text-ec"
      fill="currentColor"
      aria-hidden
    >
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.7V12h2.7V9.7c0-2.6 1.6-4 3.9-4 1.1 0 2.2.2 2.2.2v2.5H15.3c-1.2 0-1.6.8-1.6 1.5V12h2.8l-.45 2.9h-2.35v7A10 10 0 0 0 22 12z" />
    </svg>
  ),
  wa: (
    <svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 640 640"
    fill="currentColor"
    className="block w-[36px] h-[36px] text-ec">
      <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
    </svg>
  ),
};

/* --- Social button: remove inner span; icon already has color --- */
function SocialBtn({ href, label, children }) {
  return (
    <a
      className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-white/20 bg-white/5
                 hover:bg-white/10 hover:ring-white/30 transition shadow-[0_8px_20px_rgba(0,0,0,.12)]"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-fcd/20 opacity-0 blur-md transition group-hover:opacity-100" />
      {children}
    </a>
  );
}


export default function ArtFooter() {
  const { t } = useTranslation();

  // Explore links (ensure Services / Activities / Gallery exist in i18n)
  const links = t("footer.links", { returnObjects: true }) || [];

  // Contact & relays
  const addressLines = t("footer.address_lines", { returnObjects: true }) || [];
  const mapsUrl = t("footer.maps_url");
  const emailPrimary = t("footer.email_primary", "hello@dartiflet.com");

  const phoneFR = t("footer.phone_fr_display", "+33 756 84 8934");
  const phoneFR_raw = t("footer.phone_fr_raw", "0033756848934");
  const waFR = t("footer.whatsapp_fr_link", "https://wa.me/33756848934");

  const phoneMA = t("footer.phone_ma_display", "+212 663 434 114");
  const phoneMA_raw = t("footer.phone_ma_raw", "00212663434114");
  const waMA = t("footer.whatsapp_ma_link", "https://wa.me/212663434114");

  // Social
  const instagram = t("footer.instagram");
  const facebook = t("footer.facebook_fixed"); // updated/fixed url
  // WA icon must relay FR by priority:
  const whatsappMain = waFR;

  // Optional IG preview (array of image urls)
  const igPreview = t("footer.ig_preview", { returnObjects: true }) || [];

  const year = new Date().getFullYear();

  return (
    <footer className="relative text-ec">
      <CurveBand position="bottom" from="#F5EFE4" to="#556B2F" height={140} />

      <div style={{ background: "#556B2F" }}>
        <div className="container-grid py-12 md:py-16 grid gap-10 md:grid-cols-[1.2fr_.8fr_.9fr]">

          {/* Brand / tagline */}
          <div>
            <h3 className="display-title text-ec mb-2">{t("footer.brand")}</h3>
            <p className="text-ec/95 max-w-sm">{t("footer.tagline")}</p>

            {/* Instagram preview strip */}
            {igPreview.length > 0 && (
              <div className="mt-5 grid grid-cols-6 gap-2 max-w-md">
                {igPreview.slice(0, 6).map((src, i) => (
                  <a key={i} href={instagram} target="_blank" rel="noreferrer"
                     className="aspect-square overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 hover:ring-white/20">
                    <img src={src} alt="" className="h-full w-full object-cover transition duration-300 hover:scale-[1.04]" loading="lazy" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Explore */}
          <nav className="text-ec">
            <h4 className="text-2xl text-ec mb-3">{t("footer.links_title")}</h4>
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
            <h4 className="text-2xl text-ec mb-3">{t("footer.contact_title")}</h4>

            {/* Address (link to Google Maps) */}
            <address className="not-italic text-ec/95">
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="hover:underline">
                {addressLines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </a>
            </address>

            {/* Phones with WhatsApp relays */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <a href={`tel:${phoneFR_raw}`} className="hover:underline">{phoneFR}</a>
                <a href={waFR} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-1 text-xs pl-1 pr-2 py-0 rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15">
                  {Icon.wa}<span>WhatsApp</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a href={`tel:${phoneMA_raw}`} className="hover:underline">{phoneMA}</a>
                <a href={waMA} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-1 ml-1 text-xs pl-1 pr-2 py-0 rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15">
                  {Icon.wa}<span>WhatsApp</span>
                </a>
              </div>
              <a href={`mailto:${emailPrimary}`} className="block hover:underline mt-1">
                {emailPrimary}
              </a>
            </div>

            {/* Socials — more attractive round badges */}
            <div className="flex items-center gap-3 mt-5">
              <SocialBtn href={instagram} label="Instagram">{Icon.ig}</SocialBtn>
              <SocialBtn href={facebook} label="Facebook">{Icon.fb}</SocialBtn>
              {/* Must relay FR by priority */}
              <SocialBtn href={whatsappMain} label="WhatsApp">{Icon.wa}</SocialBtn>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15">
          <div className="container-grid py-4 text-sm flex flex-col sm:flex-row items-center gap-3 justify-between text-ec/95">
            <span>{t("footer.copyright", { year })}</span>
            <span>{t("footer.made_with_love")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
