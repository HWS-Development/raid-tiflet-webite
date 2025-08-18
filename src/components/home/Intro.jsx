import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";

export default function Intro() {
  const { t } = useTranslation();
  return (
    <section className="py-12 sm:py-16 bg-brand-ivory">
      <div className="container-grid grid md:grid-cols-2 gap-8 items-center">
        <div>
          <SectionHeading>{t("about.title")}</SectionHeading>
          <p className="text-gray-700 leading-7 mb-4">{t("about.lead")}</p>
          <p className="text-gray-700 leading-7 mb-4">{t("about.body")}</p>
          <p className="text-gray-800 font-medium">{t("about.hospitality")}</p>
        </div>
        <img
          src="/images/rooftop2.jpg"
          alt="Riad Dar Tiflet patio"
          className="rounded-2xl shadow-soft"
        />
      </div>
    </section>
  );
}
