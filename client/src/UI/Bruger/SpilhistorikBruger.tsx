import '../CSS/SpilhistorikBruger.css'
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useNavigate} from "react-router";
import {useSpilhistorikBruger} from "../../Hooks/useSpilhistorikBruger.ts";
import {useAtomValue} from "jotai";
import {userAtom} from "../../Atoms/Auth.ts";

export default function SpilhistorikBruger() {
    const rows = 4;
    const cols = 4;
    const total = rows * cols;

    const navigate = useNavigate();
    const user = useAtomValue(userAtom);

    const brugerId = user?.userId;

    const { plader, spiluger, loading, error } = useSpilhistorikBruger(brugerId);

    if (!brugerId) return <p>Loading…</p>;
    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error: {error}</p>;

    const pladerByWeek = plader.reduce((acc: Record<string, any[]>, p) => {
        const key = `${p.year}-${p.uge}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(p);
        return acc;
    }, {});

    const filteredWeeks = spiluger
        .filter(w => w.vindertal && w.vindertal.length > 0)
        .map(w => {
            const key = `${w.year}-${w.uge}`;
            return{
                key,
                year: w.year,
                uge: w.uge,
                vindertal: w.vindertal,
                boards: pladerByWeek[key] ?? [],
                hasBoards: (pladerByWeek[key] ?? []).length > 0
            }
        });

    filteredWeeks.sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.uge - a.uge;
    });

    return (
        <div className="page-spilhistorik-bruger">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside")} />
            </span>

            <div className="main-container">
                <Header />

                <div className="background-spilhistorik-bruger">
                    {filteredWeeks.map(week => (
                        <Accordion
                            key={week.key}
                            disabled={!week.hasBoards}
                            className={!week.hasBoards ? "accordion-disabled" :""}>
                            <AccordionSummary
                                expandIcon={week.hasBoards ? <ExpandMoreIcon /> : null}
                                className={!week.hasBoards ? "accordion-disabled" : week.boards.some(b => b.isWinner) ? "accordion-vundet" : "accordion-tabt"}
                            >
                                <Typography component="span">Uge {week.uge} {week.year}</Typography>
                                <Typography component="span">{week.vindertal.join(", ")}</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <div className="boards-container">
                                    {week.hasBoards ? (
                                        week.boards.map(plade => {
                                            const activeSet = new Set(plade.tal);
                                            return (
                                                <div
                                                    key={plade.id}
                                                    className={`board-history ${plade.isWinner ? "winner-board" : ""}`}
                                                >
                                                    <div
                                                        className="cg-grid"
                                                        style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}
                                                    >
                                                        {Array.from({length: total}).map((_, idx) => {
                                                            const number = idx +1;
                                                            return(
                                                                <div
                                                                    key={idx}
                                                                    className={
                                                                        activeSet.has(number)
                                                                            ? "cg-cell cg-cell-active"
                                                                            : "cg-cell"
                                                                    }
                                                                >
                                                                    {number}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p>Ingen plader denne uge. Vindertal: {week.vindertal.join(", ")}</p>
                                    )}
                                </div>
                            </AccordionDetails>

                        </Accordion>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
