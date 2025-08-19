import { useTranslation } from "react-i18next";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactCards from "../components/contact/ContactCards";
import ContactMap from "../components/contact/ContactMap";
import CurveBand from "../components/ui/CurveBand";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
    <main id="contact" className="pt-16 pb-10 sm:pb-12">
      <ContactHero />

      <section className="py-8 sm:py-10">
        <div className="container-grid">
          <p className="max-w-3xl text-gray-700 text-sm sm:text-base">
            {t("contact_page.intro")}
          </p>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="container-grid grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Form */}
          <ContactForm />

          {/* Right: Cards + Map */}
          <div className="space-y-6 lg:sticky lg:top-20">
            <ContactCards />
            <ContactMap />
          </div>
        </div>
      </section>
    </main>
      <CurveBand position="bottom" from="#F6F1E8" to="#254E3E" height={140} />
      </>
  );
}
