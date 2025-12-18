import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminPlades } from "./useAdminPlades";

export function useVerifyWinningNumbers() {
    const navigate = useNavigate();
    const { checkWinningNumbers } = useAdminPlades();
    const hasCheckedRef = useRef(false);

    useEffect(() => {
        if (hasCheckedRef.current) return;
        hasCheckedRef.current = true;

        const verify = async () => {
            const hasWinningNumbers = await checkWinningNumbers();

            if (hasWinningNumbers) {
                alert(
                    "Den nuværende uge allerede har en vindertal. Du vil blive omdirigeret."
                );
                navigate("/vundet-plader-admin");
            }
        };

        verify();
    }, [checkWinningNumbers, navigate]);
}
