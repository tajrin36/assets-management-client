import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import xyzLogo from '../../assets/images/logo.png';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import HRManagerHome from "./HRManagerHome";

const HrManagerDashboard = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100 mx-auto container">
            {/* Sidebar for large screens */}
            <div className="hidden md:flex flex-col w-64 bg-white shadow-md p-5">
                {/* Company Logo */}
                <img src={user?.photoURL} alt="Company Logo" className="h-16 mx-auto mb-4" />

                {/* Sidebar Links */}
                <nav className="space-y-4">
                    <Link to="/hrdashboard" className="block p-2 rounded hover:bg-gray-200">Home</Link>
                    <Link to="/assetlist" className="block p-2 rounded hover:bg-gray-200">Asset List</Link>
                    <Link to="/addasset" className="block p-2 rounded hover:bg-gray-200">Add an Asset</Link>
                    <Link to="/all-requests" className="block p-2 rounded hover:bg-gray-200">All Requests</Link>
                    <Link to="/employee-list" className="block p-2 rounded hover:bg-gray-200">My Employee List</Link>
                    <Link to="/add-employee" className="block p-2 rounded hover:bg-gray-200">Add an Employee</Link>
                    <Link to="/hrprofile" className="block p-2 rounded hover:bg-gray-200">Profile</Link>
                </nav>

                {/* User Info */}
                <div className="mt-auto flex items-center gap-2 border-t pt-4">
                    <img src={user?.photoURL} alt="Profile" className="h-10 w-10 rounded-full" />
                    <span>{user?.displayName}</span>
                </div>

                {/* Logout Button */}
                <button onClick={logOut} className="mt-4 p-2 bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded">
                    Logout
                </button>
            </div>

            {/* Mobile Sidebar (Drawer) */}
            <div className={`md:hidden fixed inset-0 z-10 transition-all ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}>
                <div className={`fixed top-0 left-0 w-64 bg-white shadow-md p-5 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
                    {/* Logo and Close Button */}
                    <div className="flex justify-between items-center">
                        <img src={user?.companyLogo || xyzLogo} alt="Company Logo" className="h-10" />
                        <button onClick={toggleMenu} className="text-xl">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-4 mt-4">
                        <Link to="/hrdashboard" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>Home</Link>
                        <Link to="/assetlist" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>Asset List</Link>
                        <Link to="/addasset" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>Add an Asset</Link>
                        <Link to="/all-requests" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>All Requests</Link>
                        <Link to="/employee-list" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>My Employee List</Link>
                        <Link to="/add-employee" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>Add an Employee</Link>
                        <Link to="/hrprofile" className="block p-2 rounded hover:bg-gray-200" onClick={toggleMenu}>Profile</Link>
                    </nav>

                    {/* User Info */}
                    <div className="mt-4 flex items-center gap-2 border-t pt-4">
                        <img src={user?.photoURL} alt="Profile" className="h-10 w-10 rounded-full" />
                        <span>{user?.displayName}</span>
                    </div>

                    {/* Logout Button */}
                    <button onClick={logOut} className="mt-4 p-2 bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded">
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-5">
                <div className="flex items-center justify-between">
                    <button onClick={toggleMenu} className="md:hidden text-xl">
                        <FaBars />
                    </button>
                </div>
                <div>
                    <HRManagerHome></HRManagerHome>
                </div>
            </div>
        </div>
    );
};

export default HrManagerDashboard;
