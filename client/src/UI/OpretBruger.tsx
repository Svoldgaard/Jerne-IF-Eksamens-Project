import React from "react";
import '../UI/CSS/OpretBruger.css';
import Logo from "../Assets/Logo.png";
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
                    <h1 className="header-opretbruger">Opret Bruger</h1>
                    <div className="opretbruger-row">
                        <label>Navn:</label>
                        <input
                            type="text"
                            placeholder="Fornavn"
                            className="input-opretbruger"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="opretbruger-row">
                        <label>Efternavn:</label>
                        <input
                            type="text"
                            placeholder="Efternavn"
                            className="input-opretbruger"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="opretbruger-row">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input-opretbruger"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="opretbruger-row">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-opretbruger"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="button-opretbruger" type="submit">Opret</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default ProfilBruger;
