import '../CSS/SpilSide.css'
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header.tsx";
import {useTogglePigeon} from "../../Hooks/PigeonGameBoard.ts";
import Footer from "../../Component/Footer.tsx";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {getCurrentWeekNumber, getCurrentYear} from "../../Utils/dateUtils.ts";

export type ClickableGridUIProps ={
    activeIndices?: number[];
    onCellClick?: (index: number) => void;
    className?: string;
};

export default function SpilSide({ className =""}: ClickableGridUIProps) {

    const currentWeek = getCurrentWeekNumber();
    const currentYear = getCurrentYear();

    const rows = 4;
    const cols = 4;
    const total = rows * cols;

    const navigate = useNavigate();

    const [isRepeatCheked, setIsRepeat] = useState(false);

    const {selectedPigeons,
        togglePigeon,
        currentPrice,
        handleAlertMin,
        showAlertMin,
        showAlertMax,
        buyPlade,
        currentUser,
        isGameAvailable,
        loadingStatus} = useTogglePigeon();

    const handlePayment = async () => {
         const isValid = handleAlertMin();
         if (!isValid) return;

        if(!currentUser || !currentUser.userId){
            alert("Du skal være logget ind for at købe en plade.");
            return;
        }

        if (!isGameAvailable) {
            alert("Spillet er desværre lukket for denne uge. Vent venligst på at admin åbner næste uge.");
            return;
        }

        const success = await buyPlade(currentUser.userId, isRepeatCheked);

         if(success){
             alert("Tak for dit køb! ");
             navigate("/aktiv-spil");
         } else{
                alert("Der opstod en fejl under købet. Prøv venligst igen.");
         }
    }

    const isBetaleButtonActive = selectedPigeons.length > 4;

    return (
        <div className="page-plade">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside")}/>
            </span>

            <div className="main-container">
                <Header/>
                <div className="background-spilside">

                    <div>
                        <a className="text-uge"> Nuværende spil: Uge {currentWeek} {currentYear}</a>
                    </div>

                    {!loadingStatus && !isGameAvailable && (
                        <div style={{textAlign: 'center', padding: '20px', backgroundColor: '#ffebee', color: '#c62828', margin: '10px', borderRadius: '5px'}}>
                            <h3>Spillet er lukket for denne uge</h3>
                            <p>Afventer at en administrator åbner for næste uge.</p>
                        </div>
                    )}

                    <div className={`cg-container ${className}`} style={{ opacity: isGameAvailable ? 1 : 0.5, pointerEvents: isGameAvailable ? 'auto' : 'none' }}>
                        <div
                        role="grid"
                        aria-rowcount={rows}
                        aria-colcount={cols}
                        className="cg-grid"
                        style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}
                        >
                            {Array.from({length: total}).map((_, idx) => {
                                const isActive = selectedPigeons.includes(idx);
                                return(
                                <button
                                    key={idx}
                                    role="gridcell"
                                    aria-selected={isActive}
                                    className={`cg-cell button-plade ${isActive ? "cg-cell-active" : ""}`}
                                    onClick={() => togglePigeon(idx)}
                                >
                                    {idx + 1}
                                </button>
                                );
                            })}
                        </div>
                    </div>
                        <p className="text"> Pris: {currentPrice} DKK </p>
                    <div>
                        {showAlertMax && (
                            <div style={{ maxWidth: '300px', margin: '10px auto' }}>
                                <Alert severity="warning">
                                    Du har valgt det maksimale antal på 8 duer!
                                </Alert>
                            </div>
                        )}
                        {showAlertMin && (
                            <div style={{ maxWidth: '300px', margin: '10px auto' }}>
                                <Alert severity="warning">
                                    Vælg mindst 5 duer!
                                </Alert>
                            </div>
                        )}

                        <button
                            className={`button-gem ${isBetaleButtonActive && isGameAvailable ? 'button-pay-active' : ''}`}
                            disabled={!isGameAvailable}
                            onClick={handlePayment}
                            style={{ cursor: isGameAvailable ? 'pointer' : 'not-allowed', backgroundColor: isGameAvailable ? '' : 'grey' }}
                        >
                            {isGameAvailable ? "Betal" : "Lukket"}
                        </button>
                    </div>
                    <div className="repeat-row">
                        <p>Gentag hver uge</p>
                            <input type="checkbox"
                                   className="checkbox-plade"
                                    checked={isRepeatCheked}
                                    onChange={(e) => setIsRepeat(e.target.checked)}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
