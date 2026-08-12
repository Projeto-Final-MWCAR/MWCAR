import "./Sobre.css";

export default function Sobre() {
  return (
    <section id="sobre" className="sobre">
      <div className="sobre_texto">

        <div className="sobre_label">
          <span className="sobre_linha"></span>
          NOSSA HISTÓRIA
        </div>

        <h2>Quem Somos</h2>

        <p className="sobre_paragrafo">
          A MWCar nasceu de uma paixão genuína pelo mercado automotivo. Com
          mais de 25 anos de mercado, estamos em evolução constante em busca
          da perfeição em nosso atendimento. Na MWCar você não compra só um
          carro, mas também um sonho e é o nosso trabalho tornar esse sonho
          cada vez mais próximo!
        </p>

        <p className="sobre_paragrafo">
          Trabalhamos incansavelmente para entregar a melhor experiência aos
          nossos clientes, construindo uma reputação sólida de confiança e
          honestidade. Procedência em cada etapa do processo, agilidade e
          atendimento facilitado são os pilares que nos guiam.
        </p>

        <hr className="sobre_divisor" />

        <ul className="sobre_lista">
          <li>
            <strong>25+</strong>
            <span>ANOS DE MERCADO</span>
          </li>

          <li>
            <strong>Procedência garantida</strong>
          </li>

          <li>
            <strong>Atendimento personalizado</strong>
          </li>
        </ul>
      </div>

      <div className="sobre_imagem_wrapper">
        <img
          src="/foto_loja_quem_somos.jpeg"
          alt="Frente Loja MWCar"
          className="sobre_imagem"
        />

        <div className="sobre_card_endereco">
          <strong>Fortaleza</strong>
          <span>Av. Gurgel Do Amaral, 1238</span>
        </div>
      </div>
    </section>
  );
}