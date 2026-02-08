import './App.css'

// Компонент карточки товара (вынесен за пределы App)
const ProductCard = ({ product, type = 'hit' }) => (
	<article className="productCard" key={product.id}>
		<img 
			src={product.image || "/images/catalog-placeholder.png"} 
			alt={product.name}
			loading="lazy"
		/>
		<div className="productInfo">
			<p className="productCategory">
				{type === 'hit' ? product.category : 
				type === 'pizza' ? 'Пицца' :
				type === 'sushi' ? 'Суши и роллы' : 'Напитки'}
			</p>
			<h3 className="productName">{product.name}</h3>
			<p className="productDescription">
				{product.description || (type === 'drink' ? `Объем: ${product.volume}` : 'Вкусное блюдо')}
			</p>
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

// Компонент секции каталога (вынесен за пределы App)
const CatalogSection = ({ id, title, subtitle, products, type }) => (
	<section className="catalogSection" id={id} aria-labelledby={`${id}-heading`}>
		<h2 id={`${id}-heading`} className='sectionTitle'>{title}</h2>
		<p className="catalogSubtitle">{subtitle}</p>
		
		<div className="catalogGrid">
			{products.map(product => (
				<ProductCard key={product.id} product={product} type={type} />
			))}
		</div>
	</section>
);

function App() {
	// Данные для карточек товаров
	const hits = [
		{ id: 1, name: "Маргарита", category: "пицца", price: 550, image: "/images/margarita.png" },
		{ id: 2, name: "Филадельфия", category: "суши", price: 750, image: "/images/philadelphia.png" },
		{ id: 3, name: "Кола", category: "напитки", price: 150, image: "/images/cola.png" },
		{ id: 4, name: "Цезарь", category: "салат", price: 450, image: "/images/caesar.png" }
	];

	const pizzas = [
		{ id: 5, name: "Пепперони", price: 650, description: "Пикантная пепперони, сыр моцарелла", image: "/images/pepperoni.png" },
		{ id: 6, name: "4 сыра", price: 700, description: "Смесь четырёх сыров", image: "/images/4cheese.png" },
		{ id: 7, name: "Гавайская", price: 600, description: "Курица, ананас, сыр", image: "/images/hawaiian.png" },
		{ id: 8, name: "Мясная", price: 750, description: "Ассорти мясных деликатесов", image: "/images/meat.png" },
		{ id: 9, name: "Вегетарианская", price: 580, description: "Свежие овощи, грибы", image: "/images/vegan.png" },
		{ id: 10, name: "Карбонара", price: 680, description: "Бекон, яйцо, сливки", image: "/images/carbonara.png" }
	];

	const sushi = [
		{ id: 11, name: "Калифорния", price: 450, description: "Краб, авокадо, огурец", image: "/images/california.png" },
		{ id: 12, name: "Дракон", price: 850, description: "Угорь, авокадо, икра", image: "/images/dragon.png" },
		{ id: 13, name: "Филадельфия", price: 750, description: "Лосось, сыр, огурец", image: "/images/philadelphia.png" },
		{ id: 14, name: "Запечённые роллы", price: 650, description: "Запечённые с соусом", image: "/images/baked.png" },
		{ id: 15, name: "Темпура", price: 550, description: "В хрустящем кляре", image: "/images/tempura.png" },
		{ id: 16, name: "Сяке маки", price: 350, description: "Ролл с лососем", image: "/images/sake.png" }
	];

	const drinks = [
		{ id: 17, name: "Кола", price: 150, volume: "0.5л", image: "/images/cola.png" },
		{ id: 18, name: "Фанта", price: 150, volume: "0.5л", image: "/images/fanta.png" },
		{ id: 19, name: "Спрайт", price: 150, volume: "0.5л", image: "/images/sprite.png" },
		{ id: 20, name: "Сок яблочный", price: 120, volume: "0.3л", image: "/images/juice.png" },
		{ id: 21, name: "Вода газированная", price: 100, volume: "0.5л", image: "/images/water.png" },
		{ id: 22, name: "Энергетик", price: 200, volume: "0.25л", image: "/images/energy.png" }
	];

	return (
		<>
			<div className="App">
				<header className="header">
					<nav className="mainNav" aria-label="Основное меню">
						<ul className="navList">
							<li><a href="#">Главная</a></li>
							<li><a href="#hits">Хиты</a></li>
							<li><a href="#pizza">Пицца</a></li>
							<li><a href="#sushi">Суши и роллы</a></li>
							<li><a href="#drinks">Напитки</a></li>
							<li><a href="#promo">Акции</a></li>
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
					<CatalogSection 
						id="hits"
						title="Хиты продаж"
						subtitle="Самые популярные блюда"
						products={hits}
						type="hit"
					/>

					<CatalogSection 
						id="pizza"
						title="Пицца"
						subtitle="Итальянская классика с душой"
						products={pizzas}
						type="pizza"
					/>

					<CatalogSection 
						id="sushi"
						title="Суши и роллы"
						subtitle="Японская кухня от шеф-повара"
						products={sushi}
						type="sushi"
					/>

					<CatalogSection 
						id="drinks"
						title="Напитки"
						subtitle="Освежающие напитки"
						products={drinks}
						type="drink"
					/>

					<section className="promotionalSection" id="promo" aria-labelledby="promo-heading">
						<h3 id="promo-heading" className='sectionTitle'>
							<a href="#promo-heading" className="anchorLink">Наши акции</a>
						</h3>
						<p className="promoSubtitle">
							Спешим порадовать вас нашими лучшими предложениями
						</p>

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
				</main>

				{/* FOOTER */}
				<footer className="footer">
					<div className="footerContent">
						<section className="footerContacts" aria-labelledby="contacts-heading">
							<h3 id="contacts-heading" className="footerSectionTitle">
								Контакты
							</h3>
							<p>Мы на связи 24 часа</p>
							<address>
								<a href="mailto:dostavka@mail.com">dostavka@mail.com</a>
								<br />
								<a href="tel:+75943242129">+7 (594) 324-21-29</a>
							</address>
						</section>

						<section className="footerNav" aria-labelledby="nav-heading">
							<h3 id="nav-heading" className="footerSectionTitle">Меню</h3>
							<ul className="footerNavList">
								<li><a href="#hits">Хиты</a></li>
								<li><a href="#pizza">Пицца</a></li>
								<li><a href="#sushi">Суши</a></li>
								<li><a href="#drinks">Напитки</a></li>
							</ul>
						</section>

						{/* <section className="footerSocial" aria-labelledby="social-heading">
							<h3 id="social-heading" className="footerSectionTitle">Социальные сети</h3>
							<div className="socialLinks">
								<a href="#" aria-label="Instagram"><img src="/images/instagram.png" alt="Instagram" /></a>
								<a href="#" aria-label="Telegram"><img src="/images/telegram.png" alt="Telegram" /></a>
								<a href="#" aria-label="VK"><img src="/images/vk.png" alt="VK" /></a>
								<a href="#" aria-label="WhatsApp"><img src="/images/whatsapp.png" alt="WhatsApp" /></a>
							</div>
						</section>*/}
					</div>
					
					<div className="footerBottom">
						<p>© 2024 Вкусная Еда. Все права защищены.</p>
					</div>
				</footer>
			</div>
		</>
	)
}

export default App