import '../CSS/AktivSpil.css'

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
                                            : "cg-cell"
                                    }
                                >
                                    {idx + 1}
                                </div>
                            ))}
                        </div>

                        <hr className="board-separator" />
                    </div>
                );
            })}

        </div>
    );
}

//export default AktivSpil;