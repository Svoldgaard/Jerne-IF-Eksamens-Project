import '../CSS/Vindertal.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {useNavigate} from "react-router-dom";

function Vindertal() {
    const navigate = useNavigate();

    return (
        <div className="page-vindertal">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside-admin")}/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-vindertal">

                    <h2 className="header-vindertal">Nuværende spil: Uge 48 2025</h2>
                    <p className="text-vindertal">Vindertal:</p>
                    <div className="vindertal">
                        <input
                            type="text"
                            placeholder=""
                            className="input-vindertal"
                        />
                        <span className="separator-vindertal"></span>
                        <input
                            type="text"
                            placeholder=""
                            className="input-vindertal"
                        />
                        <span className="separator-vindertal"></span>
                        <input
                            type="text"
                            placeholder=""
                            className="input-vindertal"
                        />
                    </div>
                    <button className="button-gem-vindertal" onClick={() => navigate("/vundet-plader-admin")}>
                        Gem
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Vindertal;