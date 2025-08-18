export const HOTELRUNNER_BASE = 'https://riad-ghali-spa.hotelrunner.com/bv3/search';

const pad = (n) => String(n).padStart(2, '0');
export const toYMD = (d) => {
  const x = d instanceof Date ? d : new Date(d);
  return `${x.getFullYear()}-${pad(x.getMonth()+1)}-${pad(x.getDate())}`;
};

export function defaultDates() {
  const today = new Date();
  const inDt = new Date(today); inDt.setDate(inDt.getDate() + 1);
  const outDt = new Date(inDt); outDt.setDate(outDt.getDate() + 2);
  return { checkin: toYMD(inDt), checkout: toYMD(outDt) };
}

export function buildBookingUrl({ checkin, checkout, adults = 2, promoCode = '' } = {}) {
  const p = new URLSearchParams();
  if (checkin)  p.set('checkin_date', checkin);
  if (checkout) p.set('checkout_date', checkout);
  if (adults)   p.set('total_adult', String(adults));
  if (promoCode) p.set('promoCode', promoCode);
  return `${HOTELRUNNER_BASE}?${p.toString()}`;
}
