import { useTranslation } from "react-i18next";

const FALLBACK =
  "/images/Screenshot 2025-11-24 161347.png";

export default function AboutHero({ src = FALLBACK }) {
  const { t } = useTranslation();

  return (
    <header className="relative h-[40vh] min-h-[220px] md:h-[65vh] w-full overflow-hidden">
      <img
        src={src}
        alt={t("about_page.title", "About")}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />

      {/* warm overlay */}
      <div className="absolute inset-0 bg-black/20 bg-[linear-gradient(180deg,rgba(16,41,34,.35)_0%,rgba(16,41,34,.45)_60%,rgba(16,41,34,.55)_100%)]" />

      <div className="relative z-10 h-full container-grid flex items-end pb-10">
        <div>
          <h1 className="display-title text-white text-4xl md:text-5xl drop-shadow">
            {t("about_page.title", "About")}
          </h1>
          <p className="mt-2 text-white/90">
            {t(
              "about_page.subtitle",
              "A traditional Berber house with a living soul."
            )}
          </p>
        </div>
      </div>
    </header>
  );
}
