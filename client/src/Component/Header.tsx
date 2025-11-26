import * as React from "react";
import SidebarBruger from "../UI/Bruger/SidebarBruger.tsx";
import '../UI/CSS/Header.css';
import Logout from "../../public/Logout.png";
import { useAuth } from "../Hooks/useAuth";



const Header: React.FC = () => {
    const { logout } = useAuth();
    return (
        <footer className="header">
            <div className="header-left">
                <SidebarBruger/>
            </div>
            <button className="header-right" onClick={logout}>
                <img src={Logout} alt="Logout" className="header-icon" />
            </button>
        </footer>
    );
};

export default Header;