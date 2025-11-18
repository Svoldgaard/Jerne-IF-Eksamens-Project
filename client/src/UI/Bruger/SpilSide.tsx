import '../CSS/SpilSide.css'
import {useState} from "react";

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
    
    //const activeSet = new Set(activeIndices);
    
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
                    
                    return (
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
    );
}

//export default SpilSide;