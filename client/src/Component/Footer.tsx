import '../UI/CSS/Footer.css';
import * as React from "react";
import EarlyBird from '../../public/EarlyBird.png';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                Jerne IF - Ingemanns alle 193 - 6700 Esbjerg - Tlf. 28442923
            </div>
            <div className="footer-right">
                <img src={EarlyBird} alt="Early Bird" className="footer-logo" />
                <p className="footer-logo-text">En løsning fra <strong>EarlyBirds</strong></p>
            </div>
        </footer>
    );
};

export default Footer;