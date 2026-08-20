import { MapPin, Phone, Clock, Mail } from "lucide-react";
import "./Localizacao.css";

const ENDERECO_LOJA = "Av. Gurgel do Amaral, 1238 - Coaçu, Fortaleza - CE, 60871-175";
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ENDERECO_LOJA)}`;

export default function Localizacao (){

    return(
        <section id="localizacao" className="localizacao">
            
            <div className="localizacao_header">

                    <div className="localizacao_label">
                        <span className="localizacao_linha"></span>
                        VISITE-NOS
                    </div>

                <h2>ONDE ESTAMOS</h2>
            </div>

            <div className="localizacao_conteudo">

                <div className="localizacao_card">

                <div className="localizacao_item">
                    <MapPin className="icone_mapa" />
                    <div>
                        <span className="localizacao_titulo">ENDEREÇO</span>
                        <p>Av. Gurgel Do Amaral, 1238 - Coaçu</p>
                        <p>Fortaleza - CE, 60871-175</p>
                    </div>
                </div>

                <div className="localizacao_item">
                    <Phone className="icone_telefone" />
                    <div>
                        <span className="localizacao_titulo">TELEFONE</span>
                        <p>(85) 99765-0302 WhatsApp</p>
                        <p>(85) 99682-4446 WhatsApp</p>
                    </div>
                </div>

                <div className="localizacao_item">
                    <Clock className="localizacao_icone horario" />
                <div>
                    <span className="localizacao_titulo">HORÁRIO</span>
                    <p>Seg-Sex: 9h às 18h</p>
                    <p>Sábado: 9h às 13h</p>
                    <p>Domingo: Fechado</p>
                    </div>
                </div>

                <div className="localizacao_item">
                    <Mail className="localizacao_icone email" />
                <div>
                    <span className="localizacao_titulo">E-MAIL</span>
                    <p>mwcar_@hotmail.com</p>
                    </div>
                </div>
                
                 <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="localizacao_botao">
                    COMO CHEGAR →
                </a>
                </div>

                {/* Mapa do google */}

                <div className="localizacao_mapa">
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4722.109283693447!2d-38.487990924292006!3d-3.83633764373227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7500086ebbabb%3A0x52943e69b7c4071!2sAv.%20Gurgel%20do%20Amaral%2C%201238%20-%20Messejana%2C%20Fortaleza%20-%20CE%2C%2060871-175%2C%20Brasil!5e1!3m2!1spt-PT!2spt!4v1786493287495!5m2!1spt-PT!2spt"
                     width="100%" 
                     height="100%"
                     style={{ border: 0}}
                     allowFullscreen
                     loading="lazy" 
                     referrerPolicy="strict-origin-when-cross-origin"
                     title="Localização MWCar">
                    </iframe>
                </div>
            </div>

        </section>
    );
}