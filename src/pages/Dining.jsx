import { useTranslation } from "react-i18next";
import DiningHero from "../components/dining/DiningHero";
import MenuSection from "../components/dining/MenuSection";
import BarSection from "../components/dining/BarSection";
import DiningGallery from "../components/dining/DiningGallery";

export default function Dining() {
  const { t } = useTranslation();

  return (
    <main id="dining" className="pt-16 pb-8 sm:pb-10">
      <DiningHero />

      <section className="py-10 sm:py-12">
        <div className="container-grid">
          <p className="max-w-3xl text-gray-700 text-sm sm:text-base">
            {t("dining_page.intro")}
          </p>
        </div>
      </section>

      <MenuSection />
      <BarSection />
      <DiningGallery />
    </main>
  );
}
