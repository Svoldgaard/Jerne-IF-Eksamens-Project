import {useNavigate} from "react-router";import '../CSS/Forside.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

function ForsideAdmin() {
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
                <button onClick={() => navigate ("/aktiv-plader")}>
                    Aktive Plader
                </button>
                <button onClick={() => navigate ("/spilhistorik") }>
                    Spilhistorik
                </button>
            </div>
            <div>
                <button onClick={() => navigate ("/regler") }>
                    Regler
                </button>
                <button onClick={() => navigate ("/profil-admin") }>
                    Profil
                </button>
            </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ForsideAdmin;