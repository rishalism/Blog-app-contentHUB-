import { Outlet } from "react-router-dom"
import Header from "./Header"

function UserLayout() {
    return (
        <div className="w-full flex flex-col ">
            <Header />
            <Outlet />
        </div>
    )
}

export default UserLayout
