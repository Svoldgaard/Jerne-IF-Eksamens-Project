import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type {AuthUserInfoDto} from "../generated-ts-client";

// --- Token ---
export const TOKEN_KEY = "token";
export const tokenStorage = createJSONStorage<string | null>(() => sessionStorage);
export const tokenAtom = atomWithStorage<string | null>(TOKEN_KEY, null, tokenStorage);

// --- User info ---
export const userAtom = atomWithStorage<AuthUserInfoDto | null>(
    "user",
    null,
    createJSONStorage(() => sessionStorage)
);
