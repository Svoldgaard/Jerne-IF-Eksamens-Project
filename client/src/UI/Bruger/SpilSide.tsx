import '../CSS/SpilSide.css'
import Logo from "../../../public/Logo.png";
//import Baggrund from "../../Component/Baggrund.tsx";
import Header from "../../Component/Header.tsx";
import {useTogglePigeon} from "../../Hooks/PigeonGameBoard.ts";
import Footer from "../../Component/Footer.tsx";
import Alert from '@mui/material/Alert';


export type ClickableGridUIProps ={
    activeIndices?: number[];
    onCellClick?: (index: number) => void;
    className?: string;
};

export default function SpilSide({ className =""}: ClickableGridUIProps) {
    const rows = 4;
    const cols = 4;
    const total = rows * cols;

    //const activeSet = new Set(activeIndices);

    const {selectedPigeons, togglePigeon, currentPrice, handleAlertMin, showAlertMin, showAlertMax} = useTogglePigeon();

    return (
        <div className="page-plade">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>

            <div className="main-container">
            <Header/>
            <div className="background-spilside">

            <div>
                <a className="text"> Nuværende spil: </a>
            </div>

            <div className={`cg-container ${className}`}>
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
            <div>
                <a className="text"> Pris: {currentPrice} DKK </a>
            </div>

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


                <button className="button-gem" onClick={handleAlertMin}>
                    Betal
                </button>

                </div>

                <div>
                    <p>
                        Gentag hver uge
                        <input type="checkbox" className="checkbox-plade"/>
                    </p>
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    );
}

//export default SpilSide;