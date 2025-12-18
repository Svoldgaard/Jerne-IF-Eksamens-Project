import {useEffect, useMemo, useState} from "react";
import {type AuthUserInfoDto, PriceClient, type PriceResponse} from "../generated-ts-client.ts";
import {authClient} from "../api-clients.ts";
import {apiUrl} from "../api-clients.ts";
//const baseUrl = "http://localhost:5233";
//const baseUrl = "https://jerne-if-api.fly.dev"

const MIN_SELECTION = 5;
const MAX_SELECTION = 8;

export function useTogglePigeon() {
    const [selectedPigeons, setSelectedPigeons] = useState<number[]>([]);
    const [showAlertMax, setShowAlertMax] = useState(false);
    const [showAlertMin, setShowAlertMin] = useState(false);

    const [isGameAvailable, setIsGameAvailable] = useState<boolean>(true);
    const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

    const [priceList, setPriceList] = useState<Record<number, number>>({});

    const buyPlade = async (userId: number, isRepeat: boolean) => {

        const requestBody = {
            selectedNumbers: selectedPigeons.map(num => num + 1), // So it can save as 1-16 instead of 0-15
            priceId: selectedPigeons.length,
            userId: userId,
            repeat: isRepeat
        };

        try {
            const response = await fetch (`${apiUrl}/api/plade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            return true;
        } catch (error){
            console.error('Error buying plade:', error);
            return false;
        }

    }



    const priceClient = useMemo(() => {
        return new PriceClient(apiUrl);
    }, []);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const data: PriceResponse[] = await priceClient.getPrices();

                const priceMap: Record<number, number> = {};

                data.forEach(item => {
                    priceMap[item.amount!] = item.price!;
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
        
    }, [priceClient]);



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

    const checkShopStatus = async () => {
        setLoadingStatus(true);
        try {

            const response = await fetch(`${apiUrl}/api/Plade/check-status`);
            if (response.ok) {
                const data = await response.json();
                setIsGameAvailable(data.isOpen);
            }
        } catch (err) {
            console.error("Could not check shop status", err);
            setIsGameAvailable(false);
        } finally {
            setLoadingStatus(false);
        }
    };

    const [currentUser, setCurrentUser] = useState<AuthUserInfoDto | null>(null);

    const fetchUser = async () => {
        try{
            const userData = await authClient.userInfo();

            console.log("User loaded: ", userData)
            setCurrentUser(userData);
        }catch(error){
            console.warn("Error fetching user info: ", error);
            setCurrentUser(null);
        }
        if (checkShopStatus) {
            await checkShopStatus();
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);



    return {selectedPigeons,
        togglePigeon,
        isSelected,
        isMinSelected,
        isMaxSelected,
        currentPrice
    ,handleAlertMin,
    showAlertMin,
    showAlertMax,
    buyPlade,
    checkShopStatus,
    isGameAvailable,
    loadingStatus,
    currentUser};
}