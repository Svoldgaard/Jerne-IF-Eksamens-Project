import { useState } from "react";
import { useAuth } from "./useAuth.ts";

export const useLogin = () => {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await login({ username, password });
        } catch (err) {
            console.error("Login failed:", err);
            setError("Login failed. Check credentials.");
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        error,
        handleSubmit,
    };
};
