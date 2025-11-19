import '../UI/CSS/Login.css'
import '../UI/CSS/Footer.css'
import Logo from '../../public/Logo.png';
import OpenEye from '../../public/OpenEye.png';
import ClosedEye from '../../public/ClosedEye.png';
import Footer from "../Component/Footer";
import {useState} from "react";


function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return(
        <div className="page">
            <span className="logo">
                <img src={Logo} alt="Logo"/>
            </span>
            <div className="background">
                <div className="content">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Brugernavn"
                            required={true}
                            className="input user-input"
                        />
                    </div>
                    <p></p>
                    <div className="input-wrapper password-wrapper">
                        <input
                            type={showPassword? "text" : "password"}
                            placeholder="Password"
                            required={true}
                            className="input lock-input"
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
                    <div>
                        <p></p>
                        <a>
                            Glemt Password
                        </a>
                    </div>
                    <p></p>
                    <div className="button-wrapper">
                        <button type='submit' className="button arrow-button">
                            LOG IND
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;