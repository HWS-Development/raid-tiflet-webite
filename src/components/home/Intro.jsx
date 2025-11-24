import { useTranslation } from "react-i18next";

export default function Intro(){
  const { t } = useTranslation();
  return (
    <div className="grid md:grid-cols-2 gap-10 pt-10 items-center">
      <div>
        <h2 className="display-title mb-6">{t("about.title")}</h2>
        <p className="mt-3 text-[16px] leading-7">{t("about.lead")}</p>
        <p className="mt-2 text-[16px] leading-7">{t("about.hospitality")}</p>
      </div>
      <img
        src="/images/Screenshot 2025-11-24 125250.png"
        alt={t("about.title")}
        className="rounded-[24px] shadow-2xl w-full object-cover aspect-[4/3]"
      />
    </div>
  );
}
