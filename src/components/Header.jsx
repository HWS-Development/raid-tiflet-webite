// src/components/Header.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { to: "/contact", label: t("nav.contact") },
  ];

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-grid">
        {/* Cream pill shell only when solid */}
        <div
          className={`mt-3 flex h-14 items-center justify-between transition-all
            ${solid
              ? "rounded-full border border-olive/20 bg-ec/70 px-3 backdrop-blur shadow-soft supports-[backdrop-filter]:bg-ec/60"
              : "px-0"}`
          }
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src="/images/dar-tiflet-logo-transparent.png"
              alt="Dar Tiflet"
              className={`transition ${solid ? "h-16 w-16" : "h-10 w-10"} rounded`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    solid ? "text-ink" : "text-white"
                  } hover:opacity-80 ${isActive ? "underline underline-offset-8 decoration-fcd" : ""}`
                }
                onClick={() => setOpen(false)}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className={`inline-flex items-center rounded-full px-1 py-1 ${solid ? "bg-ec" : "bg-white/20"}`}>
              {["fr", "en"].map((lng) => {
                const active = i18n.language === lng;
                return (
                  <button
                    key={lng}
                    aria-pressed={active}
                    onClick={() => setLang(lng)}
                    className={`px-2.5 py-1 text-xs rounded-full transition ${
                      active
                        ? "bg-white text-ink shadow"
                        : solid
                        ? "text-ink/70 hover:text-ink"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                );
              })}
            </div>

            {/* Book button → client terracotta */}
            <a
              href="https://riad-dar-tiflet-1.hotelrunner.com/bv3/search"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-fcd text-white hover:bg-accent-terracottaDark shadow-soft transition"
            >
              {t("nav.book")}
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg ${
              solid ? "text-ink bg-ec" : "text-white/95 bg-white/20"
            }`}
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <span className="block h-0.5 w-5 bg-current"></span>
            <span className="mt-1.5 block h-0.5 w-5 bg-current"></span>
            <span className="mt-1.5 block h-0.5 w-5 bg-current"></span>
          </button>
        </div>
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
                  className="px-2 py-3 text-base font-medium text-ink hover:bg-ec rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-3 flex items-center justify-between">
              <div className="inline-flex items-center rounded-full bg-ec px-1 py-1">
                {["fr", "en"].map((lng) => {
                  const active = i18n.language === lng;
                  return (
                    <button
                      key={lng}
                      aria-pressed={active}
                      onClick={() => setLang(lng)}
                      className={`px-2.5 py-1 text-xs rounded-full transition ${
                        active ? "bg-white text-ink shadow" : "text-ink/70 hover:text-ink"
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
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-fcd text-white hover:bg-accent-terracottaDark shadow-soft transition"
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
