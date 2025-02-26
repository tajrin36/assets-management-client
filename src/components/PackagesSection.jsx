const PackagesSection = () => {
    const packages = 
    [
        { title: "Basic Plan", employees: "5 Employees", price: "$5", bg: "bg-red-100", text: "text-red-600" },
        { title: "Standard Plan", employees: "10 Employees", price: "$8", bg: "bg-green-100", text: "text-green-600" },
        { title: "Premium Plan", employees: "20 Employees", price: "$15", bg: "bg-blue-100", text: "text-blue-600" },
    ];

    return (
        <section className="py-12 bg-gray-100 mb-20">
            <div className="container mx-auto px-6 lg:px-20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Our Packages</h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Choose a plan that suits your company&apos;s needs and start managing assets efficiently.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <div key={index} className={`card p-6 shadow-lg rounded-lg ${pkg.bg}`}>
                            <h3 className={`text-2xl font-semibold ${pkg.text}`}>{pkg.title}</h3>
                            <p className="text-gray-700 mt-2">{pkg.employees}</p>
                            <p className="text-xl font-bold mt-3">{pkg.price}/month</p>
                            <button className={`btn btn-outline mt-4 ${pkg.text} border-2`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PackagesSection;
