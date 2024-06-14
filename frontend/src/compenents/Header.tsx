
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./signoutbutton";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between px-6">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/home">DreamHolidays.com</Link>
                </span>
                <span className="flex space-x-4">
                    {isLoggedIn ?
                        <>
                            <Link className="flex text-white items-center px-4 py-2 hover:bg-blue-600"  to="/my-bookings">My Bookings</Link>
                            <Link  className="flex text-white items-center px-4 py-2 hover:bg-blue-600 " to="/my-hotels">My Hotels</Link>
                            <SignOutButton/>
                        </>
                        :
                        <Link to="/sign-in" className="flex bg-white items-center text-blue-600 px-4 py-2 font-bold hover:bg-gray-100 rounded">
                            SIGN IN
                        </Link>
                    }
                </span>
            </div>
        </div>
    );
};

export default Header;
