import '../CSS/SpilSide.css'
import Logo from "../../../public/Logo.png";
//import Baggrund from "../../Component/Baggrund.tsx";
import Header from "../../Component/Header.tsx";
import {useTogglePigeon} from "../../Hooks/PigeonGameBoard.ts";

export type ClickableGridUIProps ={
    activeIndices?: number[];
    onCellClick?: (index: number) => void;
    className?: string;
};

export default function SpilSide({
    className ="",
    }: ClickableGridUIProps) {

    const rows = 4;
    const cols = 4;
    const total = rows * cols;

    //const activeSet = new Set(activeIndices);

    const {selectedPigeons, togglePigeon} = useTogglePigeon();

    return (
        <div className="page">
            <span className="logo">
                <img src={Logo} alt="Logo"/>
            </span>
            <Header/>
            <div className="background">
            <div>
                <p> Nuværende spil: </p>
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
                            className={`cg-cell ${isActive ? "cg-cell-active" : ""}`}
                            onClick={() => togglePigeon(idx)}
                        >
                            {idx + 1}
                        </button>
                );
                    })}
                </div>
            </div>
            <div>
                <p> Pris: </p>
            </div>
            <div>
                <button>
                    Betal
                </button>
                </div>

            <div>
                <p>
                    Gentag hver uge
                    <input type="checkbox"/>
                </p>
            </div>
            </div>
        </div>
    );
}

//export default SpilSide;