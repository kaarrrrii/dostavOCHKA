function Footer({ navItems }) {
  return (
    <footer className="footer">
      <div className="footerContent">
        <section className="footerContacts" aria-labelledby="contacts-heading">
          <h3 id="contacts-heading" className="footerSectionTitle">
            Контакты
          </h3>
          <address>
            <a href="mailto:dostavka@mail.com">dostavka@mail.com</a>
            <br />
            <a href="tel:+75943242129">+7 (594) 324-21-29</a>
          </address>
        </section>

        <section className="footerNav" aria-labelledby="nav-heading">
          <h3 id="nav-heading" className="footerSectionTitle">
            Меню
          </h3>
          <ul className="footerNavList">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="footerBottom">
        <p>© 2026 Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;
