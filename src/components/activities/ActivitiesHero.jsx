import { useTranslation } from "react-i18next";

export default function ActivitiesHero() {
  const { t } = useTranslation();
  return (
    <section className="relative h-[44vh] min-h-[340px] flex items-center justify-center overflow-hidden">
      <img
        src="/images/RooftopActivity.png"
        alt="Activities hero"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,.55),rgba(17,24,39,.25))]" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="display-title text-white">
          {t("services_page.activity_title")}
        </h1>
        <p className="mt-3 text-white/90">
          {t("services_page.subtitle")}
        </p>
      </div>
    </section>
  );
}
