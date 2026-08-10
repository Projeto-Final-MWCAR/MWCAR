import "./Hero.css";

export default function Hero() {
  return (
    <section id="inicio" className="hero">

      <div className="overlay"></div>

      <div className="hero-content">

        <h1>
          ENCONTRE O CARRO
        </h1>
        <h2>
          DOS SEUS SONHOS
        </h2>

        <p>
          Seleção exclusiva de veículos premium com qualidade,
          transparência e confiança da MWCar.
        </p>

        <div className="buttons">

          <a href="#catalogo" className="btn-primary">
            Ver Catálogo →
          </a>

          <a href="#sobre" className="btn-secondary">
            Saiba Mais
          </a>

        </div>

      </div>

    </section>
  );
}