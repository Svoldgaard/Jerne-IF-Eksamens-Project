import '../CSS/AktivePlader.css'
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {useNavigate} from "react-router-dom";
import {useAdminPlades} from "../../Hooks/useAdminPlades.ts";


function AktivePlader() {
    // const data = [
    //     {brugernavn: "GertrudHansen", transaktionsNr: "TX-1001", pris: 20, betalt: true},
    //     {brugernavn: "Karl-Heinz-Schmidt", transaktionsNr: "TX-1002", pris: 40},
    //     {brugernavn: "LeopoldHoffmann", transaktionsNr: "TX-1003", pris: 160},
    //     {brugernavn: "Maximiliam_Wagner", transaktionsNr: "TX-1004", pris: 20},
    //     {brugernavn: "franzweber", transaktionsNr: "TX-1005", pris: 80},
    //     {brugernavn: "Babara-Schneider", transaktionsNr: "TX-1006", pris: 20},
    //     {brugernavn: "HanneloreFischer", transaktionsNr: "TX-1007", pris: 160},
    //     {brugernavn: "ferdinand-becker", transaktionsNr: "TX-1008", pris: 40},
    //     {brugernavn: "Franziska_Schulz", transaktionsNr: "TX-1009", pris: 40},
    // ]

    const { adminPlades, isLoading, error } = useAdminPlades();

    const navigate = useNavigate();

    return (
        <div className="page-aktive-plader">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside-admin")}/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-aktive-plader">
                    <h2 className="header-aktive-plader">Nuværende spil: Uge 48 2025</h2>
                    <table className="price-table-aktive-plader">
                        <thead>
                            <tr>
                                <th>Brugernavn</th>
                                <th>Transkations nr</th>
                                <th>Pris</th>
                                <th>Betalt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminPlades.map((row) =>
                                (
                                <tr key={row.pladeId}>
                                    <td>{row.brugernavn}</td>
                                    <td>{row.transaktionsNr}</td>
                                    <td>{row.pris} DKK</td>
                                    <td>
                                        {row.active}
                                        <input type="checkbox"
                                               className="checkbox-aktive-plader"
                                               defaultChecked={row.active} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        className="button-luk-uge"
                        onClick={() => navigate("/vindertal-admin")}>
                        Luk Uge
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AktivePlader;