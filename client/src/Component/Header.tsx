import * as React from "react";
import SidebarBruger from "../UI/Bruger/SidebarBruger.tsx";
import '../UI/CSS/Header.css';
import Logout from "../../public/Logout.png";
import {useLocation} from "react-router";
import SidebarAdmin from "../UI/Admin/SidebarAdmin.tsx";


const Header: React.FC = () => {
    const location = useLocation();
    const isAdmin = location.pathname.includes( "admin");

    return (
        <footer className="header">
            <div className="header-left">
                {isAdmin ? <SidebarAdmin/>: <SidebarBruger/>}
            </div>
            <button className="header-right">
                <img src={Logout} alt="Logout" className="header-icon" />
            </button>
        </footer>
    );
};

export default Header;