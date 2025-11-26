
import {useNavigate} from "react-router";
import React, { useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import '../UI/CSS/Login.css';
import Logo from '../../public/Logo.png';
import OpenEye from '../../public/OpenEye.png';
import ClosedEye from '../../public/ClosedEye.png';
import Footer from "../Component/Footer";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await login({ username, password });
        } catch (err) {
            console.error("Login failed:", err);
            setError("Login failed. Check credentials.");
        }
    };

    return (
        <div className="page-login">
            <span className="logo-login">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="background-login">
                <form className="content-login" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Brugernavn"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input user-input input-login"
                        />
                    </div>
                    <div className="input-wrapper password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input lock-input input-login"
                        />
                        <button
                            type="button"
                            className="show-password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <img
                                src={showPassword ? ClosedEye : OpenEye}
                                alt={showPassword ? "Hide password" : "Show password"}
                                className="eye-icon"
                            />
                        </button>
                    </div>

                    {error && <p className="error">{error}</p>}

                    <div className="button-wrapper">
                        <button type="button" className="button" onClick={() => navigate("/opret-bruger")}>Opret Login</button>
                        <button type="submit" className="button">Log Ind</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;
