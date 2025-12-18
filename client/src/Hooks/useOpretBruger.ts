import { useState } from "react";
import { useAuth } from "./useAuth.ts";
import { authClient } from "../api-clients";
import type { RegisterRequest } from "../generated-ts-client";

export const useOpretbruger = () => {
    const {login } = useAuth();

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const request: RegisterRequest = {
                firstName,
                lastName,
                email,
                password,
                userName: email
            }

            await authClient.register(request);

            await login({username: email, password });
        }catch(err){
            console.error("Registration error:", err);
            setError("Registration failed. Please check your input or try another email.");
        }
    };
    return {
        email,
        setEmail,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        password,
        setPassword,
        error,
        handleRegister,
    };
};