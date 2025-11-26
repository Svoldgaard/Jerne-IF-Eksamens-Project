import {useNavigate} from "react-router";
import '../CSS/Forside.css'
import Logo from "../../../public/Logo.png";
import BoardImage from "../../../public/BoardImage.png";
import Board from "../../../public/Board.png";
import Person from "../../../public/Person.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";


function ForsideBruger() {
    const navigate = useNavigate();

    return (
        <div className="page-forside">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside")}/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-forside">
                    <button className="button-forside" onClick={() => navigate("/køb-plade")}>
                        <img src={BoardImage} alt="BoardImage" className="image-forside"/>
                        <div className="button-label-forside">
                            <span>Køb Plade</span>
                            <span className="arrow-icon">▶</span>
                        </div>
                    </button>

                    <button className="button-forside" onClick={() => navigate("/aktiv-spil")}>
                        <img src={Board} alt="Board" className="image-forside"/>
                        <div className="button-label-forside">
                            <span>Aktiv Spil</span>
                            <span className="arrow-icon">▶</span>
                        </div>
                    </button>

                    <button className="button-forside" onClick={() => navigate("/spilhistorik")}>
                        <img src={Board} alt="Board" className="image-forside"/>
                        <div className="button-label-forside">
                            <span>Spilhistorik</span>
                            <span className="arrow-icon">▶</span>
                        </div>
                    </button>

                    <button className="button-forside" onClick={() => navigate("/profil-bruger")}>
                        <img src={Person} alt="Person" className="image-forside"/>
                        <div className="button-label-forside">
                            <span>Profil</span>
                            <span className="arrow-icon">▶</span>
                        </div>
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ForsideBruger;