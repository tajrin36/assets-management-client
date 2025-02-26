import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import xyzLogo from '../../assets/images/logo.png'


const EmployeeDashboard = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100 mx-auto container">
            {/* Sidebar for large screens */}
            <div className="hidden md:flex flex-col w-64 bg-white shadow-md p-5">
                <img src={user?.companyLogo ? user.companyLogo : xyzLogo} alt="Company Logo" className="h-16 mx-auto mb-4" />
                <nav className="space-y-4">
                    <Link to="/empdashboard" className="block p-2 rounded hover:bg-gray-200">Home</Link>
                    <Link to="/my-assets" className="block p-2 rounded hover:bg-gray-200">My Assets</Link>
                    <Link to="/my-team" className="block p-2 rounded hover:bg-gray-200">My Team</Link>
                    <Link to="/request-asset" className="block p-2 rounded hover:bg-gray-200">Request for an Asset</Link>
                    <Link to="/empprofile" className="block p-2 rounded hover:bg-gray-200">Profile</Link>
                </nav>
                <div className="mt-auto flex items-center gap-2 border-t pt-4">
                    <img src={user?.photoURL} alt="Profile" className="h-10 w-10 rounded-full" />
                    <span>{user?.displayName}</span>
                </div>
                <button onClick={logOut} className="mt-4 p-2 bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded ">Logout</button>
            </div>

            {/* Mobile menu as a Drawer */}
            <div className={`md:hidden fixed inset-0 z-10 transition-all ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}>
                <div className={`fixed top-0 left-0 w-64 bg-white shadow-md p-5 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
                    <div className="flex justify-between items-center">
                        <img src={user?.companyLogo || "/xyz-logo.png"} alt="Company Logo" className="h-10" />
                        <button onClick={toggleMenu} className="text-xl">
                            <FaTimes />
                        </button>
                    </div>
                    <nav className="space-y-4 mt-4">
                        <Link to="/empdashboard" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>Home</Link>
                        <Link to="/my-assets" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>My Assets</Link>
                        <Link to="/my-team" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>My Team</Link>
                        <Link to="/request-asset" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>Request for an Asset</Link>
                        <Link to="/empprofile" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>Profile</Link>
                    </nav>
                    <div className="mt-4 flex items-center gap-2 border-t pt-4">
                        <img src={user?.photoURL} alt="Profile" className="h-10 w-10 rounded-full" />
                        <span>{user?.displayName}</span>
                    </div>
                    <button onClick={logOut} className="mt-4 p-2 bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded">Logout</button>
                </div>
            </div>


            {/* Main content */}
            <div className="flex-1 p-5">
                <div className="flex items-center justify-between">
                    <button onClick={toggleMenu} className="md:hidden text-xl">
                        <FaBars />
                    </button>
                    <h1 className="text-2xl font-bold">Welcome, {user?.displayName}</h1>
                </div>
                <p>Your dashboard content goes here.</p>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
