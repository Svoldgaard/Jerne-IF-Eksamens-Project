import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import '../../UI/CSS/Sidebar.css';

function SidebarAdmin(){
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
        <div className="sidebar-wrapper" ref={menuRef}>
            <button className="sidebar-button" onClick={() => setMenuOpen(prev => !prev)}>
                ☰
            </button>

            {menuOpen && (
                <div className={`sidebar-menu ${menuOpen ? "open" : "closed"}`}>
                    <div onClick={() => {navigate("/forside-admin"); setMenuOpen(false);}}>
                        Forside
                    </div>

                    <div onClick={() => {navigate("/profil-admin"); setMenuOpen(false);}}>
                        Profil
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

                </div>
            )}

        </div>
    );
}

export default SidebarAdmin;