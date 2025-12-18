import {useState, useEffect} from 'react';


import {customFetch, pladeClient} from "../api-clients.ts";
import type {PladeResponse} from "../generated-ts-client.ts";
import {apiUrl} from "../api-clients.ts";

//const baseUrl = "http://localhost:5233";
//const baseUrl = "https://jerne-if-api.fly.dev"


export const useActivePladesClient = () => {


    const [activePlades, setActivePlades] = useState<PladeResponse[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlades = async () => {
            setLoading(true);
            setError(null);
            try{

                const data = await pladeClient.getPlades();

                setActivePlades(data);

            }catch(err: any){
                setError("Kunne ikke hente aktive spil. Tjek din login status. ");
                console.error("Error fetching active plades: ", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlades()
    }, []);

    const updateGentag = async (pladeId: string, newStatus: boolean)=>{
        try {
            const response = await customFetch(`${apiUrl}/api/plade/update-gentag`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pladeId: pladeId,
                    gentag: newStatus
                })
            });

            if(!response.ok){
                throw new Error("Failed to update status");
            }
            setActivePlades(prevPlades =>
                prevPlades.map(plade =>
                    plade.id === pladeId ? {...plade, gentag: newStatus } : plade
                )
            );
            return true;
        }catch (error){
            console.error("Update failed:", error);
            return false;
        }
    };

    return {activePlades, isLoading, error, updateGentag};
}