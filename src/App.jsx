import { useEffect, useMemo, useState } from 'react';
import './App.css';
import AuthPage from './components/AuthPage';
import BannerSlider from './components/BannerSlider';
import CartSidebar from './components/CartSidebar';
import CatalogSection from './components/CatalogSection';
import Footer from './components/Footer';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';
import PromoSection from './components/PromoSection';
import { APP_PAGES, ROUTES } from './constants/routes';
import { CATALOG_SECTIONS } from './data/catalogSections';
import { FOOTER_NAV_ITEMS, NAV_ITEMS } from './data/navigation';
import { readAuthState, writeAuthState } from './utils/authStorage';
import { getCurrentPage, navigateTo } from './utils/router';

function App() {
  const [page, setPage] = useState(getCurrentPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(readAuthState);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(ROUTES.PROFILE);

  useEffect(() => {
    const onPathChange = () => {
      setPage(getCurrentPage());
    };

    window.addEventListener('popstate', onPathChange);
    return () => window.removeEventListener('popstate', onPathChange);
  }, []);

  useEffect(() => {
    if (page === APP_PAGES.AUTH) {
      setIsAuthPanelOpen(true);
      navigateTo(ROUTES.HOME);
      setPage(APP_PAGES.HOME);
    }

    if (page === APP_PAGES.PROFILE) {
      if (isAuthenticated) {
        setIsProfilePanelOpen(true);
      } else {
        setIsAuthPanelOpen(true);
        setRedirectAfterAuth(ROUTES.PROFILE);
      }
      navigateTo(ROUTES.HOME);
      setPage(APP_PAGES.HOME);
    }
  }, [page, isAuthenticated]);

  useEffect(() => {
    if (page === APP_PAGES.PROFILE) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  const navigate = (path) => {
    navigateTo(path);
    setPage(getCurrentPage());
  };

  const persistAuthState = (value) => {
    setIsAuthenticated(value);
    writeAuthState(value);
  };

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);

  const cartQtyByProductId = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      acc[item.id] = item.qty;
      return acc;
    }, {});
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    if (!product || qty <= 0) return;

    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === product.id);
      if (index === -1) {
        return [...prev, { id: product.id, title: product.name, price: product.price, qty }];
      }

      const next = [...prev];
      next[index] = { ...next[index], qty: next[index].qty + qty };
      return next;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseCartItem = (productId) => {
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, qty: item.qty + 1 } : item)));
  };

  const decreaseCartItem = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === productId ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleSections = useMemo(() => {
    if (!normalizedQuery) return CATALOG_SECTIONS;

    return CATALOG_SECTIONS.map((section) => {
      const products = section.products.filter((product) => {
        const haystack = [product.name, product.description, product.category, product.volume, section.title]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      });

      return { ...section, products };
    }).filter((section) => section.products.length > 0);
  }, [normalizedQuery]);

  const onAuthSuccess = () => {
    persistAuthState(true);
    setIsAuthPanelOpen(false);
    if (redirectAfterAuth === ROUTES.CART) {
      navigate(ROUTES.HOME);
      setIsCartOpen(true);
      return;
    }
    if (redirectAfterAuth === ROUTES.PROFILE) {
      navigate(ROUTES.HOME);
      setIsProfilePanelOpen(true);
      return;
    }
    navigate(redirectAfterAuth);
  };

  const onLogout = () => {
    persistAuthState(false);
    setIsProfilePanelOpen(false);
    setIsAuthPanelOpen(true);
    setRedirectAfterAuth(ROUTES.PROFILE);
    navigate(ROUTES.HOME);
  };

  const openProtectedPage = (path) => {
    if (isAuthenticated) {
      navigate(path);
      return;
    }

    setRedirectAfterAuth(path);
    setIsAuthPanelOpen(true);
    navigate(ROUTES.HOME);
  };

  const handleSearchSubmit = () => {
    if (!normalizedQuery || visibleSections.length === 0) return;

    const firstSectionId = visibleSections[0].id;
    const scrollToFirstResult = () => {
      const target = document.getElementById(firstSectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (page === APP_PAGES.PROFILE) {
      navigate(ROUTES.HOME);
      window.setTimeout(scrollToFirstResult, 60);
      return;
    }

    scrollToFirstResult();
  };

  const handleCatalogAnchorNavigation = (href) => {
    if (!href.startsWith('#')) return;
    const anchorId = href.slice(1);

    const scrollToAnchor = () => {
      const target = document.getElementById(anchorId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (page === APP_PAGES.PROFILE) {
      navigate(ROUTES.HOME);
      window.setTimeout(scrollToAnchor, 60);
      return;
    }

    scrollToAnchor();
  };

  return (
    <div className="App">
      <Header
        navItems={NAV_ITEMS}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onNavigateByAnchor={handleCatalogAnchorNavigation}
        onOpenHome={() => {
          setIsProfilePanelOpen(false);
          navigate(ROUTES.HOME);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        keepFullHeader={false}
        onOpenProfile={() => {
          if (isAuthenticated) {
            setIsProfilePanelOpen(true);
            return;
          }
          openProtectedPage(ROUTES.PROFILE);
        }}
        onOpenCart={() => {
          if (isAuthenticated) {
            setIsCartOpen(true);
            return;
          }
          setRedirectAfterAuth(ROUTES.CART);
          navigate(ROUTES.AUTH);
        }}
        cartCount={cartCount}
      />

      <main className="main">
        <>
          <BannerSlider />

          {visibleSections.map((section) => (
            <CatalogSection
              key={section.id}
              id={section.id}
              title={section.title}
              subtitle={section.subtitle}
              products={section.products}
              type={section.type}
              cartQuantityByProductId={cartQtyByProductId}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
            />
          ))}

          {normalizedQuery && visibleSections.length === 0 && (
            <section className="searchEmpty">
              <h2>Ничего не найдено</h2>
              <p>Попробуйте изменить запрос.</p>
            </section>
          )}

          <PromoSection />
        </>
      </main>

      <Footer navItems={FOOTER_NAV_ITEMS} />

      {isAuthPanelOpen && (
        <div className="authOverlay" onClick={() => setIsAuthPanelOpen(false)}>
          <div className="authOverlayDialog" onClick={(event) => event.stopPropagation()}>
            <AuthPage
              embedded
              closeLabel="Закрыть"
              onGoHome={() => setIsAuthPanelOpen(false)}
              onAuthSuccess={onAuthSuccess}
            />
          </div>
        </div>
      )}

      {isProfilePanelOpen && (
        <div className="authOverlay" onClick={() => setIsProfilePanelOpen(false)}>
          <div className="profileOverlayDialog" onClick={(event) => event.stopPropagation()}>
            <ProfilePage embedded onGoHome={() => setIsProfilePanelOpen(false)} onLogout={onLogout} />
          </div>
        </div>
      )}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onIncrease={increaseCartItem}
        onDecrease={decreaseCartItem}
        onRemove={removeFromCart}
      />
    </div>
  );
}

export default App;
