import {useNavigate} from "react-router";
import '../CSS/Forside.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

function ForsideBruger() {
    const navigate = useNavigate();

    return (
        <div className="page-forside">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
            <Header/>
                <div className="background-forside">
            <div>
            <button onClick={() => navigate("/købplade")}>
                Køb Plade
            </button>
            <button onClick={() => navigate("/aktiv-spil")}>
                Aktive Spil
            </button>
            </div>
            <div>
                <button onClick={() => navigate("/spilhistorik")}>
                    Spilhistorik
                </button>
                <button onClick={() => navigate("/profil")}>
                    Profil
                </button>
            </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ForsideBruger;