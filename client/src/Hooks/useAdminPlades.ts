import {useEffect, useState} from "react";
import {customFetch} from "../api-clients.ts";

const baseUrl = "http://localhost:5233";

export type AdminPladeResponse = {
    pladeId: string;
    brugernavn: string;
    transaktionsNr: string;
    pris: number;
    active: boolean;
}

export const useAdminPlades = ()=> {
    const [adminPlades, setAdminPlades] = useState<AdminPladeResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const response = await customFetch(`${baseUrl}/api/plade/admin/active-plades`);

                if (!response.ok)
                    throw new Error("Failed to fetch to Admin");

                const data = await response.json();
                setAdminPlades(data);

            } catch(error: any) {

            console.error(error)
            setError("Failed to fetch to Admin");

            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return {adminPlades, isLoading, error};
};