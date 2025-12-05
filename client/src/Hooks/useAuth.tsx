import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../Atoms/Auth";
import { useNavigate } from "react-router-dom";
import { authClient } from "../api-clients";
import type { AuthUserInfoDto } from "../generated-ts-client";

export const useAuth = () => {
    const [, setToken] = useAtom(tokenAtom);
    const [, setUser] = useAtom(userAtom);
    const navigate = useNavigate();

    const login = async ({ username, password }: { username: string; password: string }) => {
        try {
            console.log("👉 Sending login request...", username);

            const response = await authClient.login({ username, password });

            console.log("✅ Backend login response:", response);

            if (!response.jwt) {
                console.error("❌ No JWT returned");
                throw new Error("Login failed: no token returned");
            }

            setToken(response.jwt);
            console.log("🔐 tokenAtom set:", response.jwt);

            if (response.user) {
                const user: AuthUserInfoDto = response.user;
                setUser(user);
                console.log("👤 userAtom set:", user);
            } else {
                console.error("❌ response.user is NULL!");
            }

            // Navigate based on role
            if (response.user?.roleId === 2) {
                console.log("➡ Navigating to /forside-admin");
                navigate("/forside-admin");
            } else {
                console.log("➡ Navigating to /forside");
                navigate("/forside");
            }

        } catch (err) {
            console.error("🔥 Login error:", err);
            throw err;
        }
    };


    const logout = () => {
        setToken(null);
        setUser(null);
        navigate("/");
    };

    return { login, logout };
};
