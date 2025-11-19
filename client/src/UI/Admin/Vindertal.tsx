import '../CSS/Vindertal.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

function Vindertal() {
    return (
        <div className="page-vindertal">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-vindertal">

                    <input
                        type="text"
                        placeholder="Vindertal"
                    />

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Vindertal;