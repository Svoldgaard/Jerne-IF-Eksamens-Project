import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import '../../UI/CSS/Sidebar.css';

function SidebarBruger(){
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
             if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div style = {{ position: "relative"}}>
            <button className="button" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            {menuOpen && (
                <div className= "sidebar-menu" ref={menuRef}>
                    <div onClick={() => {navigate("/forside"); setMenuOpen(false);}}>
                        Forside
                    </div>

                    <div onClick={() => {navigate("/profil"); setMenuOpen(false);}}>
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