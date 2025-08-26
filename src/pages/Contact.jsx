import { useTranslation } from "react-i18next";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactCards from "../components/contact/ContactCards";
import ContactMap from "../components/contact/ContactMap";
import CurveBand from "../components/ui/CurveBand";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <main id="contact">
      {/* HERO */}
      <ContactHero />

      {/* INTRO — sage field with an editorial card and a curve to ivory */}
      {/* <section className="relative tone-sage">
        <div className="container-grid section">
          <header className="mb-5">
            <h1 className="display-title text-ink/90">
            </h1>
          </header>

          <div className="relative max-w-3xl">
            <div className="absolute inset-0 -left-4 rounded-3xl bg-white/60 backdrop-blur-sm -z-10" />
            <p className="text-[15px] sm:text-base leading-7 text-ink/80">
              {t("contact_page.intro")}
            </p>
          </div>
        </div>

        <CurveBand position="bottom" from="#DCE5D9" to="#F6F1E8" height={140} />
      </section> */}

      {/* CONTENT — ivory field with form + info (cards + map) */}
      <section className="relative bg-ec">
        <div className="container-grid section grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Form in a layered soft card */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-[28px] bg-white/60 backdrop-blur-sm -z-10" />
            <div className="rounded-[24px] bg-white shadow-soft p-4 sm:p-6">
              <ContactForm />
            </div>
          </div>

          {/* Right: Contact cards + map, stacked and sticky on large screens */}
          <div className="space-y-6 lg:sticky lg:top-20">
            <div className="rounded-[24px] bg-white shadow-soft p-4 sm:p-6">
              <ContactCards />
            </div>
            <div className="rounded-[24px] bg-white shadow-soft overflow-hidden">
              <ContactMap />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
