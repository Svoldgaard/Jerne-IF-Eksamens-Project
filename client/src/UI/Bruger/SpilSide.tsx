import '../CSS/SpilSide.css'
import Logo from "../../../public/Logo.png";
import Baggrund from "../../Component/Baggrund.tsx";

export type ClickableGridUIProps ={
    activeIndices?: number[];
    onCellClick?: (index: number) => void;
    className?: string;
};

export default function SpilSide({
    activeIndices = [],
    onCellClick,
    className ="",
    }: ClickableGridUIProps) {

    const rows = 4;
    const cols = 4;
    const total = rows * cols;
    const activeSet = new Set(activeIndices);

    return (
        <div>
            <span className="logo">
                <img src={Logo} alt="Logo"/>
            </span>
            <Baggrund>
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
                    {Array.from({length: total}).map((_, idx) => (
                        <button
                            key={idx}
                            role="gridcell"
                            aria-selected={activeSet.has(idx)}
                            className={`cg-cell ${activeSet.has(idx) ? "cg-cell-active" : ""}`}
                            onClick={onCellClick ? () => onCellClick(idx) : undefined}
                        >
                            {idx + 1}
                        </button>
                    ))}
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
                <Baggrund/>
        </div>
    );
}

//export default SpilSide;