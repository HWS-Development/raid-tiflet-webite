import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";
import { safeArray } from "../../utils/safeArray";

const icons = {
  shuttle: <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="currentColor" d="M3 5h13a5 5 0 0 1 5 5v7h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V7a2 2 0 0 1 2-2Zm0 9h18v-4a3 3 0 0 0-3-3H5a2 2 0 0 0-2 2v5Z"/></svg>,
  breakfast: <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="currentColor" d="M4 19h16v2H4v-2Zm1-8h12a4 4 0 1 1 0 8H5a4 4 0 0 1 0-8Zm14-6H5V3h14v2Z"/></svg>,
  tips: <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="currentColor" d="M12 2a7 7 0 0 1 7 7c0 2.76-1.5 4.09-3 5.24V17a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2.76C6.5 13.09 5 11.76 5 9a7 7 0 0 1 7-7Zm-2 18h4v2h-4v-2Z"/></svg>,
  luggage: <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="currentColor" d="M9 3h6v2H9V3Zm-3 4h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm2 2v10h2V9H8Zm6 0v10h2V9h-2Z"/></svg>
};

export default function ServicesTeaser() {
  const { t } = useTranslation();
  const services = safeArray(t("services.items", { returnObjects: true }));

  return (
    <section className="py-12 sm:py-16 bg-brand-ivory">
      <div className="container-grid">
        <SectionHeading>{t("services.title")}</SectionHeading>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl shadow-soft p-5 flex flex-col items-start gap-3 border border-black/5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="text-brand-terracotta">{icons[s.id] || icons.tips}</div>
              <div>
                <h3 className="font-semibold text-brand-charcoal">{s.name}</h3>
                {s.from && <p className="text-sm text-gray-600">{s.from}</p>}
                {s.price && <p className="text-sm text-gray-600">{s.price}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
