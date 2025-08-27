// components/gallery/GalleryGrid.jsx
export default function GalleryGrid({ images, onImageClick }) {
  return (
    <div className="columns-2 md:columns-3 gap-4 space-y-4">
      {(images || []).map((img, i) => (
        <figure
          key={img.id || i}
          className="relative break-inside-avoid overflow-hidden rounded-[32px] group"
        >
          <img
            src={img.src}
            alt={img.alt || ""}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* category chip */}
          {/* {img.category_label && (
            <figcaption className="absolute top-3 left-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs backdrop-blur bg-white/80 border border-black/10">
                {img.category_label}
              </span>
            </figcaption>
          )} */}
          {/* click overlay */}
          <button
            onClick={() => onImageClick?.(i)}
            className="absolute inset-0"
            aria-label={img.alt || "Open"}
            title={img.alt || ""}
          />
        </figure>
      ))}
    </div>
  );
}
