import '../CSS/Profil.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

function ProfilAdmin() {
    return (
        <div className="page-profil">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-profil">

                    <div>
                        <input
                            type="text"
                            placeholder="Navn"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Efternavn"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Brugernavn"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Mobil nr"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <button>
                        Gem
                    </button>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProfilAdmin;