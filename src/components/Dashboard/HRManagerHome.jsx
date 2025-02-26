import { useEffect, useState } from "react";
import axios from "axios";

const HRManagerHome = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [topRequested, setTopRequested] = useState([]);
    const [limitedStock, setLimitedStock] = useState([]);

    useEffect(() => {
        // Fetch pending asset requests
        axios.get(`${import.meta.env.VITE_API_URL}/requests?status=pending&limit=5`)
            .then(res => setPendingRequests(res.data))
            .catch(err => console.error("Error fetching pending requests:", err));

        // Fetch most requested assets
        axios.get(`${import.meta.env.VITE_API_URL}/assets/top-requested?limit=4`)
            .then(res => setTopRequested(res.data))
            .catch(err => console.error("Error fetching top requested assets:", err));

        // Fetch limited stock items
        axios.get(`${import.meta.env.VITE_API_URL}/assets?stock=low`)
            .then(res => setLimitedStock(res.data))
            .catch(err => console.error("Error fetching limited stock items:", err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">HR Manager Dashboard</h1>

            {/* Pending Requests */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Pending Requests</h2>
                <div className="bg-white shadow-md rounded-lg p-4">
                    {pendingRequests.length ? (
                        pendingRequests.map(request => (
                            <div key={request.id} className="border-b py-2">
                                {request.productName} - Requested by {request.employeeName}
                            </div>
                        ))
                    ) : (
                        <p>No pending requests.</p>
                    )}
                </div>
            </section>

            {/* Top Most Requested Items */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Top Most Requested Items</h2>
                <div className="grid grid-cols-2 gap-4">
                    {topRequested.map(asset => (
                        <div key={asset.id} className="bg-white shadow-md p-4 rounded-lg">
                            <h3 className="font-semibold">{asset.productName}</h3>
                            <p>Requests: {asset.requestCount}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Limited Stock Items */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Limited Stock Items (Less than 10)</h2>
                <div className="grid grid-cols-2 gap-4">
                    {limitedStock.map(asset => (
                        <div key={asset.id} className="bg-red-100 shadow-md p-4 rounded-lg">
                            <h3 className="font-semibold">{asset.productName}</h3>
                            <p>Quantity: {asset.productQuantity}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HRManagerHome;
