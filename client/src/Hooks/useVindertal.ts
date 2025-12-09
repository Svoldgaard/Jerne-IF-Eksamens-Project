import { useState } from "react";
import { vinderTalClient } from "../api-clients";
import {type CreateVindertalDTO} from "../generated-ts-client.ts";


export function useVindertal() {
    const [vindertal, setVindertal] = useState<number[]>([0, 0, 0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const client = vinderTalClient;

    const submitVindertal = async (spilugeID: number) => {
        setLoading(true);
        setError(null);

        try {
            const dto: CreateVindertalDTO = {
                vindertal,
                spilugeID,
            };

            await client.createVindertal(dto);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Kunne ikke gemme vindertal");
            setLoading(false);
        }
    };

    return {
        vindertal,
        setVindertal,
        loading,
        error,
        submitVindertal,
    };
}
