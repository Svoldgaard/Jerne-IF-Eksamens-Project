import {useState} from "react";
import {apiUrl} from "../api-clients.ts";

export interface WeekPlayer {
    userId: number;
    userName: string;
    email: string;
    pladeId: string;
    transaktionsNr: string;
    tal: number[];
    pris: number;
    isWinner: boolean;
}

export function useWeekPlayers() {
    const [weekPlayers, setWeekPlayers] = useState<Record<string, WeekPlayer[]>>({});

    const loadWeekData = async (year: number, week: number) => {
        const key = `${year}-${week}`;
        if (weekPlayers[key]) return;

        const res = await fetch(`${apiUrl}/api/spilhistorik/admin/week/${year}/${week}`);
        const data = await res.json();

        setWeekPlayers(prev => ({
            ...prev,
            [key]: data,
        }));
    }
    return { weekPlayers, loadWeekData };
}