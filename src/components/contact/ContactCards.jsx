// src/components/contact/ContactCards.jsx
import { useTranslation } from "react-i18next";

function Icon({ name, className = "" }) {
  const paths = {
    phone: "M6.6 2h2.8c.5 0 .9.3 1 .8l.5 3a1 1 0 01-.3.9l-1.6 1.6a12.6 12.6 0 005.7 5.7l1.6-1.6a1 1 0 01.9-.3l3 .5c.5.1.8.5.8 1v2.8c0 .6-.5 1-1.1 1A18.9 18.9 0 012 7.1C2 6.5 2.4 6 3 6h0z",
    email: "M3 6h18v12H3z M3 6l9 7 9-7",
    wa: "M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z",
    pin: "M12 21s7-7 7-11a7 7 0 10-14 0c0 4 7 11 7 11zm0-9a2 2 0 110-4 2 2 0 010 4z"
  };
  return (
    <>
      {
        name == 'wa' ? 
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="#C2634B" stroke="currentColor" viewBox="0 0 640 640">
            <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
          </svg>
        : name == 'phone' ?
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className={`h-5 w-5`} fill="#C2634B">
            <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/>
          </svg>
        :
          <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={paths[name]} />
          </svg>
      }
    
    </>
  );
}

export default function ContactCards() {
  const { t } = useTranslation();
  const items = [
    { id: "phone", title: t("contact_page.cards.phone"), href: `tel:${t("footer.phone_raw")}`, label: t("footer.phone"), icon: "phone" },
    { id: "email", title: t("contact_page.cards.email"), href: `mailto:${t("footer.email")}`, label: t("footer.email"), icon: "email" },
    { id: "whatsapp", title: t("contact_page.cards.whatsapp"), href:`https://wa.me/${t("footer.phone_fr_raw")}`, label: t("footer.phone"), icon: "wa" },
    { id: "address", title: t("contact_page.cards.address"), href: "https://maps.google.com/?q=Riad%20Dar%20Tiflet%2C%20Marrakech", label: `${t("footer.address_lines.0")}, ${t("footer.address_lines.1")}, ${t("footer.address_lines.2")}`, icon: "pin" }
  ];

  return (
    <section className="rounded-2xl bg-ec p-3">
      <div className="rounded-2xl border border-olive/10 bg-ec p-4 shadow-soft ring-1 ring-black/5">
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((it) => (
            <a
              key={it.id}
              href={it.href}
              target={it.id === "address" || it.id === "whatsapp" ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-olive/10 bg-white/90 p-4 shadow-sm transition hover:shadow-md hover:border-olive/30"
            >
              <span className="grid h-10 min-w-10 place-items-center rounded-full bg-olive/10 text-fcd ring-1 ring-olive/15">
                <Icon name={it.icon} />
              </span>
              <div>
                <div className="text-sm font-semibold text-ink">{it.title}</div>
                <div className="text-sm text-ink/70 group-hover:text-ink/90">{it.label}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
