import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BookingForm from "../booking/BookingForm.jsx";

// Replace with your real photos later
const IMAGES = [
  "/images/rooftop3.jpg",
  "/images/rooftop.jpg",
  "/images/interior.jpg",
];

export default function Hero() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % IMAGES.length);

  // auto-advance
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  // pre-load
  useMemo(() => {
    IMAGES.forEach((src) => { const img = new Image(); img.src = src; });
  }, []);

  return (
    <section className="relative min-h-[560px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none" />

      {/* Stacked images with Tailwind cross-fade */}
      <div className="absolute inset-0">
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Dar Tiflet hero"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out
              ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* readability gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,41,55,.55),rgba(31,41,55,.25))]"></div>

      {/* Content + Booking form */}
      <div className="relative z-10 container-grid grid lg:grid-cols-[1.15fr,1fr] items-center gap-8">
        <div className="text-center lg:text-left text-white">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Dar Tiflet</h1>
          <p className="mt-4 text-white/90 text-base sm:text-lg">{t("hero.subtitle")}</p>
        </div>

        <div className="bg-white/95 rounded-2xl shadow-soft p-4 backdrop-blur">
          <BookingForm />
        </div>
      </div>

    </section>
  );
}
