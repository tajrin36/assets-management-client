/* eslint-disable react/prop-types */

import { Link } from "react-router"

const Slide = ({ image, text }) => {
    return (
        <div
            className='w-full bg-center bg-cover h-[38rem] rounded-lg'
            style={{
                borderRadius: '8px',
                backgroundImage: `url(${image})`,
            }}
        >
            <div className='flex items-center justify-center w-full h-full bg-gray-900/40 rounded-lg'>
                <div className='text-center'>
                    {/* <h1 className='text-3xl font-semibold text-gray-600 lg:text-4xl'>
                        {text}
                    </h1> */}
                    <br />
                    {text === "HR" ? (
                        <Link
                            to="/join-hr"
                            className='w-full px-5 py-4 mt-4 text-md font-medium capitalize transition-colors duration-300 transform bg-lime-500  rounded-md  text-white lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
                        >
                            Join as HR
                        </Link>
                    ) : text === "Employee" ? (
                        <Link
                            to="/join-employee"
                            className='w-full px-5 py-4 mt-4 text-md font-medium capitalize transition-colors duration-300 transform bg-lime-500  rounded-md  text-white lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
                        >
                            Join as Employee
                        </Link>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Slide
