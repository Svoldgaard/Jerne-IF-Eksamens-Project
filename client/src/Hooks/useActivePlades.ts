import {useState, useEffect} from 'react';


import {pladeClient} from "../api-clients.ts";
import type {PladeResponse} from "../generated-ts-client.ts";

const baseUrl = "http://localhost:5233";


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

    return {activePlades, isLoading, error};
}