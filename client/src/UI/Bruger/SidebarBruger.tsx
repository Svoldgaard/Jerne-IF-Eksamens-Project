import {useRef, useState} from "react";
import {useNavigate} from "react-router";
import '../../UI/CSS/Sidebar.css';
import {useClickOutside} from "../../Hooks/useClickOutside.ts";

function SidebarBruger(){
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, menuOpen, () => setMenuOpen(false));

    return (
        <div className="sidebar-wrapper" ref={menuRef}>
            <button className="sidebar-button" onClick={() => setMenuOpen(prev => !prev)}>
                ☰
            </button>

            {menuOpen && (
                <div className={`sidebar-menu ${menuOpen ? "open" : "closed"}`}>
                    <div onClick={() => {navigate("/forside"); setMenuOpen(false);}}>
                        Forside
                    </div>

                    <div onClick={() => {navigate("/profil-bruger"); setMenuOpen(false);}}>
                        Profil
                    </div>

                    <div onClick={() => {navigate("/regler"); setMenuOpen(false);}}>
                        Regler
                    </div>

                    <div onClick={() => {navigate("/aktiv-spil"); setMenuOpen(false);}}>
                        Aktive Spil
                    </div>

                    <div onClick={() => {navigate("/spilhistorik"); setMenuOpen(false);}}>
                        Spilhistorik
                    </div>

                    <div onClick={() => {navigate("/køb-plade"); setMenuOpen(false);}}>
                        Køb Plade
                    </div>

                </div>
            )}

        </div>
    );
}

export default SidebarBruger;