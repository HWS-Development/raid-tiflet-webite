import Excursions from "../components/activities/Excursions";
import ActivitiesHero from "../components/activities/ActivitiesHero";

export default function ActivitiesPage() {

  return (
    <main id="services">
      {/* HERO — keep your current hero if you have one */}
      <ActivitiesHero/>
      {/* ACTIVITIES — on ivory, curved into the dark band */}
      <Excursions/> 
    </main>
  );
}