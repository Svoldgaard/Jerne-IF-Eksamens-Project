import * as React from "react";
import SidebarBruger from "../UI/Bruger/SidebarBruger.tsx";
import '../UI/CSS/Header.css';
import Logout from "../../public/Logout.png";


const Header: React.FC = () => {
    return (
        <footer className="header">
            <div className="header-left">
                <SidebarBruger/>
            </div>
            <button className="header-right">
                <img src={Logout} alt="Logout" className="header-icon" />
            </button>
        </footer>
    );
};

export default Header;