import {useEffect} from "react";

export function useClickOutside(
    ref: React.RefObject<HTMLElement | null>,
    isActive: boolean,
    onOutsideClick: () => void
) {
    useEffect(() => {
        function handle(event: MouseEvent) {
            if (
                isActive &&
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                onOutsideClick();
            }
        }

        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [isActive, ref, onOutsideClick]);
}
