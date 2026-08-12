import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import Sobre from "../components/Sobre.jsx";
import Localizacao from "../components/Localizacao.jsx";
import CatalogoSection from "../components/CatalogoSection.jsx";

export default function Home() {
    return (
    <>
        <Navbar />
        <Hero />
        <Sobre />
        <Localizacao />
        <CatalogoSection />
        <Footer />
    </>
    )
}