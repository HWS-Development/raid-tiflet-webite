// src/components/services/ServicesHero.jsx
import { useTranslation } from "react-i18next";

export default function ServicesHero() {
  const { t } = useTranslation();
  return (
   <section className="relative h-[40vh] min-h-[220px] md:h-[65vh] flex items-center justify-center overflow-hidden">
  <img
    src="/images/Serviceshero.png"
    alt="Services hero"
    className="absolute inset-0 w-full h-full object-cover"
    loading="eager"
  />

  <div className="relative z-10 text-center text-white px-4">
    <h1 className="display-title text-white">
      {t("services_page.title")}
    </h1>
    <p className="mt-3 text-white/90">
      {t("services_page.subtitle")}
    </p>
  </div>
</section>

  );
}
