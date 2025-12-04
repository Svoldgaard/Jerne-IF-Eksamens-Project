import '../CSS/SpilhistorikBruger.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useNavigate} from "react-router";
import { useSpilhistorikBruger} from "../../Hooks/useSpilhistorikBruger.ts";
import type { PladeResponse } from "../../Hooks/useSpilhistorikBruger.ts";

interface Props{
    brugerId: number;
}

export default function SpilhistorikBruger({brugerId}:Props) {
    const rows = 4;
    const cols = 4;
    const total = rows * cols;

    const navigate = useNavigate();
    const { plader, loading, error } = useSpilhistorikBruger(brugerId);

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error: {error}</p>;
    if (plader.length === 0)
        return <p>Ingen plader fundet.</p>;

    const pladerByWeek = plader.reduce((acc: Record<number, PladeResponse[]>, p) => {
        if (!acc[p.uge]) acc[p.uge] = [];
        acc[p.uge].push(p);
        return acc;
    }, {});
    
    return (
        <div className="page-spilhistorik-bruger">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside")}/>
            </span>

            <div className="main-container">
            <Header/>

                <div className="background-spilhistorik-bruger">
                    {Object.entries(pladerByWeek).map(([uge, boards]) => (
                        <Accordion key={uge}>
                            <AccordionSummary  expandIcon={<ExpandMoreIcon/>}
                                className={boards.some(b => b.isWinner) ? "accordion-vundet" : "accordion-tabt" }>
                                <Typography component="span"> Uge {uge} 2025 </Typography>
                                <Typography component="span">
                                    {boards[0].vindertal.join(", ")}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="boards-container">
                                    {boards.map(plade => {
                                        const activeSet = new Set(plade.tal.map(t => t -1));
                                        return (
                                            <div
                                                key={plade.id}
                                                className={`board-history ${plade.isWinner ? "winner-board" : ""}`}
                                            >
                                                <div
                                                className="cg-grid"
                                                style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}
                                                >
                                                    {Array.from({length: total}).map((_, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={
                                                                activeSet.has(idx)
                                                                    ? "cg-cell cg-cell--active"
                                                                    : "cg-cell"
                                                            }
                                                        >
                                                            {idx +1}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

// export default SpilhistorikBruger;