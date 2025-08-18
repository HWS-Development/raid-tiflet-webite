import { useTranslation } from "react-i18next";

export default function RoomsHero() {
  const { t } = useTranslation();
  return (
    // taller hero; image never sits under the header because <main> has pt-16
    <section className="relative h-[56vh] min-h-[420px] flex items-center justify-center overflow-hidden">
      <img
        src="/images/interior1.jpg"
        alt="Rooms hero"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,.55),rgba(17,24,39,.25))]" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">{t("rooms.title")}</h1>
        <p className="mt-3 text-white/90">{t("rooms.legend")}</p>
      </div>
    </section>
  );
}
