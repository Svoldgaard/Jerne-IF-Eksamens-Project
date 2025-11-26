import '../CSS/SpilhistorikAdmin.css'
import Logo from "../../../public/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {Accordion, AccordionSummary, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


function SpilhistorikAdmin() {
    const navigate = useNavigate();

    return (
        <div className="page-spilhistorik-admin">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside-admin")}/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-spilhistorik-admin">

                    <Accordion disabled>
                        <AccordionSummary aria-controls="panel2-content"
                                          id="panel2-header">
                            <Typography component="span"> Uge 47 2025 </Typography>
                            <Typography component="span">11, 9, 1</Typography>
                        </AccordionSummary>
                    </Accordion>

                    <Accordion disabled>
                        <AccordionSummary aria-controls="panel2-content"
                                          id="panel2-header">
                            <Typography component="span"> Uge 46 2025 </Typography>
                            <Typography component="span">10, 6, 9</Typography>
                        </AccordionSummary>
                    </Accordion>

                    <Accordion disabled>
                        <AccordionSummary aria-controls="panel2-content"
                                          id="panel2-header">
                            <Typography component="span"> Uge 45 2025 </Typography>
                            <Typography component="span">7, 12, 15</Typography>
                        </AccordionSummary>
                    </Accordion>

                    <Accordion disabled>
                        <AccordionSummary aria-controls="panel2-content"
                                          id="panel2-header">
                            <Typography component="span"> Uge 44 2025 </Typography>
                            <Typography component="span">2, 15, 9</Typography>
                        </AccordionSummary>
                    </Accordion>

                    <Accordion disabled>
                        <AccordionSummary aria-controls="panel2-content"
                                          id="panel2-header">
                            <Typography component="span"> Uge 43 2025 </Typography>
                            <Typography component="span">16, 6, 13</Typography>
                        </AccordionSummary>
                    </Accordion>

                    <Accordion disabled>
                        <AccordionSummary aria-controls="panel2-content"
                                          id="panel2-header">
                            <Typography component="span"> Uge 42 2025 </Typography>
                            <Typography component="span">6, 3, 7</Typography>
                        </AccordionSummary>
                    </Accordion>

                    <Accordion disabled>
                        <AccordionSummary aria-controls="panel2-content"
                                          id="panel2-header">
                            <Typography component="span"> Uge 41 2025 </Typography>
                            <Typography component="span">11, 1, 9</Typography>
                        </AccordionSummary>
                    </Accordion>

                    <Accordion disabled>
                        <AccordionSummary aria-controls="panel2-content"
                                          id="panel2-header">
                            <Typography component="span"> Uge 40 2025 </Typography>
                            <Typography component="span">15, 5, 8</Typography>
                        </AccordionSummary>
                    </Accordion>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SpilhistorikAdmin;