import '../CSS/ProfilAdmin.css';
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../Hooks/useProfile";

const ProfilAdmin = () => {
    const navigate = useNavigate();
    const {
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        handleSave,
        error
    } = useProfile();

    const data = [
        {navn: "Gertrud", efternavn: "Hansen", email: "gerhan@mail.dk", status: "aktiv"},
        {navn: "Karl-Heinz", efternavn: "Schmidt", email: "karsch@mail.dk", status: "aktiv"},
        {navn: "Leopold", efternavn: "Hoffmann", email: "leohof@mail.dk", status: "aktiv"},
        {navn: "Hannelore", efternavn: "Fischer", email: "hanfis@mail.dk", status: "aktiv"},
        {navn: "Maximiliam", efternavn: "Wagner", email: "maxwag@mail.dk", status: "aktiv"},
        {navn: "Franz", efternavn: "Weber", email: "Fraweb@mail.dk", status: "aktiv"},
        {navn: "Barbara", efternavn: "Schneider", email: "barsch@mail.dk", status: "aktiv"},
        {navn: "Ferdinand", efternavn: "Becker", email: "ferbec@mail.dk", status: "aktiv"},
        {navn: "Franziska", efternavn: "Schulz", email: "frasch@mail.dk", status: "aktiv"},
    ]

    if (error) return <div>{error}</div>;

    return (
        <div className="page-profil-admin">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside-admin")} />
            </span>

            <div className="main-container">
                <Header />
                <div className="background-profil-admin">
                    <h1 className="header-profil-admin">Profil</h1>

                   <div className="profil-admin-content">
                    <div className="profil-admin-left">
                    <div className="profil-admin-row">
                        <label>Navn:</label>
                        <input
                            type="text"
                            className="input-profil-admin"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="profil-admin-row">
                        <label>Efternavn:</label>
                        <input
                            type="text"
                            className="input-profil-admin"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="profil-admin-row">
                        <label>Email:</label>
                        <input
                            type="text"
                            className="input-profil-admin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    </div>


                    <div className="profil-admin-right">
                        <table className="table-brugere">
                            <thead>
                            <tr>
                                <th>Navn</th>
                                <th>Efternavn</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((row, index) => (
                                <tr key={row.email}>
                                    <td>{row.navn}</td>
                                    <td>{row.efternavn}</td>
                                    <td>{row.email}</td>
                                    <td>{row.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                   </div>
                    <button className="button-gem-profil-admin" onClick={handleSave}>
                        Gem
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};


export default ProfilAdmin;
