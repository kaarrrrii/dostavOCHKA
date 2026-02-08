import { useState } from 'react';
import { CATEGORY_LABEL_BY_TYPE } from '../data/productMeta';

function getCategoryLabel(type, fallbackCategory) {
  return CATEGORY_LABEL_BY_TYPE[type] ?? fallbackCategory;
}

function getDescription(product, type) {
  if (product.description) {
    return product.description;
  }

  if (type === 'drink') {
    return `Объем: ${product.volume}`;
  }

  return 'Вкусное блюдо';
}

function ProductCard({ product, type = 'hit', cartQuantity = 0, onAddToCart, onRemoveFromCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isAddedPulse, setIsAddedPulse] = useState(false);

  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increase = () => setQuantity((prev) => prev + 1);

  const add = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      setIsAddedPulse(true);
      window.setTimeout(() => setIsAddedPulse(false), 320);
    }
  };

  const remove = () => {
    if (onRemoveFromCart) {
      onRemoveFromCart(product.id);
    }
  };

  return (
    <article className="productCard">
      <img src={product.image || '/images/catalog-placeholder.png'} alt={product.name} loading="lazy" />

      <div className="productInfo">
        <p className="productCategory">{getCategoryLabel(type, product.category)}</p>
        <h3 className="productName">{product.name}</h3>
        <p className="productDescription">{getDescription(product, type)}</p>
        <p className="productPrice">{product.price} ₽</p>

        <div className="quantityControls" role="group" aria-label="Выбор количества товара">
          <button type="button" className="quantityButton" aria-label="Уменьшить количество" onClick={decrease}>
            -
          </button>
          <input
            className="quantityInput"
            type="text"
            inputMode="numeric"
            value={quantity}
            aria-label="Количество товаров"
            readOnly
          />
          <button type="button" className="quantityButton" aria-label="Увеличить количество" onClick={increase}>
            +
          </button>
        </div>

        <div className="productActions">
          <button className={`addToCartButton ${isAddedPulse ? 'isAddedPulse' : ''}`} type="button" onClick={add}>
            {cartQuantity > 0 ? 'Добавить еще' : 'В корзину'}
          </button>
          <button className="detailsButton" type="button" onClick={remove} disabled={cartQuantity === 0}>
            Убрать ({cartQuantity})
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
