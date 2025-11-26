import '../CSS/SpilhistorikBruger.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useNavigate} from "react-router";

export type Board = {
    id: string;
    activeIndices: number[];
    isWinner?: boolean;
}

const mockDataByWeek: Record<string, Board[]> = {
    week48: [
        {id: "TX-1001", activeIndices: [3, 5, 10, 8, 15]},
        {id: "TX-1002", activeIndices: [1, 6, 7, 12, 14, 5]},
        {id: "TX-1003", activeIndices: [2, 4, 8, 15, 3, 5, 10, 12]},
        {id: "TX-1004", activeIndices: [0, 2, 3, 16, 4, 15]},
        {id: "TX-1005", activeIndices: [5, 6, 9, 14, 8, 10, 7]}
    ],
    week46: [
        {id: "TX-1006", activeIndices: [0, 3, 5, 7, 12]},
        {id: "TX-1007", activeIndices: [1, 4, 6, 9, 12, 14]},
        {id: "TX-1008", activeIndices: [2, 11, 8, 13, 15]},
        {id: "TX-1009", activeIndices: [0, 2, 6, 8, 12, 15, 14]},
        {id: "TX-1010", activeIndices: [5, 6, 9, 14, 8, 10, 7], isWinner: true},
    ],
    week45: [
        {id: "TX-1011", activeIndices: [2, 5, 7, 11, 14]},
        {id: "TX-1012", activeIndices: [1, 6, 7, 11, 14, 5], isWinner: true},
        {id: "TX-1013", activeIndices: [0, 3, 6, 9, 12, 15]},
        {id: "TX-1014", activeIndices: [1, 4, 8, 10, 13]},
        {id: "TX-1015", activeIndices: [5, 6, 9, 0, 2, 11, 15]}
    ]

};

function SpilhistorikBruger() {
    const rows = 4;
    const cols = 4;
    const total = rows * cols;

    const navigate = useNavigate();

    return (
        <div className="page-spilhistorik-bruger">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside")}/>
            </span>
            <div className="main-container">
            <Header/>
                <div className="background-spilhistorik-bruger">

                    <Accordion>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon/>}
                            className="accordion-tabt"
                            aria-controls="panel1-content"
                            id="panel1-header">
                        <Typography component="span"> Uge 47 2025 </Typography>
                            <Typography component="span">15, 5, 8</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="boards-container">
                                {mockDataByWeek.week48.map(board => {
                                    const activeSet = new Set(board.activeIndices);

                                    return(
                                        <div key={board.id} className={`board-history ${board.isWinner ? "winner-board" : ""}`}>
                                            <div className="cg-grid" style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}>
                                                {Array.from({length: total}).map((_, idx) => (
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
                                        </div>
                                    );
                                })}
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion disabled>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              aria-controls="panel2-content"
                              id="panel2-header">
                            <Typography component="span"> Uge 46 2025 </Typography>
                            <Typography component="span">11, 9, 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Ikke deltaget
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              className="accordion-vundet"
                              aria-controls="panel3-content"
                              id="panel3-header">
                            <Typography component="span"> Uge 45 2025 </Typography>
                            <Typography component="span">10, 6, 9</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="boards-container">
                                {mockDataByWeek.week46.map(board => {
                                    const activeSet = new Set(board.activeIndices);

                                    return(
                                        <div key={board.id} className={`board-history ${board.isWinner ? "winner-board" : ""}`}>
                                            <div className="cg-grid" style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}>
                                                {Array.from({length: total}).map((_, idx) => (
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
                                        </div>
                                    );
                                })}
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              className="accordion-vundet"
                              aria-controls="panel4-content"
                              id="panel4-header">
                            <Typography component="span"> Uge 44 2025 </Typography>
                            <Typography component="span">7, 12, 15</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="boards-container">
                                {mockDataByWeek.week45.map(board => {
                                    const activeSet = new Set(board.activeIndices);

                                    return(
                                        <div key={board.id} className={`board-history ${board.isWinner ? "winner-board" : ""}`}>
                                            <div className="cg-grid" style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}>
                                                {Array.from({length: total}).map((_, idx) => (
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
                                        </div>
                                    );
                                })}
                            </div>
                        </AccordionDetails>
                    </Accordion>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SpilhistorikBruger;