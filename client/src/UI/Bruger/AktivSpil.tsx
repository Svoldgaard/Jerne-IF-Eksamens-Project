import '../CSS/AktivSpil.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {useNavigate} from "react-router-dom";

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

    const mockBoards: Board[] = [
        { id: "TX-1001", activeIndices: [3, 5, 10, 8, 15] },
        { id: "TX-1002", activeIndices: [1, 6, 7, 12, 14,5] },
        { id: "TX-1003", activeIndices: [2, 4, 8, 15, 3, 5] },
        { id: "TX-1004", activeIndices: [0, 2, 3, 16, 4, 15] },
        { id: "TX-1005", activeIndices: [5, 6, 9, 14, 8, 10, 7] }
    ];

    const navigate = useNavigate();

    // const getRandomInt = (min: number, max: number) =>
    //     Math.floor(Math.random() * (max -min + 1)) + min;
    //
    // const mockBoards: Board[] = Array.from({length: 10}, (_, i) => {
    //     const count = getRandomInt (5, 8);
    //
    //     const activeIndices = Array.from({length: 16}, (_, i) => i)
    //         .sort(() => Math.random() - 0.5)
    //         .slice(0, count);
    //
    //     return {
    //         id: `TX-${1000 + i}`,
    //         activeIndices,
    //     };
    // })

    return (
        <div className="page-aktivspil">
            <span className="logo-aktivspil">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside")}/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-aktivspil">
                    <div className="uge-aktivspil">
                        <a className="text-aktivspil"> Uge: 48 2025</a>
                    </div>

                    <div className={`boards-list-container ${className}`}>
                        {mockBoards.map((board, index) => {
                            const activeSet = new Set(board.activeIndices);
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
                                                <input type="checkbox" className="checkbox-aktivspil" defaultChecked={index < 2}/>
                                            </div>
                                            <div className="board-header">
                                                Transaktionsnr: {board.id}
                                            </div>
                                            <div className="board-header">
                                                Status: Ikke aktiv
                                            </div>
                                        </div>
                                    </div>
                                    {index < mockBoards.length -1 && <hr className="separator" />}
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