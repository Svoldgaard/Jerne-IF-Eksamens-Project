import { useState, useEffect } from "react";
import { profileClient } from "../api-clients";
import { useAtom } from "jotai";
import { userAtom } from "../Atoms/Auth";

export const useProfile = () => {
    const [user, setUser] = useAtom(userAtom);
    const [error, setError] = useState<string | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        if (!user.userId) return;

        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
        setEmail(user.email ?? "");

    }, [user]);

    const handleSave = async () => {
        if (!user?.userId) return;

        try {
            const updated = {
                fnavn: firstName,
                lnavn: lastName,
                email,
            };

            await profileClient.updateProfil(user.userId, updated);

            setUser({
                ...user,
                firstName,
                lastName,
                email,
            });

            alert("Profil opdateret!");
        } catch (err) {
            console.error("Profile update error:", err);
            setError("Fejl under opdatering");
        }
    };

    return {
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        handleSave,
        error
    };
};
