import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Logo e descrição */}
                <div className="footer-column">

                    <img
                        src="/logo.png"
                        alt="MWCar"
                        className="footer-logo"
                    />

                    <p className="footer-description">
                        Sua loja de veículos premium em Fortaleza.
                        <br />
                        Qualidade, transparência e a melhor experiência de
                        compra do mercado.
                    </p>

                    <div className="footer-social">

                        <a href="#">IG</a>

                        <a href="#">FB</a>

                        <a href="#">WA</a>

                        <a href="#">YT</a>

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

                    <p>Av. Paulista, 2064 — SP</p>

                    <p>(11) 3456-7890</p>

                    <p>contato@mwcar.com.br</p>

                    <p>Seg–Sex: 9h às 18h</p>

                </div>

            </div>

            <div className="footer-bottom">

                <p>© 2024 MWCar. Todos os direitos reservados.</p>

                <p>CNPJ: 12.345.678/0001-90 • São Paulo - SP</p>

            </div>

        </footer>
    );
}