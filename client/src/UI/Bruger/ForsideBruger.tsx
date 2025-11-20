import {useNavigate} from "react-router";
import Header from "../../Component/Header.tsx";

function ForsideBruger() {
    const navigate = useNavigate();

    return (
        <div>
            <Header/>
            <div>
            <button onClick={() => navigate("/købplade")}>
                Køb Plade
            </button>
            <button onClick={() => navigate("/aktiv-spil")}>
                Aktive Spil
            </button>
            </div>
            <div>
                <button onClick={() => navigate("/spilhistorik")}>
                    Spilhistorik
                </button>
                <button onClick={() => navigate("/profil-bruger")}>
                    Profil
                </button>
            </div>
        </div>
    )
}

export default ForsideBruger;