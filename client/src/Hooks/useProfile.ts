import { useState, useEffect } from "react";
import { profileClient } from "../api-clients";
import { useAtom } from "jotai";
import { userAtom } from "../Atoms/Auth";
import {type ProfilApi, updateProfil} from "../Core/ProfilApi.ts";




export const useProfile = () => {
    const [user, setUser] = useAtom(userAtom);
    const [error, setError] = useState<string | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobil, setMobil] = useState("");


    useEffect(() => {
        if (!user.userId) return;

        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
        setEmail(user.email ?? "");



    }, [user]);

    const handleSave = async () => {
        if (!user?.userId) return;

        try {
            const updatedProfil = {
                id: user.userId,
                fnavn: firstName,
                lnavn: lastName,
                email,
                mobil: mobil.toString(),
                updated: new Date().toISOString(),
                rolleId: 1,
                bruger: email
            };

            const savedProfil= await updateProfil(user.userId, updatedProfil);

            setUser(prev => {
                if(!prev) return prev;
                return {
                    ...prev,
                    firstName: savedProfil.fnavn,
                    lastName: savedProfil.lnavn,
                    email: savedProfil.email,
                    mobilePhone: savedProfil.mobil,
                    rolleId: 1,
                    brugerId: email,
                };
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
        mobil, setMobil,
        handleSave,
        error
    };

};
