import {useEffect, useState} from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../Atoms/Auth";

//const baseUrl = "http://localhost:5233";
const baseUrl = "https://jerne-if-api.fly.dev"

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

                // console.log("token", token);
                if(!token) return;

                const ugeRes = await fetch(`${baseUrl}/api/spilhistorik/spiluger`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const ugeData = await ugeRes.json();

                const pladeRes = await fetch(`${baseUrl}/api/spilhistorik/spilhistorik`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if(!pladeRes.ok) throw new Error("Kunne ikke hente spilhistorik")

                const pladeData = await pladeRes.json();

                const mappedUger = ugeData.map((u: any) => ({
                    uge: u.uge,
                    year: u.year,
                    vindertal: u.vindertal?? []

                }));

                const mappedPlader = pladeData.map((p: any) => ({
                    id: p.id,
                    uge: p.uge,
                    year: p.year ?? p.Year,
                    gentag: p.gentag,
                    pris: p.pris,
                    isWinner: p.isWinner,
                    tal: p.tal ?? [],
                    vindertal: p.vindertal ?? [],
                }));

                setSpiluger(mappedUger);
                setPlader(mappedPlader);
            }
            catch(err: any) {
                console.error("Fejl ved hentning af plader:", err);
                setError(err.message || "Ukendt fejl");
            }
            finally {
                setLoading(false);
            }
        };
        fetchHistorik();
    }, [brugerId, token]);
    return {plader, spiluger, loading, error};
}