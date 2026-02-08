function PromoSection() {
  return (
    <section className="promotionalSection" id="promo" aria-labelledby="promo-heading">
      <h3 id="promo-heading" className="sectionTitle">
        <a href="#promo-heading" className="anchorLink">
          Наши акции
        </a>
      </h3>
      <p className="promoSubtitle">Спешим порадовать вас нашими лучшими предложениями</p>

      <div className="promotionalBanner" role="region" aria-label="Акция на пиццу">
        <div className="promoBadge">Акция</div>
        <h3 className="promoTitle">Скидка на пиццу</h3>
        <p className="promoDescription">Каждая 2-я пицца со скидкой 10%</p>
        <p className="promoCode">
          <strong>Промокод:</strong> SECONDPIZZA
        </p>
        <button className="copyButton" type="button">
          Копировать промокод
        </button>
      </div>
    </section>
  );
}

export default PromoSection;
