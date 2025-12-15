import {useEffect, useState} from "react";
import {customFetch} from "../api-clients.ts";
import type {PladeResponse, WinningPladeResponse} from "../generated-ts-client.ts";

const baseUrl = "http://localhost:5233";

export type AdminPladeResponse = {
    pladeId: string;
    brugernavn: string;
    transaktionsNr: string;
    pris: number;
    betalt: boolean;
    udbetalt: boolean;
}

export const useAdminPlades = ()=> {
    const [adminPlades, setAdminPlades] = useState<AdminPladeResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [winningPlades, setWinningPlades] = useState<WinningPladeResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const response = await customFetch(`${baseUrl}/api/Plade/admin/active-plades`);

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
            const response = await customFetch(`${baseUrl}/api/Plade/admin/update-betalt`, {
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

    const closeCurrentWeek = async (): Promise<boolean> => {
        try{
            const response = await customFetch(`${baseUrl}/api/Plade/CloseCurrentWeek`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok){
                throw new Error("Failed to close week");
            }
            return true;
        }catch(error){
            console.error("Close week failed:", error);
            return false;
        }
    };

    const handleStartNewWeek = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/Plade/StartNewWeek`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            });

            if(!response.ok) throw new Error("Failed to start week");
            return true;

        } catch (error) {
            console.error("Start week error:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const checkAdminWeekStatus = async () => {
        try {
            const response = await customFetch(`${baseUrl}/api/Plade/check-status`);

            if (response.ok) {
                const data = await response.json();
                return data.isOpen;
            }
            return false;
        }catch(error){
            console.error("Check week status failed:", error);
            return false;
        }
    };

    const checkWinningNumbers = async () => {
        try {
            const response = await customFetch(`${baseUrl}/vindertal/check-winning-numbers`);

            if (response.ok) {
                const data = await response.json();
                return data.hasWinningNumbers;
            }
            return false;
        }catch(error){
            console.error("Check winning numbers failed:", error);
            return false;
        }
    };

    const fetchWinners = async () => {
        try {
            const response = await customFetch(`${baseUrl}/api/Plade/admin/winning-plades`);
            if (response.ok) {
                const data = await response.json();
                setWinningPlades(data);
            }
        }catch(error){
            console.error("Fetch winning plades failed:", error);
        }
    };

    const updateUdbetalt = async (pladeId: string, newStatus: boolean)=>{
        try{
            await customFetch(`${baseUrl}/api/Plade/admin/update-udbetalt`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pladeId: pladeId,
                    udbetalt: newStatus
                })
            });
            setWinningPlades(prevPlades => prevPlades.map(p =>
            p.pladeId === pladeId ? {...p, udbetalt: newStatus} : p));
            return true;
        }catch(error){
            return false;
        }
    }



    return {adminPlades,
        isLoading,
        error,
        updateBetalt,
        closeCurrentWeek,
        handleStartNewWeek,
        checkAdminWeekStatus,
    checkWinningNumbers,
    fetchWinners,
    updateUdbetalt,
    winningPlades};
};