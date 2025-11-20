import {useNavigate} from "react-router";
import Header from "../../Component/Header.tsx";

function ForsideAdmin() {
    const navigate = useNavigate();

    return (
        <div>
            <Header/>
            <div>
                <button onClick={() => navigate ("/aktiv-plader")}>
                    Aktive Plader
                </button>
                <button onClick={() => navigate ("/spilhistorik") }>
                    Spilhistorik
                </button>
            </div>
            <div>
                <button onClick={() => navigate ("/regler") }>
                    Regler
                </button>
                <button onClick={() => navigate ("/profil-admin") }>
                    Profil
                </button>
            </div>
        </div>
    )
}

export default ForsideAdmin;