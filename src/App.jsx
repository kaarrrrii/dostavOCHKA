import './App.css'

function App() {
  return (
    <>
      <div className="App">
        <header className="header">
          <nav className="mainNav" aria-label="Основное меню">
            <ul className="navList">
              <li><a href="#hits">Хиты</a></li>
              <li><a href="#pizza">Пицца</a></li>
              <li><a href="#sushi">Суши и роллы</a></li>
              <li><a href="#drinks">Напитки</a></li>
            </ul>
          </nav>

          <div className="headerActions">
            <button className="profileLink" aria-label="Профиль">
              Профиль
            </button>
            <button className="cartLink" aria-label="Корзина">
              Корзина
            </button>
          </div>
        </header>

        <main className="main">
          <section className="heroSection">
            <div className="heroContent">
              <section className="heroTitle">
								<span>ЗДЕСЬ</span>
								<span>ВКУСНАЯ</span>
								<span>ЕДА</span>
							</section>
              <p className="heroSubtitle">Вкусная.Сочная.Свежая.</p>
            </div>

            <div className="heroImage">
              <img 
                src="/images/hero-image.png" 
                alt="Разнообразная вкусная еда: пицца, суши, салаты и напитки" 
              />
            </div>
          </section>

          <section className="benefitsSection" aria-label="Наши преимущества">
            <h2 className="visually-hidden">Преимущества</h2>
            <ul className="benefitsList">
              <li className="benefitItem">
                <img 
                  src="/images/benefit-delivery.png" 
                  alt="" 
                  aria-hidden="true"
                />
                <p>Быстрая доставка</p>
              </li>
              <li className="benefitItem">
                <img 
                  src="/images/benefit-quality.png" 
                  alt="" 
                  aria-hidden="true"
                />
                <p>Высокое качество</p>
              </li>
              <li className="benefitItem">
                <img 
                  src="/images/benefit-variety.png" 
                  alt="" 
                  aria-hidden="true"
                />
                <p>Большой выбор</p>
              </li>
            </ul>

            <button className="getGiftButton" type="button">
              Получить подарок
            </button>        
          </section>

          <section 
            className="catalogSection" 
            id="hits" 
            aria-labelledby="hits-heading"
          >
            <h2 id="hits-heading">Хиты продаж</h2>
            <p className="catalogSubtitle">Лучшие предложения</p>

            <article className="productCard">
              <img 
                src="/images/catalog-placeholder.png" 
                alt="Освежающий фруктовый коктейль со льдом" 
              />
              <p className="productCategory">Коктейль</p>
              <p className="productDescription">Освежающий фруктовый коктейль</p>
              <p className="productPrice">500 ₽</p>

              <div 
                className="quantityControls" 
                role="group" 
                aria-label="Выбор количества товара"
              >
                <button 
                  type="button" 
                  className="quantityButton" 
                  aria-label="Уменьшить количество"
                >
                  −
                </button>

                <input
                  className="quantityInput"
                  type="text"
                  inputMode="numeric"
                  value="1"
                  aria-label="Количество товаров"
                  readOnly
                />

                <button 
                  type="button" 
                  className="quantityButton" 
                  aria-label="Увеличить количество"
                >
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
            </article>
          </section>

          <section 
            className="promotionalSection" 
            aria-labelledby="promo-heading"
          >
            <h2 id="promo-heading">Наши акции</h2>
            <p className="promoSubtitle">
              Спешим порадовать вас нашими лучшими предложениями
            </p>

            <div className="promotionalBanner" role="region" aria-label="Акция на пиццу">
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
        </main>

        <footer className="footer">
          <div className="footerContent">
            <section 
              className="footerContacts" 
              aria-labelledby="contacts-heading"
            >
              <h3 id="contacts-heading" className="visually-hidden">
                Контактная информация
              </h3>
              <p>Мы на связи 24 часа</p>
              <address>
                <a href="mailto:dostavka@mail.com">dostavka@mail.com</a>
                <br />
                <a href="tel:+75943242129">+7 (594) 324-21-29</a>
              </address>
            </section>

            <section 
              className="footerSocial" 
              aria-labelledby="social-heading"
            >
              <h3 id="social-heading">Мы в соц.сетях:</h3>
              <p className="socialLinks">Ссылки на социальные сети</p>
            </section>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App