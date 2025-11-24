// import Curve from "../ui/Curve";
import BookingForm from "../booking/BookingForm";
import { useTranslation } from "react-i18next";

export default function Hero(){
  const { t } = useTranslation();
  return (
    <section className="relative  md:h-[100vh] h-[96vh]  overflow-hidden">
      <img
        src="/images/Screenshot 2025-11-24 125235.png"
        alt={t("hero.alt", "Rooftop Dar Tiflet")}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.45)_100%)]" />
      <div className="absolute inset-0" style={{background:"radial-gradient(60rem 30rem at 70% 20%, rgba(196,88,67,.22), transparent)"}} />

      <div className="container-grid relative z-10 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-8 w-full items-center">
          <div className="text-white drop-shadow">
            {/* Brand can stay literal; subtitle is localized */}
            <h1 className="display-title text-white">Dar Tiflet</h1>
            <p className="mt-2 opacity-95">{t("hero.subtitle")}</p>
          </div>

          <div className="justify-self-end w-full max-w-md">
              <BookingForm />
          </div>
        </div>
      </div>

    </section>
  );
}
