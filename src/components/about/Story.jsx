import { useTranslation } from "react-i18next";

function MotifBG() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, #000 1px, transparent 1.2px), radial-gradient(circle at 70% 60%, #000 1px, transparent 1.2px)",
        backgroundSize: "28px 28px, 32px 32px",
      }}
    />
  );
}

/**
 * Content-only story block (no section/tone/curves).
 * Fits into the staged band you already defined in About.tsx.
 */
export default function Story() {
  const { t } = useTranslation();

  const paras =
    t("about_page.story.paragraphs", { returnObjects: true }) || [];

  const heritageTitle = t("about_page.story.heritage_title");
  const heritage =
    t("about_page.story.heritage", { returnObjects: true }) || [];

  return (
    <div className="relative">
      <MotifBG />

      <div className="grid gap-10 md:grid-cols-[1.2fr_.9fr] items-start">
        {/* Left: title + paragraphs */}
        <div>
          <h2 className="display-title text-ink mb-4">
            {t("about_page.story.title")}
          </h2>

          <div className="space-y-4 text-[15px] leading-7 text-ink/90">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right: heritage list */}
        <aside className="shadow-soft backdrop-blur- rounded-2xl border border-black/5 p-5 md:p-6">
          <h3 className="font-serif text-lg tracking-wide text-ink/90">
            {heritageTitle}
          </h3>

          <ul className="mt-3 space-y-2 text-[15px] text-ink/80">
            {heritage.map((line, i) => (
              <li key={i}>• {line}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
