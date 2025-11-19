import '../CSS/SpilhistorikBruger.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

function SpilhistorikAdmin() {
    return (
        <div className="page-spilhistorik-admin">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-spilhistorik-admin">

                    <input
                        type="text"
                        placeholder="Spilhistorikadmin"
                    />

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SpilhistorikAdmin;