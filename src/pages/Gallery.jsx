import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { safeArray } from "../utils/safeArray";

import GalleryHero from "../components/gallery/GalleryHero";
import GalleryFilters from "../components/gallery/GalleryFilters";
import GalleryGrid from "../components/gallery/GalleryGrid";
import Lightbox from "../components/gallery/Lightbox";
import CurveBand from "../components/ui/CurveBand"; 

export default function Gallery() {
  const { t } = useTranslation();

  const allImages = useMemo(
    () => safeArray(t("gallery_page.images", { returnObjects: true })),
    [t]
  );
  // const categories = useMemo(
  //   () => safeArray(t("gallery_page.filters.categories", { returnObjects: true })),
  //   [t]
  // );

  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allImages.filter((img) => {
      const inCat = activeCat === "all" || img.category === activeCat;
      if (!inCat) return false;
      if (!q) return true;
      const bag = [img.alt, img.category, ...(img.tags || [])].join(" ").toLowerCase();
      return bag.includes(q);
    });
  }, [allImages, activeCat, query]);

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const gotoPrev = () =>
    setLightbox((s) => ({ ...s, index: (s.index - 1 + filtered.length) % filtered.length }));
  const gotoNext = () =>
    setLightbox((s) => ({ ...s, index: (s.index + 1) % filtered.length }));

  return (
    <>
    <main id="gallery" className="pt-16 pb-10 sm:pb-12">
      <GalleryHero />

      <section className="py-8 sm:py-10">
        <div className="container-grid">
          {/* <GalleryFilters
            categories={categories}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
            query={query}
            setQuery={setQuery}
            resultCount={filtered.length}
          /> */}

          <GalleryGrid
            images={filtered}
            onImageClick={openLightbox}
          />
        </div>
      </section>

      {lightbox.open && filtered.length > 0 && (
        <Lightbox
          item={filtered[lightbox.index]}
          onClose={closeLightbox}
          onPrev={gotoPrev}
          onNext={gotoNext}
        />
      )}
    </main>
        <CurveBand position="bottom" from="#F6F1E8" to="#254E3E" height={140} />
        </>
  );
}
