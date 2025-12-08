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

            const response = await authClient.login({ username, password });

            if (!response.jwt) {
                throw new Error("Login failed: no token returned");
            }

            setToken(response.jwt);

            if (response.user) {
                const user: AuthUserInfoDto = response.user;
                setUser(user);
            }

            // Navigate based on role
            if (response.user?.roleId === 2) {
                navigate("/forside-admin");
            } else {
                navigate("/forside");
            }

        } catch (err) {
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
