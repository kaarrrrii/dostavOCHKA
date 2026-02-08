import ProductCard from './ProductCard';

function CatalogSection({ id, title, subtitle, products, type, cartQuantityByProductId, onAddToCart, onRemoveFromCart }) {
  return (
    <section className="catalogSection" id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="sectionTitle">
        {title}
      </h2>
      <p className="catalogSubtitle">{subtitle}</p>

      <div className="catalogGrid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            type={type}
            cartQuantity={cartQuantityByProductId[product.id] ?? 0}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
          />
        ))}
      </div>
    </section>
  );
}

export default CatalogSection;
