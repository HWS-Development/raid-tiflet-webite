import ServicesHero from "../components/services/ServicesHero";
import Excursions from "../components/activities/Excursions";

export default function ActivitiesPage() {

  return (
    <main id="services">
      {/* HERO — keep your current hero if you have one */}
      <ServicesHero/>
      {/* ACTIVITIES — on ivory, curved into the dark band */}
      <Excursions/> 
    </main>
  );
}