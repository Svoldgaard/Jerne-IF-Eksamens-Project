import '../CSS/AktivePlader.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

function AktivePlader() {
    return (
        <div className="page-aktive-plader">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-aktive-plader">

                    <input
                        type="text"
                        placeholder="AktivePlader"
                    />

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AktivePlader;