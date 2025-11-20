import '../CSS/SpilhistorikBruger.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

function SpilhistorikBruger() {
    return (
        <div className="page-spilhistorik-bruger">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
            <Header/>
                <div className="background-spilhistorik-bruger">

            <input
                type="text"
                placeholder="SpilhistorikBruger"
            />

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SpilhistorikBruger;