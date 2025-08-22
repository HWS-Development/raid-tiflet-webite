// src/components/Header.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent on top of Home hero, solid after scroll or on other pages
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHome = location.pathname === "/";
  const solid = scrolled || !onHome;

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/rooms", label: t("nav.rooms") },
    { to: "/services", label: t("nav.services") },
    // { to: "/dining", label: t("nav.dining") },
    { to: "/gallery", label: t("nav.gallery") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") }
  ];

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        solid
          ? "bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-grid h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {/* swap src to your real logo url when ready */}
          <img
            src="/images/dar-tiflet-logo-transparent.png"
            alt="Dar Tiflet"
            className="h-28 w-28 rounded-xl"
          />
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  solid ? "text-brand-charcoal" : "text-white"
                } hover:opacity-80 ${isActive ? "underline underline-offset-8 decoration-brand-terracotta" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher (segmented) */}
          <div className={`inline-flex items-center rounded-full px-1 py-1 ${solid ? "bg-brand-ivory" : "bg-white/20"}`}>
            {["fr", "en"].map((lng) => {
              const active = i18n.language === lng;
              return (
                <button
                  key={lng}
                  aria-pressed={active}
                  onClick={() => setLang(lng)}
                  className={`px-2.5 py-1 text-xs rounded-full transition ${
                    active
                      ? "bg-white text-brand-charcoal shadow"
                      : solid
                      ? "text-brand-charcoal/70 hover:text-brand-charcoal"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Book button */}
          <a
            href="https://riad-dar-tiflet-1.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-brand-terracotta text-white hover:bg-brand-terracottaDark shadow-soft transition"
          >
            {t("nav.book")}
          </a>
        </div>

        {/* Mobile: Hamburger */}
        <button
          className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg ${
            solid ? "text-brand-charcoal bg-brand-ivory" : "text-white/95 bg-white/20"
          }`}
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <span className="block w-5 h-0.5 bg-current"></span>
          <span className="block w-5 h-0.5 bg-current mt-1.5"></span>
          <span className="block w-5 h-0.5 bg-current mt-1.5"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur">
          <div className="container-grid py-4">
            <nav className="flex flex-col">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className="px-2 py-3 text-base font-medium text-brand-charcoal hover:bg-brand-ivory rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-3 flex items-center justify-between">
              <div className="inline-flex items-center rounded-full bg-brand-ivory px-1 py-1">
                {["fr", "en"].map((lng) => {
                  const active = i18n.language === lng;
                  return (
                    <button
                      key={lng}
                      aria-pressed={active}
                      onClick={() => setLang(lng)}
                      className={`px-2.5 py-1 text-xs rounded-full transition ${
                        active ? "bg-white text-brand-charcoal shadow" : "text-brand-charcoal/70 hover:text-brand-charcoal"
                      }`}
                    >
                      {lng.toUpperCase()}
                    </button>
                  );
                })}
              </div>

              <a
                href="https://riad-dar-tiflet-1.hotelrunner.com/bv3/search"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-brand-terracotta text-white hover:bg-brand-terracottaDark shadow-soft transition"
                onClick={() => setOpen(false)}
              >
                {t("nav.book")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
