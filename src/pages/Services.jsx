import ServicesHero from "../components/services/ServicesHero";
import ServicesList from "../components/services/ServicesList";
import DiningSection from "../components/services/DiningSection";
import Activities from "../components/services/Activities";
import CurveBand from "../components/ui/CurveBand";
import Excursions from "../components/services/Excursions";

export default function ServicesPage() {

  return (
    <main id="services">
      {/* HERO — keep your current hero if you have one */}
      <ServicesHero/>
      {/* ACTIVITIES — on ivory, curved into the dark band */}
      <Excursions/> 
      {/* <section className="relative tone-ivory">
        <div className="container-grid section">
        </div>

        <CurveBand position="bottom" from="#F6F1E8" to="#0f5b4a" height={140} />
      </section> */}

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
          <DiningSection/>
        </div>
      </section>
    </main>
  );
}