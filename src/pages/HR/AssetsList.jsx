import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const AssetsList = () => {
    const [assets, setAssets] = useState([]);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterStock, setFilterStock] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/assets`)
            .then(res => setAssets(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/assets/${id}`);
            setAssets(assets.filter(asset => asset._id !== id));
        } catch (err) {
            console.error("Failed to delete asset", err);
        }
    };

    const handleUpdateClick = (asset) => {
        setSelectedAsset(asset);
        setShowModal(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/assets/${selectedAsset._id}`, selectedAsset);
            setAssets(assets.map(asset => (asset._id === selectedAsset._id ? selectedAsset : asset)));
            setShowModal(false);
        } catch (err) {
            console.error("Failed to update asset", err);
        }
    };

    const filteredAssets = assets.filter(asset =>
        asset.productName.toLowerCase().includes(search.toLowerCase()) &&
        (filterType ? asset.productType === filterType : true) &&
        (filterStock ? (filterStock === "available" ? asset.productQuantity > 0 : asset.productQuantity === 0) : true)
    );

    const sortedAssets = [...filteredAssets].sort((a, b) => {
        return sortOrder === "asc" ? a.productQuantity - b.productQuantity : b.productQuantity - a.productQuantity;
    });

    return (
        <div className="p-6">
            <Link to="/hrdashboard" className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-[#83e7f4] hover:bg-[#51ddef] text-black rounded-lg">
                <FaArrowLeft size={18} />
                Back to Dashboard
            </Link>
            <h2 className="text-2xl font-bold mb-4">Asset List</h2>

            {/* Search Bar */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="input input-bordered w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="text-xl" />
            </div>

            {/* Filter & Sorting Section */}
            <div className="flex gap-4 mb-4">
                <select className="select select-bordered" onChange={(e) => setFilterType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
                <select className="select select-bordered" onChange={(e) => setFilterStock(e.target.value)}>
                    <option value="">All Stock</option>
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
                <button
                    className="btn"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                    Sort by Quantity ({sortOrder})
                </button>
            </div>

            {/* Asset List */}
            <table className="table w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th>Product Name</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Date Added</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAssets.map((asset) => (
                        <tr key={asset._id}>
                            <td>{asset.productName}</td>
                            <td>{asset.productType}</td>
                            <td>{asset.productQuantity}</td>
                            <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="btn btn-sm bg-[#83e7f4] hover:bg-[#51ddef] text-black mr-2"
                                    onClick={() => handleUpdateClick(asset)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn btn-sm bg-red-500 text-white"
                                    onClick={() => handleDelete(asset._id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Update Asset</h2>
                        <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                className="input input-bordered"
                                value={selectedAsset.productName}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, productName: e.target.value })}
                            />
                            <input
                                type="number"
                                className="input input-bordered"
                                value={selectedAsset.productQuantity}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, productQuantity: e.target.value })}
                            />
                            <select
                                className="select select-bordered"
                                value={selectedAsset.productType}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, productType: e.target.value })}
                            >
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                            <button type="submit" className="btn bg-blue-500 text-white">
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn bg-gray-400 text-white"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AssetsList;
