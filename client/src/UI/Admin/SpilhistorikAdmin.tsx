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

function SpilhistorikAdmin() {
    const navigate = useNavigate();
    const user = useAtomValue(userAtom);

    const brugerId = user?.userId;

    console.log("BRUGER ID:", brugerId);

    const {spiluger, loading, error } = useSpilhistorikBruger(brugerId);

    if (!brugerId) return <p>Loading…</p>;
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error}</p>;

    return (
        <div className="page-spilhistorik-admin">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside-admin")}/>
            </span>

            <div className="main-container">
                <Header/>

                <div className="background-spilhistorik-admin">
                    {spiluger.map(week => (
                        <Accordion key={`${week.year}-${week.uge}`}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className="accordion-admin"
                            >
                                <Typography component="span"> Uge {week.uge} {week.year} </Typography>
                                <Typography component="span"> {week.vindertal.join(", ")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="">

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

export default SpilhistorikAdmin;
