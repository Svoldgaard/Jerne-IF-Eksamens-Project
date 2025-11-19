import {useState} from "react";
import {useNavigate} from "react-router";

function SidebarBruger(){
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <button className="button" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            {menuOpen && (
                <div className= "sidebar - menu">
                    <button onClick={() => {navigate("/forside"); setMenuOpen(false);}}>
                        Forside
                    </button>

                    <button onClick={() => {navigate("/profil"); setMenuOpen(false);}}>
                        Profil
                    </button>

                    <button onClick={() => {navigate("/regler"); setMenuOpen(false);}}>
                        Regler
                    </button>

                    <button onClick={() => {navigate("/aktiv-spil"); setMenuOpen(false);}}>
                        Aktive Spil
                    </button>

                    <button onClick={() => {navigate("/spilhistorik"); setMenuOpen(false);}}>
                        Spilhistorik
                    </button>

                    <button onClick={() => {navigate("Køb-plade"); setMenuOpen(false);}}>
                        Køb Plade
                    </button>

                </div>
            )}

        </div>
    );
}

export default SidebarBruger;