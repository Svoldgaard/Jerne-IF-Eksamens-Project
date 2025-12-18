import { useRef, useState } from "react";
import { useClickOutside } from "./useClickOutside";

export function useSidebarMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useClickOutside(menuRef, menuOpen, closeMenu);

    return {
        menuOpen,
        menuRef,
        toggleMenu,
        closeMenu,
    };
}
