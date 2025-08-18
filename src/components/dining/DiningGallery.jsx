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
        { src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1200&auto=format&fit=crop", alt: "Tagine" },
        { src: "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1200&auto=format&fit=crop", alt: "Terrace" },
        { src: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1200&auto=format&fit=crop", alt: "Breakfast" },
        { src: "https://images.unsplash.com/photo-1523983305872-1b8a9c09b8f8?q=80&w=1200&auto=format&fit=crop", alt: "Tea" },
        { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1200&auto=format&fit=crop", alt: "Rooftop" },
        { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop", alt: "Salads" }
      ];

  return (
    <SnapSlider
      className="mt-6"
      items={items}
      perView={{ base: 1, md: 2, lg: 3 }}
      renderItem={(img) => <Tile {...img} />}
    />
  );
}
