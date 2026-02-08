import { useState } from 'react';

const PROMO_CODE = 'SECONDPIZZA';

function PromoSection() {
  const [copyState, setCopyState] = useState('idle');

  const copyPromoCode = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROMO_CODE);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = PROMO_CODE;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopyState('success');
      window.setTimeout(() => setCopyState('idle'), 1500);
    } catch {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 1800);
    }
  };

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
          <strong>Промокод:</strong> {PROMO_CODE}
        </p>
        <button className="copyButton" type="button" onClick={copyPromoCode}>
          {copyState === 'success' && 'Скопировано'}
          {copyState === 'error' && 'Ошибка копирования'}
          {copyState === 'idle' && 'Копировать промокод'}
        </button>
      </div>
    </section>
  );
}

export default PromoSection;
