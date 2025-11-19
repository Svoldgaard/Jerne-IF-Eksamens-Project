import '../CSS/SpilSide.css'
import Logo from "../../../public/Logo.png";
//import Baggrund from "../../Component/Baggrund.tsx";
import {useState} from "react";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

export type ClickableGridUIProps ={
    activeIndices?: number[];
    onCellClick?: (index: number) => void;
    className?: string;
};

export default function SpilSide({ className =""}: ClickableGridUIProps) {
    const rows = 4;
    const cols = 4;
    const total = rows * cols;

    const [selectedPigeons, setSelectedPigeons] = useState<number[]>([]);

   //logic for changing colors when button is pressed
    const togglePigeon = (index: number) => {
        if (selectedPigeons.includes(index))
        {
            setSelectedPigeons(selectedPigeons.filter(pigeonId => pigeonId !== index));
        } else{
            setSelectedPigeons([...selectedPigeons, index]);
        }
    };

    return (
        <div className="page-plade">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>

            <div className="main-container">
            <Header/>
            <div className="background-spilside">
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
                    <p> Pris: </p>
                </div>
                <div>
                    <button className="button-gem">
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