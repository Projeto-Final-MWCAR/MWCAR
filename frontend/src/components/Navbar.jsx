import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={scrolled ? "navbar scrolled" : "navbar"}>
      
      <div className="container">

        <a href="/" className="logo">
          <img src="/logo.png" alt="MWCar" />
        </a>

        <nav className={menuOpen ? "nav active" : "nav"}>
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#localizacao">Localização</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#contato">Contato</a>
        </nav>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>
    </header>
  );
}