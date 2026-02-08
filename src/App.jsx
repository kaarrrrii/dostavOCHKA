import './App.css';
import BannerSlider from './components/BannerSlider';
import CatalogSection from './components/CatalogSection';
import Footer from './components/Footer';
import Header from './components/Header';
import PromoSection from './components/PromoSection';
import { CATALOG_SECTIONS } from './data/catalogSections';
import { FOOTER_NAV_ITEMS, NAV_ITEMS } from './data/navigation';

function App() {
  return (
    <div className="App">
      <Header navItems={NAV_ITEMS} />

      <main className="main">
        <BannerSlider />

        {CATALOG_SECTIONS.map((section) => (
          <CatalogSection
            key={section.id}
            id={section.id}
            title={section.title}
            subtitle={section.subtitle}
            products={section.products}
            type={section.type}
          />
        ))}

        <PromoSection />
      </main>

      <Footer navItems={FOOTER_NAV_ITEMS} />
    </div>
  );
}

export default App;
