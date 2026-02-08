import { DELIVERY_PRICE, FREE_DELIVERY_THRESHOLD, PROMO_CODE } from '../data/cart';

export function getSubtotal(items) {
  return items.reduce((sum, item) => sum + item.qty * item.price, 0);
}

export function getDeliveryPrice(subtotal) {
  return subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_PRICE;
}

export function getDiscount(subtotal, promoCode) {
  if (promoCode.trim().toUpperCase() !== PROMO_CODE) return 0;
  return Math.round(subtotal * 0.1);
}

export function getCartTotal(subtotal, delivery, discount) {
  return Math.max(0, subtotal + delivery - discount);
}

export function isValidPromoCode(promoCode) {
  return promoCode.trim().toUpperCase() === PROMO_CODE;
}

