import '../UI/CSS/Regler.css'
import Logo from "../Assets/Logo.png";
import Header from "../Component/Header.tsx";
import Footer from "../Component/Footer.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useRegler } from "../Hooks/useRegler";

function Regler() {
    const rules = useRegler();
    const parts = rules.split("=== PRICE_TABLE ===");
    const navigate = useNavigate();
    const location = useLocation();

    const goToForside = () => {
        if (location.pathname.includes("admin")) {
            navigate("/forside-admin");
        } else {
            navigate("/forside");
        }
    };

    return (
        <div className="page-regler">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={goToForside}/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-profil">
                    <h1 className="header-regler">Regler for spillet Døde Duer</h1>

                    <div className="text-regler">
                        {parts[0]}
                    </div>

                    <table className="price-table">
                        <thead>
                            <tr>
                                <th>Antal tal</th>
                                <th>Pris</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>5</td>
                                <td>20 DKK</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>40 DKK</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>80 DKK</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>160 DKK</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="text-regler">
                        {parts[1]}
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Regler;