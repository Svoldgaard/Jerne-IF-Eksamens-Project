import './UI/CSS/App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './UI/Login.tsx'
import SpilSide from './UI/Bruger/SpilSide.tsx'
import AktivSpil from "./UI/Bruger/AktivSpil.tsx";
import SpilhistorikBruger from "./UI/Bruger/SpilhistorikBruger.tsx";
import ProfilBruger from "./UI/Bruger/ProfilBruger.tsx";
import ForsideBruger from "./UI/Bruger/ForsideBruger.tsx";
import OverblikOverBruger from "./UI/Admin/OverblikOverBruger.tsx";
import Regler from "./UI/Regler.tsx";
import ForsideAdmin from "./UI/Admin/ForsideAdmin.tsx";
import OpretBruger from "./UI/OpretBruger.tsx";
import AktivePlader from "./UI/Admin/AktivePlader.tsx";
import SpilhistorikAdmin from "./UI/Admin/SpilhistorikAdmin.tsx";
import Vindertal from "./UI/Admin/Vindertal.tsx";
import VundetPlader from "./UI/Admin/VundetPlader.tsx";

const App = () => {

    const router = createBrowserRouter([
        // Login
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/opret-bruger",
            element: <OpretBruger/>
        },

        // Bruger
        {
          path: "/forside",
          element: <ForsideBruger/>
        },
        {
            path: "/køb-plade",
            element: <SpilSide/>
        },
        {
            path: "/aktiv-spil",
            element: <AktivSpil/>
        },
        {
            path: "/spilhistorik",
            element: <SpilhistorikBruger/>
        },
        {
            path: "/profil-bruger",
            element: <ProfilBruger/>
        },
        {
            path: "/regler",
            element: <Regler/>
        },

        // Admin
        {
            path: "/forside-admin",
            element: <ForsideAdmin/>
        },
        {
            path: "/overblik-admin",
            element: <OverblikOverBruger/>
        },
        {
            path: "/aktive-plader-admin",
            element: <AktivePlader/>
        },
        {
            path: "/spilhistorik-admin",
            element: <SpilhistorikAdmin/>
        },
        {
            path: "/vindertal-admin",
            element: <Vindertal/>
        },
        {
            path: "/vundet-plader-admin",
            element: <VundetPlader/>
        },
        {
            path: "/regler-admin",
            element: <Regler/>
        },
    ])

  return <RouterProvider router={router}/>
}

export default App;