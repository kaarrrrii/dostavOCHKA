import './App.css'

function App() {
	return (
		<div className="App">

			<header>
				<nav className='mainNav' aria-label='Основное меню'>
					<ul>
						<li><a href="#hits">Хиты</a></li>
						<li><a href="#pizza">Пицца</a></li>
						<li><a href="#sushi">Суши и роллы</a></li>
						<li><a href="#drinks">Напитки</a></li>
						<li><a href="#delivery">Доставка и оплата</a></li>
					</ul>
				</nav>

				<div className="headerActions">
					<a href="/account">Профиль</a>
					<a href="/cart" aria-label="Корзина">Корзина</a>
				</div>
			</header>

			<main>
				<section className="heroSection">
					<div className='HeroText'>
						<h1>ЗДЕСЬ ВКУСНАЯ ЕДА</h1>
						<h2>Вкусная.Сочная.Свежая.</h2>
					</div>

					<div className='heroImage'>
						<img src="/images/hero-image.png" alt="Вкусная еда" />
					</div>
				</section>

				<section aria-label="Преимущества">
					<ul>
						<li>
							<img src="/images/benefit-delivery.png" alt="" />
							<p>Быстрая доставка</p>
						</li>
						<li>
							<img src="/images/benefit-quality.png" alt="" />
							<p>Высокое качество</p>
						</li>
						<li>
							<img src="/images/benefit-variety.png" alt="" />
							<p>Большой выбор</p>
						</li>
					</ul>

					<button className='getGiftButton'>Получить подарок</button>				
				</section>

				<section className='catalogSection' id='hits' aria-label='Хиты продаж'>
					<h2>Хиты продаж</h2>
					<p>Лучшие предложения</p>

				<div className="card">
					<img src="/images/catalog-placeholder.png" alt="Картинка каталога" />
					<p className="cardLabel">Коктейль</p>
					<p className="description">БЛА БЛА БЛА БЛА БЛА БЛА</p>
					<p className="price">500 ₽</p>

					<div className="quantity" role="group" aria-label="Количество">
						<button type="button" className="quantityButton" aria-label="Уменьшить количество">−</button>

						<input
							className="quantityInput"
							type="number"
							inputMode="numeric"
							min={1}
							value={1}
							aria-label="Количество"
							readOnly
						/>

						<button type="button" className="quantityButton" aria-label="Увеличить количество">+</button>
					</div>

				</div>
				</section>

			</main>
		</div>
	)
}

export default App
