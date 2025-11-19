import * as React from "react";
import SidebarBruger from "../UI/Bruger/SidebarBruger.tsx";


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