import '../CSS/Profil.css'
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {useNavigate} from "react-router";
import {useProfile} from "../../Hooks/useProfile.ts";

function ProfilBruger() {
    const navigate = useNavigate();
    const {
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        handleSave,
        error
    }=useProfile();

    if (error) return <div>{error}</div>;

    return (
        <div className="page-profil">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside")}/>
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    </div>
                    <div className="profil-row">
                        <label>Efternavn:</label>
                        <input
                            type="text"
                            placeholder="Efternavn"
                            className="input-profil"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="profil-row">
                        <label>Email:</label>
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-profil"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="button-gem-profil" onClick={handleSave}>
                        Gem
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProfilBruger;