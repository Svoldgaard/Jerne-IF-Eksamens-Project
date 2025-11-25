// src/Atoms/Auth.ts
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type { Login } from "../generated-ts-client";

// --- Token ---
export const TOKEN_KEY = "token";
export const tokenStorage = createJSONStorage<string | null>(() => sessionStorage);
export const tokenAtom = atomWithStorage<string | null>(TOKEN_KEY, null, tokenStorage);

// --- User info ---
export const userAtom = atom<Login | null>(null); // primitive atom to store user
