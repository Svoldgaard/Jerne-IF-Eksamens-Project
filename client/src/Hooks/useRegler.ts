import {useEffect, useState} from "react";
import reglerUrl from "../Assets/Regler.txt?raw";

export function useRegler() {
    const [rules, setRules] = useState<string>("");

    useEffect(() => {
        setRules(reglerUrl);
    }, []);

    return rules;
}