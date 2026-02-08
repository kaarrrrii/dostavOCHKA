import { useEffect, useState } from 'react';

function Header({
  navItems,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onNavigateByAnchor,
  onOpenHome,
  onOpenProfile,
  onOpenCart,
  cartCount = 0,
  keepFullHeader = false,
}) {
  const [isCompact, setIsCompact] = useState(false);
  const fullNavItems = [...navItems, { href: '#promo', label: 'Акции' }];

  useEffect(() => {
    if (keepFullHeader) {
      setIsCompact(false);
      return undefined;
    }

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
  }, [keepFullHeader]);

  return (
    <header className={`header ${isCompact && !keepFullHeader ? 'headerCompact' : ''}`}>
      <div className="headerFull">
        <div className="headerTop">
          <a
            href="#"
            className="brandLink"
            aria-label="Сюрикен"
            onClick={(event) => {
              event.preventDefault();
              if (onOpenHome) {
                onOpenHome();
              }
            }}
          >
            <span className="navIcon brandIcon" aria-hidden="true" />
            <span className="brandName">Shuriken</span>
          </a>

          <div className="headerUtility">
            <a className="phoneLink" href="tel:+75943242129" aria-label="Позвонить в доставку">
              +7 (594) 324-21-29
            </a>
            <form
              className="headerSearch"
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                if (onSearchSubmit) {
                  onSearchSubmit(searchQuery);
                }
              }}
            >
              <input
                type="search"
                placeholder="Поиск по меню"
                aria-label="Поиск по меню"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
              />
            </form>
          </div>

          <div className="headerActions">
            <button className="profileLink" aria-label="Профиль" onClick={onOpenProfile}>
              Профиль
            </button>
            <button className="cartLink" aria-label="Корзина" onClick={onOpenCart}>
              Корзина
              {cartCount > 0 && <span className="cartCount">| {cartCount}</span>}
            </button>
          </div>
        </div>

        <nav className="catalogNav" aria-label="Каталог">
          <ul className="catalogNavList">
            {fullNavItems.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    if (onNavigateByAnchor) {
                      onNavigateByAnchor(href);
                    }
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="headerCompactBar">
        <a
          href="#"
          className="brandLink"
          aria-label="Сюрикен"
          onClick={(event) => {
            event.preventDefault();
            if (onOpenHome) {
              onOpenHome();
            }
          }}
        >
          <span className="navIcon brandIcon" aria-hidden="true" />
          <span className="brandName">Shuriken</span>
        </a>

        <nav className="compactNav" aria-label="Быстрое меню">
          <ul className="compactNavList">
            {fullNavItems.map(({ href, label }) => (
              <li key={`compact-${href}`}>
                <a
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    if (onNavigateByAnchor) {
                      onNavigateByAnchor(href);
                    }
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="headerActions">
          <button className="profileLink" aria-label="Профиль" onClick={onOpenProfile}>
            Профиль
          </button>
          <button className="cartLink" aria-label="Корзина" onClick={onOpenCart}>
            Корзина
            {cartCount > 0 && <span className="cartCount">| {cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
