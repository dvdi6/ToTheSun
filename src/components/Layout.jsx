import { Outlet } from "react-router-dom"
import NavBar from "./NavBar/NavBar"


export default function Layout() {
    return (
        <div>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}