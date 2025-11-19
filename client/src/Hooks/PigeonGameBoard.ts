import {useState} from "react";

const MIN_SELECTION = 5;
const MAX_SELECTION = 8;

export function useTogglePigeon() {
    const [selectedPigeons, setSelectedPigeons] = useState<number[]>([]);

    //logic for changing colors when button is pressed
    const togglePigeon = (index: number) => {
        const isCurrentlySelected = selectedPigeons.includes(index);
        const currentCount = selectedPigeons.length;

        if (isCurrentlySelected) {
            setSelectedPigeons(selectedPigeons.filter(pigeonId => pigeonId !== index));
        } else {
            if (currentCount < MAX_SELECTION) {
                setSelectedPigeons([...selectedPigeons, index]);
            } else{
                console.warn(`Cannot select more than ${MAX_SELECTION} pigeons.`);
            }
        }
    };

    const calculatePrice = () => {
        const count = selectedPigeons.length;

        if(count < MIN_SELECTION) {
            return 0;
        }

        const basePrice = 50;
        const extraCostPerPigeon = 20;
        const extraPigeons = count - MIN_SELECTION;

        return basePrice + (extraPigeons * extraCostPerPigeon);

    }


    const isSelected = (index: number) => selectedPigeons.includes(index);
    const isMinSelected = selectedPigeons.length >= MIN_SELECTION;
    const isMaxSelected = selectedPigeons.length >= MAX_SELECTION;

    const currentPrice = calculatePrice();

    return {selectedPigeons,
        togglePigeon,
        isSelected,
        isMinSelected,
        isMaxSelected,
        currentPrice};
}