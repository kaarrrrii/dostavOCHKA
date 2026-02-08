import { useEffect, useState } from 'react';

const BANNER_SLIDES = [
  {
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1800&q=80',
    title: 'Горячая пицца за 30 минут',
    subtitle: 'Доставим быстрее, чем остынет.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1800&q=80',
    title: 'Свежие роллы каждый день',
    subtitle: 'Готовим из свежих ингредиентов.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1800&q=80',
    title: 'Комбо для компании',
    subtitle: 'Сеты и напитки по выгодной цене.',
  },
];

function BannerSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % BANNER_SLIDES.length);
    }, 4500);

    return () => clearInterval(intervalId);
  }, []);

  const showPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const showNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % BANNER_SLIDES.length);
  };

  return (
    <section className="bannerSlider" aria-label="Промо баннер">
      <div className="bannerViewport">
        <div className="bannerTrack" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {BANNER_SLIDES.map((slide) => (
            <article key={slide.title} className="bannerSlide">
              <img src={slide.image} alt={slide.title} loading="lazy" />
              <div className="bannerOverlay" />
              <div className="bannerContent">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button type="button" className="sliderArrow sliderArrowLeft" aria-label="Предыдущий баннер" onClick={showPrevious}>
        ‹
      </button>
      <button type="button" className="sliderArrow sliderArrowRight" aria-label="Следующий баннер" onClick={showNext}>
        ›
      </button>
    </section>
  );
}

export default BannerSlider;
