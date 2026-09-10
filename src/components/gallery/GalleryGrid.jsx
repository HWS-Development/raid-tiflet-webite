// components/gallery/GalleryGrid.jsx
export default function GalleryGrid({ images, onImageClick }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
      {(images || []).map((img, i) => (
        <figure
          key={img.id || i}
          className="group relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-[#e8e2d8] shadow-sm ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-xl"
        >
          <img
            src={img.src}
            alt={img.alt || ""}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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
