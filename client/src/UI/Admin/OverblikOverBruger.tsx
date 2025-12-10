import '../CSS/ProfilAdmin.css';
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useNavigate } from "react-router-dom";
import { useOverblikOverBruger } from "../../Hooks/useOverblikOverBruger.ts";


const OverblikOverBruger = () => {
    const navigate = useNavigate();
    const { profiles, loading, error } = useOverblikOverBruger();





    if (loading) return <div>Indlæser profiler...</div>;
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
                            {profiles.map((p) => (
                                <tr key={p.email}>
                                    <td>{p.fnavn}</td>
                                    <td>{p.lnavn}</td>
                                    <td>{p.email}</td>
                                    <td>{p.aktiv ? "Aktiv" : "Inaktiv"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                   </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};


export default OverblikOverBruger;
