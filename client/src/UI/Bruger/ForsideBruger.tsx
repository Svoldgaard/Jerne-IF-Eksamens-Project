import {useNavigate} from "react-router";

function ForsideBruger() {
    const navigate = useNavigate();

    return (
        <div>
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
                <button onClick={() => navigate("/profil")}>
                    Profil
                </button>
            </div>
        </div>
    )
}

export default ForsideBruger;