import {useNavigate} from "react-router";
import '../../UI/CSS/Sidebar.css';
import { useSidebarMenu } from "../../Hooks/useSidebarMenu";

const SidebarAdmin = () => {

    const navigate = useNavigate();

    const {
        menuOpen,
        menuRef,
        toggleMenu,
        closeMenu,
    } = useSidebarMenu();

    const handleNavigate = (path: string) => {
        navigate(path);
        closeMenu();
    };


    return (
        <div className="sidebar-wrapper" ref={menuRef}>
            <button className="sidebar-button" onClick={toggleMenu}>
                ☰
            </button>
            {menuOpen && (
                <div className={`sidebar-menu ${menuOpen ? "open" : "closed"}`}>
                    <div onClick={() => handleNavigate("/forside-admin")}>Forside</div>
                    <div onClick={() => handleNavigate("/regler-admin")}>Regler</div>
                    <div onClick={() => handleNavigate("/aktive-plader-admin")}>Aktive Plader</div>
                    <div onClick={() => handleNavigate("/spilhistorik-admin")}>Spilhistorik</div>
                    <div onClick={() => handleNavigate("/overblik-admin")}>Overblik over Brugere</div>
                </div>
            )}
        </div>
    );
}

export default SidebarAdmin;