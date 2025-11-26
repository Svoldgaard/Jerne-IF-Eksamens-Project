import { useNavigate } from "react-router-dom";
import { authClient } from "../api-clients";
//import type { Login } from "../generated-ts-client";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../Atoms/Auth";

export const useAuth = () => {
    const [, setJwt] = useAtom(tokenAtom);
    const [, setUser] = useAtom(userAtom);
    const navigate = useNavigate();

    const login = async ({ username, password }: { username: string; password: string }) => {
        try {
            const response = await authClient.login({ username, password });

            if (!response.jwt) throw new Error("Invalid credentials");
            setJwt(response.jwt);

            // Assume `response.user` contains the user info
            //setUser(response.user);
            if (response.user?.roleId === 2) {
                navigate("/forside-admin");
            } else {
                navigate("/forside");
            }
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    const logout = () => {
        setJwt(null);
        setUser(null);
        navigate("/login");
    };

    return { login, logout };
};
