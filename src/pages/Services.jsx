import { useTranslation } from "react-i18next";
import ServicesHero from "../components/services/ServicesHero";
import ServicesList from "../components/services/ServicesList";
import DiningSection from "../components/services/DiningSection";
import Activities from "../components/services/Activities";

export default function Services() {
  const { t } = useTranslation();

  return (
    <main id="services" className="pt-16 pb-12 sm:pb-16">
      <ServicesHero />

      <section className="py-10 sm:py-12">
        <div className="container-grid">
          <p className="max-w-3xl text-gray-700 text-sm sm:text-base">
            {t("services_page.intro")}
          </p>
        </div>
      </section>
      
      <Activities />

      <ServicesList />

      <DiningSection />
    </main>
  );
}
