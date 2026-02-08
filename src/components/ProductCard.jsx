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

function ProductCard({ product, type = 'hit' }) {
  return (
    <article className="productCard">
      <img src={product.image || '/images/catalog-placeholder.png'} alt={product.name} loading="lazy" />

      <div className="productInfo">
        <p className="productCategory">{getCategoryLabel(type, product.category)}</p>
        <h3 className="productName">{product.name}</h3>
        <p className="productDescription">{getDescription(product, type)}</p>
        <p className="productPrice">{product.price} ₽</p>

        <div className="quantityControls" role="group" aria-label="Выбор количества товара">
          <button type="button" className="quantityButton" aria-label="Уменьшить количество">
            −
          </button>
          <input
            className="quantityInput"
            type="text"
            inputMode="numeric"
            defaultValue="1"
            aria-label="Количество товаров"
            readOnly
          />
          <button type="button" className="quantityButton" aria-label="Увеличить количество">
            +
          </button>
        </div>

        <div className="productActions">
          <button className="addToCartButton" type="button">
            В корзину
          </button>
          <button className="detailsButton" type="button">
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
