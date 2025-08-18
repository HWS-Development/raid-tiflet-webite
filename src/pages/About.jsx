import { useTranslation } from "react-i18next";

import AboutHero from "../components/about/AboutHero";
import Story from "../components/about/Story";
import Highlights from "../components/about/Highlights";
import Team from "../components/about/Team";
import MapBlock from "../components/about/MapBlock";

export default function About() {
  const { t } = useTranslation();

  return (
    <main id="about" className="pt-16 pb-10 sm:pb-12">
      <AboutHero />

      <section className="py-10 sm:py-12">
        <div className="container-grid">
          <p className="max-w-3xl text-gray-700 text-sm sm:text-base">
            {t("about_page.intro")}
          </p>
        </div>
      </section>

      <Story />
      <Highlights />
      <Team />
      <MapBlock />
    </main>
  );
}
