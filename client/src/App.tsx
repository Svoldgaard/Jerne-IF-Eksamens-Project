import './UI/CSS/App.css'
import Login from './UI/Login.tsx'
import SpilSide from './UI/Bruger/SpilSide.tsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import AktivSpil from "./UI/Bruger/AktivSpil.tsx";
import SpilhistorikBruger from "./UI/Bruger/SpilhistorikBruger.tsx";
import ProfilBruger from "./UI/Bruger/ProfilBruger.tsx";
import ForsideBruger from "./UI/Bruger/ForsideBruger.tsx";
import Regler from "./UI/Regler.tsx";
import ForsideAdmin from "./UI/Admin/ForsideAdmin.tsx";
import OpretBruger from "./UI/OpretBruger.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
          path: "/forside",
          element: <ForsideBruger/>
        },
        {
            path: "/forside-admin",
            element: <ForsideAdmin/>
        },
        {
            path: "/køb-plade",
            element: <SpilSide/>
        },
        {
            path: "/aktiv-spil",
            element: (
                <AktivSpil
                    boards={[
                        { id: "Loading...", activeIndices: [] }
                    ]}
                />
            )
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
            path: "/profil-admin",
            element: <ProfilBruger/>
        },
        {
            path: "/regler",
            element: <Regler/>
        },
        {
            path: "/opret-bruger",
            element: <OpretBruger/>
        }
    ])

  return <RouterProvider router={router}/>
}

export default App
