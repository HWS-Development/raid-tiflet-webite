// pages/Home.jsx
import { Hero, Intro, RoomsTeaser, ServicesTeaser, MapEmbed, Reviews } from "../components/home";
import CurveBand from "../components/ui/CurveBand";

export default function Home() {
  return (
    <main id="home">
      <Hero />

      {/* ABOUT with curve to ROOMS */}
      <section className="relative tone-sage">
        <div className="container-grid section">
          <Intro />
        </div>
        <CurveBand position="bottom" from="#DCE5D9" to="#F6F1E8" height={140} />
      </section>

      {/* ROOMS with curve to SERVICES */}
      <section className="relative tone-ivory">
        <div className="container-grid section">
          <RoomsTeaser />
        </div>
        <CurveBand position="bottom" from="#F6F1E8" to="#0f5b4a" height={160} />
      </section>

      {/* SERVICES on dark band with curve back to IVORY */}
      <section className="relative" style={{ backgroundColor: "#0f5b4a" }}>
        <div className="container-grid py-6 md:py-8">
          <ServicesTeaser />
        </div>
        <CurveBand position="bottom" from="#0f5b4a" to="#F6F1E8" height={160} />
      </section>

      {/* REVIEWS + MAP on ivory, curving into footer (palm) */}
      <section className="relative tone-ivory">
        <div className="container-grid section">
          <Reviews />
          {/* <MapEmbed /> */}
        </div>
        {/* curve out to footer color */}
        <CurveBand position="bottom" from="#F6F1E8" to="#254E3E" height={140} />
      </section>

    </main>
  );
}
