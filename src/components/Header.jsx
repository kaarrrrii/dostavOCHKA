import { useEffect, useState } from 'react';

function Header({ navItems }) {
  const [isCompact, setIsCompact] = useState(false);
  const fullNavItems = [...navItems, { href: '#promo', label: 'Акции' }];

  useEffect(() => {
    const banner = document.querySelector('.bannerSlider');

    if (!banner) {
      const onScroll = () => {
        setIsCompact(window.scrollY > 260);
      };

      const rafId = requestAnimationFrame(onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', onScroll);
      };
    }

    if (!('IntersectionObserver' in window)) {
      const onScroll = () => {
        const bannerBottom = banner.getBoundingClientRect().bottom;
        setIsCompact(bannerBottom <= 0);
      };

      const rafId = requestAnimationFrame(onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', onScroll);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Пока баннер хотя бы частично виден — оставляем двойной header.
        setIsCompact(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      },
    );

    observer.observe(banner);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`header ${isCompact ? 'headerCompact' : ''}`}>
      <div className="headerFull">
        <div className="headerTop">
          <a href="#" className="brandLink" aria-label="Сюрикен">
            <span className="navIcon brandIcon" aria-hidden="true" />
            <span className="brandName">Shuriken</span>
          </a>

          <div className="headerUtility">
            <a className="phoneLink" href="tel:+75943242129" aria-label="Позвонить в доставку">
              +7 (594) 324-21-29
            </a>
            <form className="headerSearch" role="search" onSubmit={(event) => event.preventDefault()}>
              <input type="search" placeholder="Поиск по меню" aria-label="Поиск по меню" />
              <button type="submit">Найти</button>
            </form>
          </div>

          <div className="headerActions">
            <button className="profileLink" aria-label="Профиль">
              Профиль
            </button>
            <button className="cartLink" aria-label="Корзина">
              Корзина
            </button>
          </div>
        </div>

        <nav className="catalogNav" aria-label="Каталог">
          <ul className="catalogNavList">
            {fullNavItems.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="headerCompactBar">
        <a href="#" className="brandLink" aria-label="Сюрикен">
          <span className="navIcon brandIcon" aria-hidden="true" />
          <span className="brandName">Shuriken</span>
        </a>

        <nav className="compactNav" aria-label="Быстрое меню">
          <ul className="compactNavList">
            {fullNavItems.map(({ href, label }) => (
              <li key={`compact-${href}`}>
                <a href={href}>{label}</a>
              </li>
            ))}
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
      </div>
    </header>
  );
}

export default Header;
