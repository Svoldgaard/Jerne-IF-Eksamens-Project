import {useEffect, useState} from "react";

const baseUrl = "http://localhost:5233";

export interface PladeTal {
    id: number;
    tal: number;
}

export interface PladeResponse {
    id: string;
    ugetal: number;
    gentag: boolean;
    brugerid: number;
    priceid: number | null;
    pladetals: PladeTal[];
    isWinner?: boolean;
}

export function useSpilhistorikBruger(brugerId: number) {
    const [loading, setLoading] = useState(true);
    const [plader, setPlader] = useState<PladeResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!brugerId) return;

        const fetchHistorik = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${baseUrl}/api/plade?brugerId=${brugerId}`);
                if(!response.ok) throw new Error("Kunne ikke finde historikken");

                const data: PladeResponse[] = await response.json();
                setPlader(data);
            }
            catch(err: any) {
                setError(err.message || "Ukendt fejl");
            }
            finally {
                setLoading(false);
            }
        };
        fetchHistorik();
    }, [brugerId]);
    return {plader, loading, error};
}