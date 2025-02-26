import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const AddAssetForm = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [dateAdded, setDateAdded] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const productType = form.productType.value;
        const productQuantity = form.productQuantity.value;
        // const addedBy = form.email.value;

        const assetData = {
            productName,
            productType,
            productQuantity,
            dateAdded, // Storing selected date
            addedBy: {
                email: user?.email,
                name: user?.displayName,
                photo: user?.photoURL,
            },
        };

        console.log(assetData);

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/assets`,
                assetData,
                { withCredentials: true }
            );

            form.reset();
            toast.success("Asset added successfully!");
            navigate("/assetlist");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <Link to="/hrdashboard" className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded-lg">
                    <FaArrowLeft size={18} />
                    Back to Dashboard
                </Link>
                <h2 className="text-2xl font-bold mb-4 text-center">Add an Asset</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            placeholder="Enter product name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Product Type</label>
                        <select
                            name="productType"
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="">Select Product Type</option>
                            <option value="Returnable">Returnable</option>
                            <option value="Non-returnable">Non-returnable</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Product Quantity</label>
                        <input
                            type="number"
                            name="productQuantity"
                            placeholder="Enter quantity"
                            className="input input-bordered w-full"
                            min="1"
                            required
                        />
                    </div>
                    {/* Date Input Field */}
                    <div>
                        <label className="label">Date Added</label>
                        <input
                            type="date"
                            value={dateAdded}
                            onChange={(e) => setDateAdded(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="btn bg-[#83e7f4] hover:bg-[#51ddef] text-black w-full">Add Asset</button>
                </form>
            </div>
        </div>
    );
};

export default AddAssetForm;
