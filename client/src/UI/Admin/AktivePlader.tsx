import '../CSS/AktivePlader.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

function AktivePlader() {
    const data = [
        {brugernavn: "GertrudHansen", transaktionsNr: "TX-1001", pris: 20, betalt: true},
        {brugernavn: "Karl-Heinz-Schmidt", transaktionsNr: "TX-1002", pris: 40, betalt: true},
        {brugernavn: "LeopoldHoffmann", transaktionsNr: "TX-1003", pris: 160, betalt: true},
        {brugernavn: "Maximiliam_Wagner", transaktionsNr: "TX-1004", pris: 20, betalt: true},
        {brugernavn: "franzweber", transaktionsNr: "TX-1005", pris: 80, betalt: true},
        {brugernavn: "Babara-Schneider", transaktionsNr: "TX-1006", pris: 20, betalt: true},
        {brugernavn: "HanneloreFischer", transaktionsNr: "TX-1007", pris: 160, betalt: true},
        {brugernavn: "ferdinand-becker", transaktionsNr: "TX-1008", pris: 40, betalt: true},
        {brugernavn: "Franziska_Schulz", transaktionsNr: "TX-1009", pris: 40, betalt: true},
    ]

    return (
        <div className="page-aktive-plader">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
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
                            {data.map((row) => (
                                <tr key={row.brugernavn}>
                                    <td>{row.brugernavn}</td>
                                    <td>{row.transaktionsNr}</td>
                                    <td>{row.pris} DKK</td>
                                    <td>
                                        {row.betalt}
                                        <input type="checkbox" className="checkbox-aktive-plader"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="button-luk-uge">
                        Luk Uge
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AktivePlader;