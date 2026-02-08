import ProductCard from './ProductCard';

function CatalogSection({ id, title, subtitle, products, type }) {
  return (
    <section className="catalogSection" id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="sectionTitle">
        {title}
      </h2>
      <p className="catalogSubtitle">{subtitle}</p>

      <div className="catalogGrid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} type={type} />
        ))}
      </div>
    </section>
  );
}

export default CatalogSection;
