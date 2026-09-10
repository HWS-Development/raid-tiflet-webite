import { useMemo, useState } from "react";

import GalleryHero from "../components/gallery/GalleryHero";
import GalleryFilters from "../components/gallery/GalleryFilters";
import GalleryGrid from "../components/gallery/GalleryGrid";
import Lightbox from "../components/gallery/Lightbox";
import CurveBand from "../components/ui/CurveBand"; 

const IMAGE_DIMENSIONS = {
  "gallery-img-6265.webp": [1559, 2078],
  "gallery-dsc7829.webp": [2000, 3554],
  "gallery-img-6269.webp": [2000, 2667],
  "gallery-dsc7826.webp": [2000, 3554],
  "gallery-18-janv-2026-a-18-22-45-2.webp": [1600, 1066],
};

const CLIENT_IMAGES = [
  "gallery-dsc7614-hdr.webp",
  "gallery-dsc1495.webp",
  "gallery-dsc1437-hdr.webp",
  "gallery-dsc8051-hdr.webp",
  "gallery-img-6265.webp",
  "gallery-dsc7829.webp",
  "gallery-dsc1210-hdr.webp",
  "gallery-dsc8196-hdr.webp",
  "gallery-chatgpt-image-25-aout-2026-22-14-06.webp",
  "gallery-dsc7693-hdr.webp",
  "gallery-dsc1560-hdr.webp",
  "gallery-dsc8242.webp",
  "gallery-dsc1446-hdr.webp",
  "gallery-dsc8116-hdr.webp",
  "gallery-dsc7639-hdr.webp",
  "gallery-img-6269.webp",
  "gallery-dsc7826.webp",
  "gallery-dsc1455-hdr.webp",
  "gallery-dsc7965.webp",
  "gallery-dsc8136-hdr.webp",
  "gallery-dsc1431-hdr.webp",
  "gallery-dsc8215.webp",
  "gallery-dsc7708-hdr.webp",
  "gallery-dsc1491-hdr-modifier.webp",
  "gallery-dsc8081-hdr.webp",
  "gallery-18-janv-2026-a-18-22-45-2.webp",
  "gallery-dsc1548-hdr.webp",
  "gallery-dsc7672.webp",
  "gallery-dsc1228-hdr.webp",
  "gallery-dsc8061-hdr.webp",
  "gallery-dsc1416-hdr.webp",
  "gallery-dsc7793-hdr.webp",
  "gallery-dsc7654-hdr.webp",
].map((name, index) => {
  const [width, height] = IMAGE_DIMENSIONS[name] || [2000, 1125];

  return {
    id: `client-${index + 1}`,
    src: `/images/dar-tiflet-2026/${name}`,
    alt: `Dar Tiflet ${index + 1}`,
    width,
    height,
  };
});

export default function Gallery() {
  const allImages = CLIENT_IMAGES;
  // const categories = useMemo(
  //   () => safeArray(t("gallery_page.filters.categories", { returnObjects: true })),
  //   [t]
  // );

  const activeCat = "all";
  const query = "";
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
    <main id="gallery">
      <GalleryHero />

      <section className="bg-ec pt-8 sm:pt-10">
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
        </>
  );
}
