// components/gallery/GalleryHero.jsx
import { useTranslation } from "react-i18next";
import CurveBand from "../ui/CurveBand";

export default function GalleryHero() {
  const { t } = useTranslation();
  return (
    <section className="relative h-[42vh] min-h-[320px] flex items-end">
      {/* background image (can swap later) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('/images/Screenshot 2025-11-24 160859.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.95)",
        }}
        aria-hidden
      />
      {/* soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

      <div className="container-grid relative z-10 pb-10">
        <h1 className="display-title text-white text-4xl md:text-5xl drop-shadow">
          {t("gallery_page.title", "Gallery")}
        </h1>
        {t("gallery_page.subtitle") && (
          <p className="mt-2 text-white/90 max-w-2xl drop-shadow">
            {t("gallery_page.subtitle")}
          </p>
        )}
      </div>

      {/* curve down to ivory */}
    </section>
  );
}
