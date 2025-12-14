import { TOKEN_KEY, tokenStorage } from "./Atoms/Auth.ts";
import { AuthClient, PladeClient, ProfilClient, VinderTalClient } from "./generated-ts-client.ts";

export const customFetch = async (url: RequestInfo, init?: RequestInit) => {
    const token = tokenStorage.getItem(TOKEN_KEY, null);

    if (token) {
        init = {
            ...(init ?? {}),
            headers: {
                ...(init?.headers ?? {}),
                "Authorization": `Bearer ${token}`,
            },
        };
    }
    return await fetch(url, init);
};


const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", import.meta.env.VITE_API_URL);

export const authClient = new AuthClient(apiUrl, { fetch: customFetch });
export const pladeClient = new PladeClient(apiUrl, { fetch: customFetch });
export const profileClient = new ProfilClient(apiUrl, { fetch: customFetch });
export const vinderTalClient = new VinderTalClient(apiUrl, { fetch: customFetch });
