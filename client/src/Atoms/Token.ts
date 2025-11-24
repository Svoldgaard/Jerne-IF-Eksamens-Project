import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { authClient } from "../api-clients";

export const TOKEN_KEY = "token";
export const tokenStorage = createJSONStorage<string | null>(() => sessionStorage);

export const tokenAtom = atomWithStorage<string | null>(TOKEN_KEY, null, tokenStorage);

export const userInfoAtom = atom(async (get) => {
    const token = get(tokenAtom);
    if(!token) return null;
     const userInfo = await authClient.login();
     return userInfo;
});