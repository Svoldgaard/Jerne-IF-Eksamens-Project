import './UI/CSS/App.css'
import Login from './UI/Login.tsx'
import {createBrowserRouter, Route, RouterProvider} from "react-router";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        }
    ])

  return <RouterProvider router={router}/>
}

export default App
