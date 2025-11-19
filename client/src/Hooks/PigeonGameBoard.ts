import {useState} from "react";

export function useTogglePigeon() {
    const [selectedPigeons, setSelectedPigeons] = useState<number[]>([]);

    //logic for changing colors when button is pressed
    const togglePigeon = (index: number) => {
        if (selectedPigeons.includes(index)) {
            setSelectedPigeons(selectedPigeons.filter(pigeonId => pigeonId !== index));
        } else {
            setSelectedPigeons([...selectedPigeons, index]);
        }
    };
    return {selectedPigeons, togglePigeon};
}