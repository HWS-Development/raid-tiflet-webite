// components/services/DiningSection.jsx
import { useTranslation } from "react-i18next";

export default function DiningSection() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-ivory pt-16 pb-8">
      <div className="container-grid gap-12 md:gap-20">
        {/* The Table of Dar Tiflet */}
        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
          {/* text with soft background band */}
          <div className="relative">
            <div className="absolute inset-0 -left-4 bg-[#fdf1e7] rounded-3xl -z-10" />
            <h3 className="font-serif text-2xl md:text-3xl mb-4 flex items-center gap-2">
              <span className="text-rose-600">🍴</span>
              {t("dining.title")}
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              {t("dining.table_desc")}
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-800">
              <li>{t("dining.menu")}</li>
              <li>{t("dining.fresh")}</li>
              <li>{t("dining.vegetarian")}</li>
            </ul>
            <p className="mt-2 text-rose-600 text-sm">
              {t("dining.notice")}
            </p>
          </div>

          {/* organic image */}
          <div className="relative">
            <img
              src="/images/Roofoptableservice.png"
              alt="Dar Tiflet Table"
              className="w-full h-80 object-cover rounded-[50%_30%_40%_60%/50%_60%_40%_50%]"
            />
          </div>
        </div>

        {/* The Tiflet Counter */}
        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12 md:flex-row-reverse">
          {/* organic image */}
          <div className="relative">
            <img
              src="/images/Rooftopbarservices.png"
              alt="Tiflet Counter"
              className="w-full h-80 object-cover rounded-[40%_60%_60%_40%/60%_40%_50%_50%]"
            />
          </div>

          {/* text with mint background band */}
          <div className="relative">
            <div className="absolute inset-0 -left-4 bg-[#e7f8f3] rounded-3xl -z-10" />
            <h3 className="font-serif text-2xl md:text-3xl mb-4 flex items-center gap-2">
              <span className="text-emerald-600">🌿</span>
              {t("dining.counter_title")}
            </h3>
            <p className="text-lg text-gray-700">
              {t("dining.counter_desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
