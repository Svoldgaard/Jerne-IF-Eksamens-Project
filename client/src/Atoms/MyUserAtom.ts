import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type {AuthUserInfoDto} from "../generated-ts-client";


const STORAGE_KEY = "my_logged_in_user";


const storage = createJSONStorage<AuthUserInfoDto | null>(() => sessionStorage);


export const myUserAtom = atomWithStorage<AuthUserInfoDto | null>(
    STORAGE_KEY,
    null,
    storage
);