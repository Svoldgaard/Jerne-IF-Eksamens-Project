import { useState } from "react";

export function useRepeat(initialValue = false) {
    const [isRepeatChecked, setIsRepeatChecked] = useState<boolean>(initialValue);

    const toggleRepeat = () => {
        setIsRepeatChecked(prev => !prev);
    };

    const setRepeat = (value: boolean) => {
        setIsRepeatChecked(value);
    };

    return {
        isRepeatChecked,
        toggleRepeat,
        setRepeat,
    };
}
