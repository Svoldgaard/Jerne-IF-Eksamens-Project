import '../CSS/SpilhistorikAdmin.css'
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useNavigate} from "react-router-dom";
import {userAtom} from "../../Atoms/Auth.ts";
import {useAtomValue} from "jotai";
import {useSpilhistorikBruger} from "../../Hooks/useSpilhistorikBruger.ts";
import { useWeekPlayers } from "../../Hooks/useWeekPlayers";

function SpilhistorikAdmin() {
    const navigate = useNavigate();
    const user = useAtomValue(userAtom);

    const brugerId = user?.userId;

    // console.log("BRUGER ID:", brugerId);

    const {spiluger, loading, error } = useSpilhistorikBruger(brugerId);
    const { weekPlayers, loadWeekData } = useWeekPlayers();

    if (!brugerId) return <p>Loading…</p>;
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error}</p>;

    const filteredWeeks = spiluger
        .filter(w => w.vindertal && w.vindertal.length > 0)
        .map(w => {
            const key = `${w.year}-${w.uge}`;
            return{
                key,
                year: w.year,
                uge: w.uge,
                vindertal: w.vindertal,
            }
        });

    filteredWeeks.sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.uge - a.uge;
    });


    return (
        <div className="page-spilhistorik-admin">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside-admin")}/>
            </span>

            <div className="main-container">
                <Header/>

                <div className="background-spilhistorik-admin">
                    {filteredWeeks.map(week => (
                        <Accordion key={week.key}
                                   onChange={() => loadWeekData(week.year, week.uge)}
                                   className="accordion-admin">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className="accordion-admin"
                            >
                                <Typography component="span"> Uge {week.uge} {week.year} </Typography>
                                <Typography component="span"> {week.vindertal.join(", ")}</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                {weekPlayers[week.key] ? (
                                <div className="week-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>Transaktions nr.</th>
                                                <th>Valgte tal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {/*{weekPlayers[week.key].map(p => (*/}
                                        {/*    <tr key={p.pladeId}*/}
                                        {/*        className={p.isWinner ? "winner-row" : ""}>*/}
                                        {/*        <td>{p.email}</td>*/}
                                        {/*        <td>{p.transaktionsNr}</td>*/}
                                        {/*        <td>{p.tal.join(", ")}</td>*/}
                                        {/*    </tr>*/}
                                        {/*))}*/}
                                        {weekPlayers[week.key].map(p => {
                                            console.log("ROW DATA:", p);
                                            return (
                                                <tr
                                                    key={p.pladeId}
                                                    className={p.isWinner ? "winner-row" : ""}
                                                >
                                                    <td>{p.email}</td>
                                                    <td>{p.transaktionsNr}</td>
                                                    <td>{p.tal.join(", ")}</td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                ) : (
                                    <p>Henter data…</p>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SpilhistorikAdmin;
