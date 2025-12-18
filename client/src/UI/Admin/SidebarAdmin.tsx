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
                <div className="sidebar-menu open">
                    <div onClick={() => handleNavigate("/forside")}>Forside</div>
                    <div onClick={() => handleNavigate("/profil-bruger")}>Profil</div>
                    <div onClick={() => handleNavigate("/regler")}>Regler</div>
                    <div onClick={() => handleNavigate("/aktiv-spil")}>Aktive Spil</div>
                    <div onClick={() => handleNavigate("/spilhistorik")}>Spilhistorik</div>
                    <div onClick={() => handleNavigate("/køb-plade")}>Køb Plade</div>
                </div>
            )}
        </div>
    );
}

export default SidebarAdmin;