import { TOKEN_KEY, tokenStorage } from "./Atoms/Token.ts";
import {AuthClient, PladeClient} from "./generated-ts-client.ts";

const customFetch = async (url: RequestInfo, init?: RequestInit) => {
    const token = tokenStorage.getItem(TOKEN_KEY, null);

    if(token){
        init = {
            ...(init ?? {}),
            headers: {
            ...(init?.headers?? {}),
            "Authorization": `Bearer ${token}`,
            },
        };
    }
    return await fetch(url, init);
};

const baseUrl = "http://localhost:5233";


export const authClient = new AuthClient(baseUrl, { fetch: customFetch });
export const pladeClient = new PladeClient(baseUrl, { fetch: customFetch });
