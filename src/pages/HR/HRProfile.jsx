import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import coverImg from '../../assets/images/cover.jpg'
import { FaArrowLeft } from 'react-icons/fa';

const HRProfile = () => {
    const { user } = useAuth()
    return (
        <div className='flex justify-center items-center h-screen container mx-auto'>
            <Link to="/hrdashboard" className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded-lg">
                <FaArrowLeft size={18} />
                Back to Dashboard
            </Link>
            <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
                <img
                    alt='cover photo'
                    src={coverImg}
                    className='w-full mb-4 rounded-t-lg h-56'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='p-2 px-4 text-xs bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded-full'>
                        Customer
                    </p>
                    <p className='mt-2 text-xl font-medium text-gray-800 '>
                        User Id: {user.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user.email}</span>
                            </p>

                            <div>
                                <button className='bg-[#83e7f4] hover:bg-[#51ddef] text-black px-10 py-1 rounded-lg cursor-pointer block mb-1'>
                                    Update Profile
                                </button>
                                <button className='bg-[#83e7f4] hover:bg-[#51ddef] px-7 py-1 rounded-lg text-black cursor-pointer'>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRProfile;