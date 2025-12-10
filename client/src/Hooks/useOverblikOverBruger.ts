import { useEffect, useState } from "react";
import { profileClient } from "../api-clients";
import type {ProfilDto} from "../generated-ts-client.ts";

export const useOverblikOverBruger = () => {
    const [profiles, setProfiles] = useState<ProfilDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return { profiles, loading, error };
}
