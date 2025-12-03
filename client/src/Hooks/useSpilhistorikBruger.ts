import {useEffect, useState} from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../Atoms/Auth";

const baseUrl = "http://localhost:5233";

export interface PladeTal {
    id: number;
    tal: number;
}

export interface PladeResponse {
    id: string;
    uge: number;
    gentag: boolean;
    pris: number;
    isWinner: boolean;
    tal: number[];
}

export function useSpilhistorikBruger(brugerId: number) {
    const [loading, setLoading] = useState(true);
    const [plader, setPlader] = useState<PladeResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const token = useAtomValue(tokenAtom);

    useEffect(() => {

        const fetchHistorik = async () => {
            try {
                setLoading(true);

                console.log("token", token);
                if(!token) throw new Error("Brugeren er ikke godkendt")

                const response = await fetch(`${baseUrl}/api/plade/spilhistorik`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if(!response.ok) {
                    const msg = await response.text();
                    throw new Error(msg ||"Kunne ikke finde historikken");
                }

                const data: PladeResponse[] = await response.json();
                setPlader(data);
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
    }, []);
    return {plader, loading, error};
}