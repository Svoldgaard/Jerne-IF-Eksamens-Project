import {useRef, useState} from "react";
import {useNavigate} from "react-router";
import '../../UI/CSS/Sidebar.css';
import {useClickOutside} from "../../Hooks/useClickOutside.ts";

function SidebarAdmin(){
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
                    <div onClick={() => {navigate("/forside-admin"); setMenuOpen(false);}}>
                        Forside
                    </div>

                    <div onClick={() => {navigate("/regler-admin"); setMenuOpen(false);}}>
                        Regler
                    </div>

                    <div onClick={() => {navigate("/aktive-plader-admin"); setMenuOpen(false);}}>
                        Aktive Plader
                    </div>

                    <div onClick={() => {navigate("/spilhistorik-admin"); setMenuOpen(false);}}>
                        Spilhistorik
                    </div>

                    <div onClick={() => {navigate("/overblik-admin"); setMenuOpen(false);}}>
                        Overblik over Brugere
                    </div>

                </div>
            )}

        </div>
    );
}

export default SidebarAdmin;