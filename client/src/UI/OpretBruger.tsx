import '../UI/CSS/OpretBruger.css'
import Logo from "../../public/Logo.png";
import Header from "../Component/Header.tsx";
import Footer from "../Component/Footer.tsx";

function ProfilBruger() {
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
                        className="input-opretbruger"
                    />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Efternavn"
                            className="input-opretbruger"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Brugernavn"
                            className="input-opretbruger"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Mobil nr"
                            className="input-opretbruger"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-opretbruger"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-opretbruger"
                        />
                    </div>
                    <button>
                        Opret
                    </button>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProfilBruger;