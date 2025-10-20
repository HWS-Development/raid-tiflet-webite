// src/pages/About.tsx
import { useTranslation } from "react-i18next";
import AboutHero from "../components/about/AboutHero";
import Story from "../components/about/Story";
import Highlights from "../components/about/Highlights";
import Team from "../components/about/Team";
import MapBlock from "../components/about/MapBlock";
import CurveBand from "../components/ui/CurveBand";
import RatingsAwards from "../components/about/RatingsAwards";

export default function About() {
  const { t } = useTranslation();

  return (
    <main id="about">
      {/* HERO (unchanged) */}
      <AboutHero />

      {/* INTRO on SAGE with curve to IVORY */}
      {/* <section className="relative tone-sage">
        <div className="container-grid section">
          <div className="relative">
            <div className="absolute inset-0 -left-4 rounded-3xl bg-white/60 backdrop-blur-sm -z-10" />
            <p className="max-w-3xl text-[15px] sm:text-base leading-7 text-ink/80">
              {t("about_page.intro")}
            </p>
          </div>
        </div>

        <CurveBand position="bottom" from="#DCE5D9" to="#F5EFE4" height={140} />
      </section> */}

      <section className="relative bg-ec">
        <div className="container-grid section">
          <Story />
        </div>
        <CurveBand position="bottom" from="#F5EFE4" to="#D6C4A8" height={160} />
      </section>

      {/* HIGHLIGHTS on PALM band */}
      <section
        className="relative text-white bg-chb"
      >
        <div className="container-grid section ">
          <h2 className="display-title text-white mb-10">
            {t("about_page.story.heritage_services_title", "Héritage de la maison")}
          </h2>
          <Highlights />
        </div>
        <CurveBand position="bottom" from="#D6C4A8" to="#F5EFE4" height={160} />
      </section>

      {/* TEAM on IVORY */}
      <section className="relative bg-ec">
        <div className="container-grid section !pt-0">
          <Team />
        </div>
      </section>
      <CurveBand position="bottom" from="#F5EFE4" to="#D6C4A8" height={160} />
      <RatingsAwards />
      <CurveBand position="bottom" from="#D6C4A8" to="#F5EFE4" height={160} />

      {/* MAP on IVORY (kept) */}
      <section className="relative bg-ec pb-16">
        <div className="container-grid">
          <MapBlock />
        </div>
      </section>
    </main>
  );
}
