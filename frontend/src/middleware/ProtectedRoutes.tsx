import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Navigate, Outlet, useLocation } from "react-router-dom"

function ProtectedRoutes() {

    const { UserInfo } = useSelector((state: RootState) => state.user)
    const location = useLocation()
    if (!UserInfo) {
        return <Navigate to={'/auth/login'} state={{ from: location }} replace></Navigate>
    }
    return <Outlet />
}


export default ProtectedRoutes
