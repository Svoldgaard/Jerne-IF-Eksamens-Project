import '../CSS/Vindertal.css'
import Logo from "../../Assets/Logo.png";
import Header from "../../Component/Header.tsx";
import Footer from "../../Component/Footer.tsx";
import {useNavigate} from "react-router-dom";
import {useVindertal} from "../../Hooks/useVindertal.ts";
import {getCurrentWeekNumber, getCurrentYear} from "../../Utils/dateUtils.ts";
import React from "react";

const Vindertal = () => {
    const navigate = useNavigate();
    const { vindertal, setVindertal, submitVindertal, loading, error } = useVindertal();

    const currentWeek = getCurrentWeekNumber();
    const currentYear = getCurrentYear();

    const ugetalID = Number(`${currentWeek}${currentYear}`);

    const handleChange = (index: number, value: string) => {

        const num = Number(value);

        if(value !== "" && (isNaN(num) || num < 1 || num > 16)) {
            return;
        }

        const newVals = [...vindertal];
        newVals[index] = Number(value);
        setVindertal(newVals);
    };

    const handleSubmit = async () => {
        if (vindertal.some(v => v === 0)) {
            alert("Alle tre vindertal skal udfyldes.");
            return;
        }

        // Check for duplicates
        const isUnique = new Set(vindertal).size === vindertal.length;
        if (!isUnique) {
            alert("Vindertallene skal være unikke. Det samme tal kan ikke bruges flere gange.");
            return;
        }

        // Check valid range
        if (!vindertal.every(v => v >= 1 && v <= 16)) {
            alert("Alle vindertal skal være mellem 1 og 16.");
            return;
        }

        const vindertalString = vindertal.join(" - ");

        const confirmed: boolean = window.confirm("venligst bekræft du har tastet de rigtige vindertal: " + vindertalString);

        if (!confirmed) return;

        await submitVindertal(ugetalID);
        navigate("/vundet-plader-admin");
    };

    return (
        <div className="page-vindertal">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside-admin")} />
            </span>
            <div className="main-container">
                <Header />
                <div className="background-vindertal">
                    <h2 className="header-vindertal">Nuværende spil: Uge {currentWeek} {currentYear} </h2>
                    <p className="text-vindertal">Vindertal:</p>
                    <div className="vindertal">
                        {vindertal.map((val, idx) => (
                            <React.Fragment key={idx}>
                                <input
                                    type="Text"
                                    min="1"
                                    max="16"
                                    value={val || ""}
                                    onChange={(e) => handleChange(idx, e.target.value)}
                                    className="input-vindertal"
                                />
                                {idx < vindertal.length - 1 && <span className="separator-vindertal"></span>}
                            </React.Fragment>
                        ))}
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button className="button-gem-vindertal" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Gemmer..." : "Gem"}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Vindertal;