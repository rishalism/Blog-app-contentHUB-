import { Button } from "@nextui-org/react";
import { FaBlog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { clearUser } from "../redux/slices/UserSlice";

function Header() {

    const { UserInfo } = useSelector((state: RootState) => state.user)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    function handleLogout() {
        dispatch(clearUser())
        Navigate('/auth/login')
    }

    return (
        <header className="bg-white  py-4 border-1 shadow-lg ">
            <div className="px-4 flex justify-between items-center">
                <div className=" text-xl  font-bold">
                    <Link to={'/'} className="flex items-end gap-3"><FaBlog className="text-purple-700" size={'40'} /> <h2 className="text-2xl">ContentHub</h2> </Link>
                </div>
                <nav className="flex gap-4">
                    {
                        UserInfo ? <Button onClick={handleLogout} variant="ghost"> Log out</Button>
                            : <Button as={Link} to={'/auth/login'} variant="ghost"> Log In</Button>
                    }
                    <Button as={Link} to={'/feed'} color="secondary">Get started</Button>
                </nav>
            </div>
        </header>
    )
}

export default Header
