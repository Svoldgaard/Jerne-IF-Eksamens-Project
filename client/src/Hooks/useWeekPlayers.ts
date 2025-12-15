import {useState} from "react";

const baseUrl = "http://localhost:5233";

export function useWeekPlayers() {
    const [weekPlayers, setWeekPlayers] = useState<Record<string, any[]>>({});

    const loadWeekData = async (year: number, week: number) => {
        const key = `${year}-${week}`;
        if (weekPlayers[key]) return;

        const res = await fetch(`${baseUrl}/api/spilhistorik/admin/week/${year}/${week}`);
        const data = await res.json();

        setWeekPlayers(prev => ({
            ...prev,
            [key]: data,
        }));
    }
    return { weekPlayers, loadWeekData };
}