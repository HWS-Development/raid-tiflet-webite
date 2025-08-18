export default function SectionHeading({ children, className = "" }) {
    return (
      <div className={`mb-8 ${className}`}>
        <h2 className="text-2xl sm:text-3xl font-semibold text-brand-charcoal">{children}</h2>
        <span className="mt-2 block w-16 h-1 rounded-full bg-brand-terracotta"></span>
      </div>
    );
  }
  