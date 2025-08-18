
export default function ServiceCard({ item }) {

  return (
    <article className="bg-white rounded-2xl shadow-soft overflow-hidden border border-black/5 hover:-translate-y-1 hover:shadow-lg transition">
      <div className="h-1" style={{ backgroundColor: item.color || "#C94F44" }} />
      <div className="relative aspect-[16/9]">
        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-brand-charcoal">{item.name}</h3>

        {item.tag && (
          <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-brand-ivory border border-black/10">
            {item.tag}
          </span>
        )}

        {item.body && <p className="mt-3 text-sm text-gray-700">{item.body}</p>}

        {/* Removed the "From" price chip entirely */}
        {item.note && <p className="mt-3 text-xs text-gray-500">{item.note}</p>}

        {item.cta && item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex mt-4 px-4 py-2 rounded-xl bg-brand-terracotta text-white hover:bg-brand-terracottaDark transition"
          >
            {item.cta}
          </a>
        )}
      </div>
    </article>
  );
}
