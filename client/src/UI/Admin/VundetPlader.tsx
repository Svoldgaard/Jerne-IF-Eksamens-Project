import '../CSS/VundetPlader.css'
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {useNavigate} from "react-router-dom";
import {useAdminPlades} from "../../Hooks/useAdminPlades.ts";
import {useEffect} from "react";

function VundetPlader() {
    // const data = [
    //     {brugernavn: "Karl-Heinz-Schmidt", transaktionsNr: "TX-1002", pris: 40, udbetalt: true},
    //     {brugernavn: "LeopoldHoffmann", transaktionsNr: "TX-1003", pris: 160, udbetalt: true},
    //     {brugernavn: "Maximiliam_Wagner", transaktionsNr: "TX-1004", pris: 20, udbetalt: true},
    //     {brugernavn: "Babara-Schneider", transaktionsNr: "TX-1006", pris: 20, udbetalt: true},
    //     {brugernavn: "Franziska_Schulz", transaktionsNr: "TX-1009", pris: 40, udbetalt: true},
    // ]

    const {handleStartNewWeek, isLoading, fetchWinners, winningPlades, updateUdbetalt} = useAdminPlades();

    const navigate = useNavigate();


    const onStartNewWeek = async () => {
       if(!window.confirm("Er du sikker på, at du vil starte en nye uge? Dette vil åbne spillet for brugerne igen. ")) {
           return;
       }

       const success: any = await handleStartNewWeek();

       if(success) {
           alert("En ny uge er startet!")
           navigate("/forside-admin");
       }else{
           alert("Kunne ikke starte ny uge :(")
       }
    };

    const handleCheckboxChange = (pladeId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        updateUdbetalt(pladeId, e.target.checked);
    };



    return (
        <div className="page-vundet-plader">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside-admin")}/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-vundet-plader">

                    <h2 className="header-vundet-plader">Nuværende spil: Uge 48 2025</h2>
                    <table className="price-table-vundet-plader">
                        <thead>
                        <tr>
                            <th>Brugernavn</th>
                            <th>Transkations nr</th>
                            <th>Udbetalt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {winningPlades.map((row) =>
                            (
                            <tr key={row.pladeId}>
                                <td>{row.brugernavn}</td>
                                <td>{row.transaktionsNr}</td>
                                <td>

                                    <input type="checkbox"
                                           className="checkbox-vundet-plader"
                                           checked={row.udbetalt}
                                           onChange={(e) => handleCheckboxChange(row.pladeId!, e)}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <button className="button-luk-uge"
                            onClick={onStartNewWeek}
                            disabled={isLoading}
                            style={{ cursor: isLoading ? 'wait' : 'pointer', opacity: isLoading ? 0.7 : 1 }}>
                        {isLoading ? "Starter..." : "Start ny uge"}
                    </button>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default VundetPlader;