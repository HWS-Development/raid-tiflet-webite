import ServicesHero from "../components/services/ServicesHero";
import ServicesList from "../components/services/ServicesList";
import DiningSection from "../components/services/DiningSection";
import CurveBand from "../components/ui/CurveBand";
import DiningGallery from "../components/services/DiningGallery";
import MenuSection from "../components/services/MenuSection";

export default function ServicesPage() {

  return (
    <main id="services">
      {/* HERO — keep your current hero if you have one */}
      <ServicesHero/>
      {/* ACTIVITIES — on ivory, curved into the dark band */}
      <section className="relative bg-ec">
        <div className="container-grid section">
          <DiningSection/>
        </div>
        </section>

        <MenuSection />
      {/* SERVICES (the 4 chips) — on dark band with icons, then curve back to ivory */}
        <CurveBand position="bottom" from="#F5EFE4" to="#D6C4A8" height={160} />
      <section className="relative bg-chb">
        <div className="container-grid pb-6 md:pb-8">
          <ServicesList />
        </div>
        <CurveBand position="bottom" from="#D6C4A8" to="#F5EFE4" height={160} />
      </section>

      {/* If you want, you can continue with your Dining / Counter section here */}
      <section className="relative bg-ec">
        <div className="container-grid section">
          <DiningGallery/> 
        </div>
      </section>
    </main>
  );
}