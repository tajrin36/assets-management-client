import { FaCheckCircle } from "react-icons/fa";

import banner from '../assets/images/pngtree-asset-management-concept-vector-web-banner-illustration-earnings-payment-illustration-vector-png-image_40005492.webp'

const AboutSection = () => {
    return (
        <section className="bg-gray-100 py-12 my-20">
            <div className="container mx-auto px-6 lg:px-20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">About Our Asset Management System</h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Efficiently manage your company&apos;s assets with our powerful web application, designed to help HR Managers track and organize company resources.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Image Section */}
                    <div>
                        <img
                            src={banner}
                            alt="Asset Management"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>

                    {/* Text Section */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Our System?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                <span>Efficiently track company assets and resources</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                <span>Monitor both Returnable & Non-returnable assets</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                <span>User-friendly dashboard for HR Managers</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                <span>Subscription-based model for businesses of all sizes</span>
                            </li>
                        </ul>
                        <button className="btn bg-[#83e7f4] mt-5">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
