import { TOKEN_KEY, tokenStorage } from "./atoms/Token.ts";
import {
    AuthClient,
} from "./models/generated-client.ts";

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

const baseUrl = undefined;

export const authClient = new AuthClient(baseUrl, { fetch: customFetch});