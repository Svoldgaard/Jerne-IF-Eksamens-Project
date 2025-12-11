import '../CSS/AktivePlader.css'
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {useNavigate} from "react-router-dom";
import {useAdminPlades} from "../../Hooks/useAdminPlades.ts";
import {useEffect, useRef} from "react";


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

    const { adminPlades,
        isLoading,
        error,
        updateBetalt,
        closeCurrentWeek,
        checkAdminWeekStatus } = useAdminPlades();

    const hasCheckedStatus = useRef(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(hasCheckedStatus.current) return;

        hasCheckedStatus.current = true;

        const verifyStatus = async () => {
            const isOpen = await checkAdminWeekStatus();

            if (!isOpen) {
                alert("Den nuværende uge er allerede lukket. Du vil blive omdirigeret til vindertal siden.");
                navigate("/vindertal-admin");
            }
        };
        verifyStatus();
    },  []);

    const handleBetaltStatus = async (pladeId: string, e: React.ChangeEvent<HTMLInputElement>)  => {

        const newStatus = e.target.checked;

        const success = await updateBetalt(pladeId, newStatus);

        if (!success) {

            alert("Kunne ikke opdatere gentag status ")

        }
    }

    const handleCloseWeek = async () => {
        if (!window.confirm("Er du sikker på at du vil lukke ugen? Dette kan ikke fortrydes ")) {
            return;
        }

        const success = await closeCurrentWeek();

        if (success) {
            alert("Uge lukket succesfuldt!");

            navigate("/vindertal-admin");
        } else {
            alert("Kunne ikke lukke ugen.!")
        }
    }

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
                                        <input type="checkbox"
                                               className="checkbox-aktive-plader"
                                               checked={row.betalt}
                                               onChange={(e) => handleBetaltStatus(row.pladeId, e)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        className="button-luk-uge"
                        onClick={handleCloseWeek}
                        disabled={isLoading}>
                        Luk Uge
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AktivePlader;