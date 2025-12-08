import {useEffect, useState} from "react";
import reglerUrl from "../assets/Regler.txt?raw";

export function useRegler() {
    const [rules, setRules] = useState<string>("");

    useEffect(() => {
        setRules(reglerUrl);
    }, []);

    return rules;
}