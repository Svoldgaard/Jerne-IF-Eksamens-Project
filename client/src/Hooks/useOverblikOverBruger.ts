import { useEffect, useState } from "react";
import { profileClient } from "../api-clients";
import type { ProfilDto } from "../generated-ts-client";

export const useOverblikOverBruger = () => {
    const [profiles, setProfiles] = useState<ProfilDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [contextMenu, setContextMenu] = useState<{
        visible: boolean;
        x: number;
        y: number;
        profile: ProfilDto | null;
    }>({
        visible: false,
        x: 0,
        y: 0,
        profile: null,
    });

    useEffect(() => {
        const loadProfiles = async () => {
            try {
                const result = await profileClient.getAllProfil();
                setProfiles(result);
            } catch (err) {
                setError("failed to load profiles: " + err);
            } finally {
                setLoading(false);
            }
        };
        loadProfiles();
    }, []);

    useEffect(() => {
        const close = () =>
            setContextMenu((prev) => ({ ...prev, visible: false }));
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    const onRowRightClick = (e: React.MouseEvent, profile: ProfilDto) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            profile,
        });
    };

    const onToggleStatus = async () => {
        if (!contextMenu.profile) return;

        const profile = contextMenu.profile;

        const updatedProfile = {
            fnavn: profile.fnavn ?? "",
            lnavn: profile.lnavn ?? "",
            email: profile.email,
            aktiv: !profile.aktiv,
        };

        setProfiles((prev) =>
            prev.map((p) =>
                p.email === profile.email ? { ...p, aktiv: !p.aktiv } : p
            )
        );

        setContextMenu((prev) => ({ ...prev, visible: false }));

        try {
            await profileClient.updateStatus(updatedProfile);

        } catch (err) {
            console.error(err);
            alert("Kunne ikke ændre status");

            setProfiles((prev) =>
                prev.map((p) =>
                    p.email === profile.email ? profile : p
                )
            );
        }
    };

    return {
        profiles,
        loading,
        error,
        contextMenu,
        onRowRightClick,
        onToggleStatus,
    };
};
