import logo from "../../images/header__logo.svg";
import burger from "../../images/header__btn.svg";
import closer from "../../images/header__closer.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ page, userEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onSignOut = () => {
    setIsOpen(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  useEffect(() => {
    const closeMobileMenu = () => {
      if (document.documentElement.clientWidth > "767") {
        setIsOpen(false);
        window.removeEventListener("resize", closeMobileMenu);
      }

      if (isOpen) {
        window.addEventListener("resize", closeMobileMenu);
        return () => window.removeEventListener("resize", closeMobileMenu);
      }
    };
    closeMobileMenu();
  }, [isOpen]);

  if (page === "main") {
    return (
      <header className={`header ${isOpen ? "header_open" : ""}`}>
        <img className="header__logo" src={logo} alt="Логотип. Logo." />

        <img
          className="header__burger-btn"
          onClick={() => setIsOpen((v) => !v)}
          src={isOpen ? closer : burger}
          alt="button"
        />

        <menu className="header__menu">
          <p className="header__email">{userEmail}</p>
          <p onClick={onSignOut} className="header__btn">
            Выйти
          </p>
        </menu>
        {/*======== mobile-menu ========*/}
        <menu
          className={`header__mob-menu ${
            isOpen ? "header__mob-menu_open" : ""
          }`}
        >
          <p className="header__email">{userEmail}</p>
          <p onClick={onSignOut} className="header__btn">
            Выйти
          </p>
        </menu>
      </header>
    );
  } else {
    return (
      <header className={`header ${isOpen ? "header_open" : ""}`}>
        <img className="header__logo" src={logo} alt="Логотип. Logo." />
        <Link
          className="header__btn"
          to={page === "signin" ? "/sign-up" : "/sign-in"}
        >
          {page === "signin" ? "Регистрация" : "Вход"}
        </Link>
      </header>
    );
  }
}

export default Header;
