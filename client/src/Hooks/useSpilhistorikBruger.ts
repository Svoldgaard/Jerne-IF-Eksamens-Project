import {useEffect, useState} from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../Atoms/Auth";
import {apiUrl} from "../api-clients.ts";

export interface SpilugeResponse {
    uge: number;
    year: number;
    vindertal: number[];
}

export interface PladeResponse {
    id: string;
    uge: number;
    year: number;
    gentag: boolean;
    pris: number;
    isWinner: boolean;
    tal: number[];
    vindertal: number[];
}

interface UgeApiResponse {
    uge: number;
    year: number;
    vindertal?: number[];
}

interface PladeApiResponse {
    id: string;
    uge: number;
    year?: number;
    Year?: number; // If API is inconsistent
    gentag: boolean;
    pris: number;
    isWinner: boolean;
    tal?: number[];
    vindertal?: number[];
}

export function useSpilhistorikBruger(brugerId?: number) {
    const [loading, setLoading] = useState(true);
    const [spiluger, setSpiluger] = useState<SpilugeResponse[]>([]);
    const [plader, setPlader] = useState<PladeResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const token = useAtomValue(tokenAtom);

    useEffect(() => {

        const fetchHistorik = async () => {
            try {
                setLoading(true);

                if(!token) return;

                const ugeRes = await fetch(`${apiUrl}/api/spilhistorik/spiluger`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const ugeData: UgeApiResponse[] = await ugeRes.json();

                const pladeRes = await fetch(`${apiUrl}/api/spilhistorik/spilhistorik`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if(!pladeRes.ok) throw new Error("Kunne ikke hente spilhistorik")

                const pladeData: PladeApiResponse[] = await pladeRes.json();

                const mappedUger: SpilugeResponse[] = ugeData.map((u: UgeApiResponse) => ({
                    uge: u.uge,
                    year: u.year,
                    vindertal: u.vindertal ?? []
                }));

                const mappedPlader: PladeResponse[] = pladeData.map((p: PladeApiResponse) => ({
                    id: p.id,
                    uge: p.uge,
                    year: p.year ?? p.Year ?? 0, // fallback to 0 if missing
                    gentag: p.gentag,
                    pris: p.pris,
                    isWinner: p.isWinner,
                    tal: p.tal ?? [],
                    vindertal: p.vindertal ?? []
                }));

                setSpiluger(mappedUger);
                setPlader(mappedPlader);
            }
            catch (err: unknown) {
                console.error("Fejl ved hentning af plader:", err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ukendt fejl");
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchHistorik();
    }, [brugerId, token]);
    return {plader, spiluger, loading, error};
}