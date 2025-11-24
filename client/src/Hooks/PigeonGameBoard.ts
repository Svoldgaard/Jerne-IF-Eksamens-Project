import {useEffect, useState} from "react";

const MIN_SELECTION = 5;
const MAX_SELECTION = 8;

export function useTogglePigeon() {
    const [selectedPigeons, setSelectedPigeons] = useState<number[]>([]);
    const [showAlertMax, setShowAlertMax] = useState(false);
    const [showAlertMin, setShowAlertMin] = useState(false);

    const [priceList, setPriceList] = useState<Record<number, number>>({});

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch('http://localhost:5233/api/price');
                
                if(!response.ok){
                    throw new Error('HTTP error! status: ${response.status}');
                }
                const data = await response.json();
                
                const priceMap: Record<number, number> = {};
                
                data.forEach((item: any) => {
                    priceMap[item.amount] = item.price;
                });
                
                console.log("Prices loaded from DB: ", priceMap);
                setPriceList(priceMap);
                
            } catch (error) {
                console.error('Error fetching prices:', error);
                setPriceList({});
                //setPriceList({5: 20, 6: 40, 7: 80, 8: 160}); // Fallback prices
            }
        };
        fetchPrices();
        
    }, []);



    const calculatePrice = () => {
        const count = selectedPigeons.length;
        if(count < MIN_SELECTION) return 0

            return priceList[count] || 0;

    }

    const currentPrice = calculatePrice();



    const handleAlertMin = () => {
        if(!isMinSelected){
            setShowAlertMin(true);

            return false;
        }

        setShowAlertMin(false);
        return true;

    }


    const isSelected = (index: number) => selectedPigeons.includes(index);
    const isMinSelected = selectedPigeons.length >= MIN_SELECTION;
    const isMaxSelected = selectedPigeons.length >= MAX_SELECTION;

    //logic for changing colors when button is pressed
    const togglePigeon = (index: number) => {
        const isCurrentlySelected = selectedPigeons.includes(index);
        const currentCount = selectedPigeons.length;

        if (isCurrentlySelected) {
            setSelectedPigeons(selectedPigeons.filter(pigeonId => pigeonId !== index));

            setShowAlertMax(false);

        } else {
            if (currentCount < MAX_SELECTION) {
                const newSelection = [...selectedPigeons, index]
                setSelectedPigeons(newSelection);

                if (MIN_SELECTION == currentCount+1) {
                    setShowAlertMin(false);
                }
            } else {
                setShowAlertMax(true);

            }

        }
    };



    return {selectedPigeons,
        togglePigeon,
        isSelected,
        isMinSelected,
        isMaxSelected,
        currentPrice
    ,handleAlertMin,
    showAlertMin,
    showAlertMax,};
}