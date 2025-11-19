import '../CSS/VundetPlader.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

function VundetPlader() {
    return (
        <div className="page-vundet-plader">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-vundet-plader">

                    <input
                        type="text"
                        placeholder="Vundet Plader"
                    />

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default VundetPlader;