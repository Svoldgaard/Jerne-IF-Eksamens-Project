import {useEffect, useState} from "react";
import {customFetch} from "../api-clients.ts";
import type {PladeResponse} from "../generated-ts-client.ts";

const baseUrl = "http://localhost:5233";

export type AdminPladeResponse = {
    pladeId: string;
    brugernavn: string;
    transaktionsNr: string;
    pris: number;
    betalt: boolean;
}

export const useAdminPlades = ()=> {
    const [adminPlades, setAdminPlades] = useState<AdminPladeResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //const [betaltPlades, setBetaltPlades] = useState<AdminPladeResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const response = await customFetch(`${baseUrl}/api/plade/admin/active-plades`);

                if (!response.ok)
                    throw new Error("Failed to fetch to Admin");

                const data = await response.json();
                setAdminPlades(data);

            } catch(error) {

            console.error(error)
            setError("Failed to fetch to Admin");

            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const updateBetalt = async (pladeId: string, newStatus: boolean)=>{
        try {
            const response = await customFetch(`${baseUrl}/api/plade/admin/update-betalt`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pladeId: pladeId,
                    betalt: newStatus
                })
            });

            if(!response.ok){
                throw new Error("Failed to update status");
            }
            setAdminPlades(prevPlades =>
                prevPlades.map(plade =>
                    plade.pladeId === pladeId ? {...plade, betalt: newStatus } : plade
                )
            );
            return true;
        }catch (error){
            console.error("Update failed:", error);
            return false;
        }
    };

    return {adminPlades, isLoading, error, updateBetalt};
};