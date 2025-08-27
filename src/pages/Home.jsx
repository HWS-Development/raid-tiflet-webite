// pages/Home.jsx
import RatingsAwards from "../components/about/RatingsAwards";
import { Hero, Intro, RoomsTeaser, ServicesTeaser, MapEmbed, Reviews } from "../components/home";
import CurveBand from "../components/ui/CurveBand";

export default function Home() {
  return (
    <main id="home">
      <Hero />

      {/* ABOUT with curve to ROOMS */}
      <section className="relative bg-chb">
        <div className="container-grid section">
          <Intro />
        </div>
        <CurveBand position="bottom" from="#D6C4A8" to="#F5EFE4" height={140} />
      </section>

      {/* ROOMS with curve to SERVICES */}
      <section className="relative bg-ec">
        <div className="container-grid section">
          <RoomsTeaser />
        </div>
        <CurveBand position="bottom" from="#F5EFE4" to="#D6C4A8" height={160} />
      </section>

      {/* SERVICES on dark band with curve back to IVORY */}
      <section className="relative bg-chb">
        <div className="container-grid pb-6 md:pb-8">
          {/* <ServicesTeaser /> */}
          <RatingsAwards />
        </div>
        <CurveBand position="bottom" from="#D6C4A8" to="#F5EFE4" height={160} />
      </section>

      {/* REVIEWS + MAP on ivory, curving into footer (palm) */}
      <section className="relative bg-ec">
        <div className="container-grid section">
          <Reviews />
          {/* <MapEmbed /> */}
        </div>
        {/* curve out to footer color */}
      </section>

    </main>
  );
}
