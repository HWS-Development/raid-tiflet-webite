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
      { src: "/images/food6.jpg", alt: "Terrace" },
      { src: "/images/food3.png", alt: "Terrace" },
      { src: "/images/food5.jpg", alt: "Terrace" },
      { src: "/images/food2.webp", alt: "Terrace" },
      { src: "/images/food1.jpg", alt: "Tagine" },
      { src: "/images/food4.jpg", alt: "Terrace" },
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
