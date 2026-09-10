// components/gallery/GalleryGrid.jsx
export default function GalleryGrid({ images, onImageClick }) {
  return (
    <div className="columns-2 gap-4 md:columns-3">
      {(images || []).map((img, i) => (
        <figure
          key={img.id || i}
          className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[32px]"
        >
          <img
            src={img.src}
            alt={img.alt || ""}
            loading="lazy"
            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
            type="button"
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
