import {useState} from "react";
import {apiUrl} from "../api-clients.ts";

// const baseUrl = "http://localhost:5233";
//const baseUrl = "https://jerne-if-api.fly.dev/swagger/index.html"

export function useWeekPlayers() {
    const [weekPlayers, setWeekPlayers] = useState<Record<string, any[]>>({});

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