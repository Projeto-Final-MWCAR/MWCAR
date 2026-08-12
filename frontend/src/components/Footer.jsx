import "./Footer.css";

export default function Footer() {
    return (
        <footer id="contato" className="footer">

            <div className="footer-container">

                {/* Logo e descrição */}
                <div className="footer-column">

                    <img
                        src="/logo.png"
                        alt="MWCar"
                        className="footer-logo"
                    />

                    <p className="footer-description">
                         Seleção cuidadosa de veículos.
                        <br />
                        Qualidade, transparência e a melhor experiência de
                        compra do mercado.
                    </p>

                    <div className="footer-social">

                        <a href="https://www.instagram.com/MWCar__/">IG</a>


                    </div>

                </div>

                {/* Links */}
                <div className="footer-column">

                    <h3>Links Rápidos</h3>

                    <a href="#inicio">Início</a>

                    <a href="#sobre">Sobre nós</a>

                    <a href="#localizacao">Localização</a>

                    <a href="#catalogo">Catálogo</a>

                    <a href="#contato">Contato</a>

                </div>

                {/* Contato */}
                <div className="footer-column">

                    <h3>Contato</h3>

                    <p>Av. Gurgel Do Amaral, 1238 — Fortaleza</p>

                    <p>(85) 99765-0302</p>

                    <p>(85) 99682-4446</p>

                    <p>mwcar_@hotmail.com</p>

                    <p>Seg–Sex: 8h às 18h / Sábados: 8h às 13h</p>

                    

                </div>

            </div>

            <div className="footer-bottom">

                <p>© 2026 MWCar. Todos os direitos reservados.</p>

                <p>CNPJ: 08.723.859/0001-30 • Fortaleza - CE</p>

            </div>

        </footer>
    );
}