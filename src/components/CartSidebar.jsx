import { useMemo, useState } from 'react';
import { getCartTotal, getDeliveryPrice, getDiscount, getSubtotal, isValidPromoCode } from '../utils/cart';

function CartSidebar({ isOpen, onClose, items, onIncrease, onDecrease, onRemove }) {
  const [promoCode, setPromoCode] = useState('');
  const [promoNotice, setPromoNotice] = useState('');

  const subtotal = useMemo(() => getSubtotal(items), [items]);
  const delivery = getDeliveryPrice(subtotal);
  const discount = getDiscount(subtotal, promoCode);
  const total = getCartTotal(subtotal, delivery, discount);

  const applyPromo = (event) => {
    event.preventDefault();
    if (!promoCode.trim()) {
      setPromoNotice('Введите промокод.');
      return;
    }

    if (isValidPromoCode(promoCode)) {
      setPromoNotice('Промокод применен: скидка 10%.');
      return;
    }

    setPromoNotice('Промокод не найден.');
  };

  return (
    <>
      <div className={`cartSidebarOverlay ${isOpen ? 'visible' : ''}`} onClick={onClose} aria-hidden={!isOpen} />

      <aside className={`cartSidebar ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen} aria-label="Корзина">
        <div className="cartSidebarHeader">
          <h2>Корзина</h2>
          <button type="button" className="cartSidebarClose" onClick={onClose} aria-label="Закрыть корзину">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cartSidebarEmpty">
            <p>Корзина пустая</p>
          </div>
        ) : (
          <ul className="cartSidebarList">
            {items.map((item) => (
              <li key={item.id} className="cartSidebarItem">
                <div className="cartSidebarItemInfo">
                  <strong>{item.title}</strong>
                  <div className="cartSidebarControls">
                    <button type="button" onClick={() => onDecrease(item.id)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => onIncrease(item.id)}>
                      +
                    </button>
                    <button type="button" className="danger" onClick={() => onRemove(item.id)}>
                      Удалить
                    </button>
                  </div>
                </div>
                <span className="cartSidebarPrice">{item.qty * item.price} ₽</span>
              </li>
            ))}
          </ul>
        )}

        <form className="promoForm" onSubmit={applyPromo}>
          <label htmlFor="promoCode">Промокод</label>
          <div className="promoInputRow">
            <input
              id="promoCode"
              type="text"
              placeholder="Например, SHURIKEN10"
              value={promoCode}
              onChange={(event) => {
                setPromoCode(event.target.value);
                setPromoNotice('');
              }}
            />
            <button type="submit">Применить</button>
          </div>
          {promoNotice && <p className="promoNotice">{promoNotice}</p>}
        </form>

        <div className="cartSidebarSummary">
          <p>
            <span>Сумма</span>
            <strong>{subtotal} ₽</strong>
          </p>
          <p>
            <span>Доставка</span>
            <strong>{delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}</strong>
          </p>
          <p>
            <span>Скидка</span>
            <strong>{discount} ₽</strong>
          </p>
          <p className="total">
            <span>Итого</span>
            <strong>{total} ₽</strong>
          </p>
        </div>

        <button type="button" className="cartSidebarCheckout" disabled={items.length === 0}>
          Оформить заказ
        </button>
      </aside>
    </>
  );
}

export default CartSidebar;
