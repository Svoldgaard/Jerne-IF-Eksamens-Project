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

                    <h1 className="header-profil">Profil</h1>
                    <div className="profil-row">
                        <label>Navn:</label>
                        <input
                            type="text"
                            placeholder="Navn"
                            className="input-profil"
                        />
                    </div>
                    <div className="profil-row">
                        <label>Efternavn:</label>
                        <input
                            type="text"
                            placeholder="Efternavn"
                            className="input-profil"
                        />
                    </div>
                    <div className="profil-row">
                        <label>Brugernavn:</label>
                        <input
                            type="text"
                            placeholder="Brugernavn"
                            className="input-profil"
                        />
                    </div>
                    <div className="profil-row">
                        <label>Mobil nr:</label>
                        <input
                            type="text"
                            placeholder="Mobil nr"
                            className="input-profil"
                        />
                    </div>
                    <div className="profil-row">
                        <label>Email:</label>
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-profil"
                        />
                    </div>
                    <button className="button-gem-profil">
                        Gem
                    </button>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProfilAdmin;