import { useTranslation } from "react-i18next";
import ServicesHero from "../components/services/ServicesHero";
import ServicesList from "../components/services/ServicesList";
import DiningSection from "../components/services/DiningSection";
import Activities from "../components/services/Activities";
import CurveBand from "../components/ui/CurveBand";

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <main id="services">
      {/* HERO — keep your current hero if you have one */}
    <ServicesHero/>
      {/* ACTIVITIES — on ivory, curved into the dark band */}
      <section className="relative tone-ivory">
        <div className="container-grid section">
          <Activities />
        </div>

        {/* to dark green */}
        <CurveBand position="bottom" from="#F6F1E8" to="#0f5b4a" height={140} />
      </section>

      {/* SERVICES (the 4 chips) — on dark band with icons, then curve back to ivory */}
      <section className="relative" style={{ backgroundColor: "#0f5b4a" }}>
        <div className="container-grid section">
          <h2 className="display-title text-white mb-6">
            {t("services.title")}
          </h2>

          <ServicesList />
        </div>

        {/* back to ivory */}
        <CurveBand position="bottom" from="#0f5b4a" to="#F6F1E8" height={160} />
      </section>

      {/* If you want, you can continue with your Dining / Counter section here */}
      <section className="relative tone-ivory">
        <div className="container-grid section">
          <DiningSection/>
        </div>
        <CurveBand position="bottom" from="#F6F1E8" to="#254E3E" height={140} />
      </section>
    </main>
  );
}