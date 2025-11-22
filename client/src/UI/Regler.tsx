import '../UI/CSS/Regler.css'
import {useEffect, useState} from "react";
import Logo from "../../public/Logo.png";
import Header from "../Component/Header.tsx";
import Footer from "../Component/Footer.tsx";


function Regler() {
    const [rules, setRules] = useState("");
    const parts = rules.split("=== PRICE_TABLE ===");

    useEffect(() => {
        fetch("/Regler.txt")
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.text();
            })
            .then(text => setRules(text))
            .catch(err => console.error("Could not load rules:", err));
    }, []);

    return (
        <div className="page-regler">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
                <Header/>
                <div className="background-profil">
                    <h1 className="header-regler">Regler for spillet Døde Duer</h1>
                   {/* <pre className="regler">*/}
                   {/*     {rules || "Loading Rules..."}*/}
                   {/*</pre>*/}

                    <div className="text-regler">
                        {parts[0]}
                    </div>

                    <table className="price-table">
                        <thead>
                            <tr>
                                <th>Antal tal</th>
                                <th>Pris</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>5</td>
                                <td>20 DKK</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>40 DKK</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>80 DKK</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>160 DKK</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="text-regler">
                        {parts[1]}
                    </div>

                </div>
            </div>
            <Footer/>
        </div>

    )
}

export default Regler;