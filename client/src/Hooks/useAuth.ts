import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenAtom, userAtom } from "../Atoms/Auth";
import { authClient } from "../api-clients";

export const useAuth = () => {

    // global atoms
    const [token, setToken] = useAtom(tokenAtom);
    const [user, setUser] = useAtom(userAtom);

    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken && !token) {
            setToken(storedToken);
        }
    }, []);

    const login = async ({ username, password }: { username: string; password: string }) => {
        try {
            const response = await authClient.login({ username, password });

            if (!response.jwt) {
                throw new Error("Login failed: missing token.");
            }

            setToken(response.jwt);
            localStorage.setItem("token", response.jwt);

            if (response.user) {
                setUser(response.user);
            }

            if (response.user?.roleId === 2) {
                navigate("/forside-admin");
            } else {
                navigate("/forside");
            }

        } catch (err) {
            console.error("Login error", err);
            throw err;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);

        localStorage.removeItem("token");

        navigate("/");
    };

    return {
        user,
        setUser,
        token,
        login,
        logout
    };
};
