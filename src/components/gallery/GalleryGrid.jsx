export default function GalleryGrid({ images = [], onImageClick }) {
    if (!images.length) {
      return <p className="text-gray-600 mt-6">No images to display.</p>;
    }
  
    return (
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, idx) => (
          <figure
            key={img.id || idx}
            className="group relative rounded-2xl overflow-hidden border border-black/5 shadow-soft"
          >
            <button
              onClick={() => onImageClick(idx)}
              className="block w-full h-full"
              aria-label={img.alt || "Open image"}
            >
              <div className={`relative ${img.ratio ? "" : "aspect-[4/3]"}`}>
                <img
                  src={img.src}
                  alt={img.alt || ""}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "https://picsum.photos/1200/900")}
                  className={`absolute inset-0 w-full h-full object-cover ${img.className || ""}`}
                  style={img.ratio ? { aspectRatio: img.ratio } : undefined}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </div>
            </button>
  
            <figcaption className="absolute left-3 bottom-3">
              {img.category && (
                <span className="text-xs px-2 py-1 rounded-full bg-white/90 border border-black/10">
                  {img.category_label || img.category}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }
  