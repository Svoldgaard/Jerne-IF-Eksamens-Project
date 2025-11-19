import * as React from "react";
import SidebarBruger from "../UI/Bruger/SidebarBruger.tsx";
import '../UI/CSS/Header.css';


const Header: React.FC = () => {
    return (
        <footer className="header">
            <div className="header-left">
                <SidebarBruger/>
            </div>
            <div className="header-right">

            </div>
        </footer>
    );
};

export default Header;