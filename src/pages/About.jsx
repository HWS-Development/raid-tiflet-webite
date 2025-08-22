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
      <section className="relative tone-sage">
        <div className="container-grid section">
          {/* <header className="mb-6">
            <h1 className="display-title text-ink/90">
              {t("about_page.title", "À propos")}
            </h1>
          </header> */}

          {/* editorial card */}
          <div className="relative">
            <div className="absolute inset-0 -left-4 rounded-3xl bg-white/60 backdrop-blur-sm -z-10" />
            <p className="max-w-3xl text-[15px] sm:text-base leading-7 text-ink/80">
              {t("about_page.intro")}
            </p>
          </div>
        </div>

        <CurveBand position="bottom" from="#DCE5D9" to="#F6F1E8" height={140} />
      </section>

      {/* STORY on IVORY with curve to PALM */}
      <section className="relative tone-ivory">
        <div className="container-grid section">
          <Story />
        </div>
        <CurveBand position="bottom" from="#F6F1E8" to="#0f5b4a" height={160} />
      </section>

      {/* HIGHLIGHTS on PALM band */}
      <section
        className="relative"
        style={{ backgroundColor: "#0f5b4a", color: "white" }}
      >
        <div className="container-grid section">
          <h2 className="display-title text-white mb-6">
            {t("about_page.story.heritage_title", "Héritage de la maison")}
          </h2>
          <Highlights />
        </div>
        <CurveBand position="bottom" from="#0f5b4a" to="#F6F1E8" height={160} />
      </section>

      {/* TEAM on IVORY */}
      <section className="relative tone-ivory">
        <div className="container-grid section">
          <Team />
        </div>
      </section>
      <CurveBand position="top" from="#DCE5D9" to="#F6F1E8" height={160} />
          <RatingsAwards />
          <CurveBand position="bottom" from="#DCE5D9" to="#F6F1E8" height={160} />

      {/* MAP on IVORY (kept) */}
      <section className="relative tone-ivory pb-16">
        <div className="container-grid">
          <MapBlock />
        </div>
      </section>
      <CurveBand position="bottom" from="#F6F1E8" to="#254E3E" height={140} />
    </main>
  );
}
