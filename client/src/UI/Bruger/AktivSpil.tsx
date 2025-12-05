import '../CSS/AktivSpil.css'
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {useNavigate} from "react-router-dom";

import {useActivePladesClient} from "../../Hooks/useActivePlades.ts";
import {getCurrentWeekNumber, getCurrentYear} from "../../Utils/dateUtils.ts";


export type Board = {
    id: string;
    activeIndices: number[];
    gentag: boolean;
    pris: number;
}


export default function AktivSpil() {
    const rows = 4;
    const cols = 4;
    const total = rows * cols;


    const navigate = useNavigate();

    const {activePlades, isLoading, error, updateGentag} = useActivePladesClient();

    const currentWeek = getCurrentWeekNumber();
    const currentYear = getCurrentYear();

    const boardsToDisplay = activePlades.map(plade => ({
        id: plade.id || "N/A",
        activeIndices: plade.tal ? plade.tal.map(num => num - 1) : [],
        gentage: plade.gentag || false,
        pris: plade.pris || 0
    }));


    return (
        <div className="page-aktivspil">
            <span className="logo-aktivspil">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside")}/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-aktivspil">
                    <div className="uge-aktivspil">
                        <a className="text-aktivspil"> Uge: {currentWeek} {currentYear}</a>
                    </div>

                    <div className={`boards-list-container`}>
                        {isLoading && <p style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            color: 'white'}}>Henter aktive spil...</p>}

                        {error && <p style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            color: '#ff6b6b'}}>Fejl: {error}</p>}

                        {!isLoading && !error && boardsToDisplay.length === 0 && (
                            <p style={{textAlign: 'center', marginTop: '20px', color: '#ff6b6b'}}>
                                Ingen aktive spil fundet. :(
                            </p>
                        )}
                        {boardsToDisplay.map((board, index) => {
                            const activeSet = new Set(board.activeIndices);

                            const handleGentagChange = async (e: React.ChangeEvent<HTMLInputElement>)  => {
                                const success = await updateGentag(board.id, e.target.checked)
                                if (success) {
                                    console.log(`Gentag status for ${board.id} is up to date`)
                                } else{
                                    alert("Kunne ikke opdatere gentag status ")
                                }
                            }

                            return(
                                <div key={board.id} className="board-wrapper">
                                    <div className="board-row">
                                        <div
                                            className="cg-grid"
                                            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
                                        >
                                            {Array.from({ length: total }).map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={
                                                        activeSet.has(idx)
                                                            ? "cg-cell cg-cell-active"
                                                            : "cg-cell button-aktivspil"
                                                    }
                                                >
                                                    {idx + 1}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="board-info">
                                            <div className="repeat-row">
                                                <p>Gentag hver uge</p>
                                                <input type="checkbox" className="checkbox-aktivspil"
                                                       checked={board.gentage}
                                                       onChange={handleGentagChange}/>
                                            </div>
                                            <div className="board-header">
                                                Transaktionsnr: {board.id}
                                            </div>
                                            <div className="board-header">
                                                Status: Ikke aktiv
                                            </div>
                                        </div>
                                    </div>
                                    {index < boardsToDisplay.length -1 && <hr className="separator" />}
                                </div>
                            );

                        })}

                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    );
}