import React from "react";
import '../UI/CSS/OpretBruger.css';
import Logo from "../../public/Logo.png";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import {useOpretbruger} from "../Hooks/useOpretBruger.ts";

const ProfilBruger = () => {
    const {
        email,
        setEmail,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        password,
        setPassword,
        error,
        handleRegister,
    } = useOpretbruger();




    return (
        <div className="page-profil">
            <span className="logo-plade">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="main-container">
                <Header/>
                <form className="background-profil" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Fornavn"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Efternavn"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Opret</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default ProfilBruger;
