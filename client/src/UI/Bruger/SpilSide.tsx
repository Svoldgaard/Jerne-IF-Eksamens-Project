import '../CSS/SpilSide.css'
import Logo from "../../../public/Logo.png";
//import Baggrund from "../../Component/Baggrund.tsx";
import Header from "../../Component/Header.tsx";
import {useTogglePigeon} from "../../Hooks/PigeonGameBoard.ts";
import Footer from "../../Component/Footer.tsx";
import Alert from '@mui/material/Alert';

import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {myUserAtom} from "../../Atoms/MyUserAtom.ts";


export type ClickableGridUIProps ={
    activeIndices?: number[];
    onCellClick?: (index: number) => void;
    className?: string;
};

export default function SpilSide({ className =""}: ClickableGridUIProps) {
    const rows = 4;
    const cols = 4;
    const total = rows * cols;

    const [isRepeatCheked, setIsRepeat] = useState(false);



    //const activeSet = new Set(activeIndices);

    const {selectedPigeons,
        togglePigeon,
        currentPrice,
        handleAlertMin,
        showAlertMin,
        showAlertMax,
        buyPlade} = useTogglePigeon();

    const navigate = useNavigate();

    const [user] = useAtom(myUserAtom);
    // const [token] = useAtom(tokenAtom);
    //
    // useEffect(() => {
    //     const restoreUser = async () => {
    //         if (token && !user) {
    //             try {
    //                 const userInfo = await authClient.userInfo();
    //
    //
    //                 setUser(userInfo as any);
    //                 console.log("User info restored from token.", userInfo);
    //             } catch (error) {
    //                 console.error("Failed to restore user info:", error);
    //             }
    //         }
    //     }
    //     restoreUser();
    // }, [token, user, setUser]);



    const handlePayment = async () => {
         const isValid = handleAlertMin();
         if (!isValid) return;


        const realUser = user as any;
        const userIdToUse = realUser?.userId || realUser?.brugerid;
         //const fakeUserId = 2;

        // Debug log to see what we actually have
        console.log("Current User Object:", realUser);
        console.log("ID to use:", userIdToUse);

        if(!user || !userIdToUse){
            alert("Du skal være logget ind for at købe en plade.");

            return;
        }



        const success = await buyPlade(userIdToUse, isRepeatCheked);

         if(success){
             alert("Tak for dit køb! ");
             navigate("/aktiv-spil");
         } else{
                alert("Der opstod en fejl under købet. Prøv venligst igen.");
         }
    }

    return (
        <div className="page-plade">
            <span className="logo-plade">
                <img src={Logo} alt="Logo" onClick={() => navigate("/forside")}/>
            </span>


            <div className="main-container">
                <Header/>
                <div className="background-spilside">

                    <div>
                        <a className="text-uge"> Nuværende spil: Uge 48 2025</a>
                    </div>


                    <div className={`cg-container ${className}`}>
                        <div
                        role="grid"
                        aria-rowcount={rows}
                        aria-colcount={cols}
                        className="cg-grid"
                        style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}
                        >

                            {Array.from({length: total}).map((_, idx) => {
                                const isActive = selectedPigeons.includes(idx);
                                return(
                                <button
                                    key={idx}
                                    role="gridcell"
                                    aria-selected={isActive}
                                    className={`cg-cell button-plade ${isActive ? "cg-cell-active" : ""}`}
                                    onClick={() => togglePigeon(idx)}
                                >
                                    {idx + 1}
                                </button>
                                );
                            })}
                        </div>
                    </div>

                        <p className="text"> Pris: {currentPrice} DKK </p>

                    <div>
                        {showAlertMax && (
                            <div style={{ maxWidth: '300px', margin: '10px auto' }}>
                                <Alert severity="warning">
                                    Du har valgt det maksimale antal på 8 duer!
                                </Alert>
                            </div>
                        )}

                        {showAlertMin && (
                            <div style={{ maxWidth: '300px', margin: '10px auto' }}>
                                <Alert severity="warning">
                                    Vælg mindst 5 duer!
                                </Alert>
                            </div>
                        )}

                        <button
                            className="button-gem"
                            onClick={handlePayment}
                        >
                            Betal
                        </button>


                    </div>

                    <div className="repeat-row">
                        <p>Gentag hver uge</p>
                            <input type="checkbox"
                                   className="checkbox-plade"
                                    checked={isRepeatCheked}
                                    onChange={(e) => setIsRepeat(e.target.checked)}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

//export default SpilSide;