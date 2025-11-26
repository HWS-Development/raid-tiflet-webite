import SnapSlider from "../ui/SnapSlider";

const FALL =
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop";

function Tile({ src, alt, caption }) {
  return (
    <figure className="group relative h-full rounded-2xl overflow-hidden border border-black/5">
      <img
        src={src || FALL}
        alt={alt || "Dining"}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={(e) => (e.currentTarget.src = FALL)}
      />
      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white bg-gradient-to-t from-black/60 to-transparent">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function DiningGallery({ images = [] }) {
  const items = images.length
    ? images
    : [
      { src: "/images/Services01.png", alt: "Terrace" },
      { src: "/images/Services02.png", alt: "Terrace" },
      { src: "/images/Services03.png", alt: "Terrace" },
      { src: "/images/Services04.png", alt: "Terrace" },
      { src: "/images/Services05.png", alt: "Tagine" },
      { src: "/images/Services06.png", alt: "Terrace" },
      ];

  return (
    <SnapSlider
      className=""
      items={items}
      perView={{ base: 1, md: 2, lg: 3 }}
      renderItem={(img) => <Tile {...img} />}
    />
  );
}
