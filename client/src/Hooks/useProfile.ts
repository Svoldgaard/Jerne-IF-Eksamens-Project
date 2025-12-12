import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../Atoms/Auth";
import {profileClient} from "../api-clients.ts";
import type {ProfilUpdateDto} from "../generated-ts-client.ts";


export const useProfile = () => {
    const [user, setUser] = useAtom(userAtom);
    const [error, setError] = useState<string | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobil, setMobil] = useState("");


    useEffect(() => {
        if (!user) return;

        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
        setEmail(user.email ?? "");
        setMobil(user.mobilePhone?.toString() ?? "");
    }, [user]);



    const handleSave = async () => {
        if (!user?.userId) return;

        try {
            const updatedProfil: ProfilUpdateDto = {
                userId: user.userId,
                fnavn: firstName,
                lnavn: lastName,
                email,
            };


            const savedProfil= await profileClient.updateProfil(updatedProfil);

            setUser(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    firstName: savedProfil.fnavn,
                    lastName: savedProfil.lnavn,
                    email: savedProfil.email,
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