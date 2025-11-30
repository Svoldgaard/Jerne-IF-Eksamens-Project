// src/Pages/OpretBruger.tsx
import React, { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { authClient } from "../api-clients";
import type { RegisterRequest } from "../generated-ts-client";
import '../UI/CSS/OpretBruger.css';
import Logo from "../../public/Logo.png";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

function ProfilBruger() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {

            const request: RegisterRequest = {
                firstName,
                lastName,
                email,
                password,
                userName: email
            };

            await authClient.register(request);

            await login({ username: email, password });

        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed. Please check your input or try another email.");
        }
    };

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
