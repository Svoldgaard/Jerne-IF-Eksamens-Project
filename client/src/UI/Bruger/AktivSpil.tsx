import '../CSS/AktivSpil.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";

export type Board = {
    id: string;
    activeIndices: number[];
}

export type BoardListProps = {
    boards?: Board[];
    className?: string;
}

export default function AktivSpil({boards = [], className = ""} : BoardListProps) {
    const rows = 4;
    const cols = 4;
    const total = rows * cols;

    return (
        <div className="page-aktivspil">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
                <Header/>
            <div className="background-aktivspil">

        <div className={`boards-list-container ${className}`}>
            {boards.map((board) => {
                const activeSet = new Set(board.activeIndices);
                return(
                    <div key={board.id} className="board-wrapper">
                        <div className="board-header">Transaktionsnr: {board.id}</div>
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
                        <div>
                        <hr className="board-separator" />
                        </div>
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

//export default AktivSpil;