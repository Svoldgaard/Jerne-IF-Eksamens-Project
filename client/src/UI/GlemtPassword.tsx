import '../UI/CSS/OpretBruger.css'
import Logo from "../Assets/Logo.png";
import Header from "../Component/Header.tsx";
import Footer from "../Component/Footer.tsx";

function GelmtPassword() {
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
                        placeholder="Brugernavn"
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
                    <div>
                        <input
                            type="password"
                            placeholder="Bekræft Password"
                            className="input-opretbruger"
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

export default GelmtPassword;