import { useEffect, useState } from "react";
import API from "../../api/axios";
import MainLayout from "../../layouts/MainLayout";

function AIInsights() {

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetchInsights();
    }, []);

    const fetchInsights = async () => {

        try {

            const response =
                await API.get("/ai/insights");

            setMedicines(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const lowStock =
        medicines.filter(
            (m) => m.currentStock < 10
        );

    const topSelling =
        [...medicines]
            .sort(
                (a, b) =>
                    b.salesQuantity -
                    a.salesQuantity
            )
            .slice(0, 5);

    const slowMoving =
        medicines.filter(
            (m) =>
                m.currentStock > 50 &&
                m.salesQuantity < 10
        );

    return (

        <MainLayout>

            <div className="p-6">

                <h1 className="text-4xl font-bold text-gray-600 mb-8">
                    AI Inventory Insights
                </h1>

                {/* LOW STOCK */}

                <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">

                    <h2 className="text-2xl font-bold text-red-600 mb-4">
                        1. Low Stock Alerts
                    </h2>

                    {
                        lowStock.map((item) => (

                            <p key={item.medicineName}>
                                • {item.medicineName}
                                ({item.currentStock} left)
                            </p>
                        ))
                    }

                </div>

                {/* TOP SELLING */}

                <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">

                    <h2 className="text-2xl font-bold text-green-600 mb-4">
                        2. Top Selling Medicines
                    </h2>

                    {
                        topSelling.map((item) => (

                            <p key={item.medicineName}>
                                • {item.medicineName}
                                - {item.salesQuantity} sold
                            </p>
                        ))
                    }

                </div>

                {/* SLOW MOVING */}

                <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">

                    <h2 className="text-2xl font-bold text-orange-600 mb-4">
                        3. Slow Moving Medicines
                    </h2>

                    {
                        slowMoving.map((item) => (

                            <p key={item.medicineName}>
                                • {item.medicineName}
                                ({item.currentStock} stock)
                            </p>
                        ))
                    }

                </div>

                {/* INVENTORY HEALTH */}

                <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">

                    <h2 className="text-2xl font-bold text-blue-600 mb-4">
                        4. Inventory Health Summary
                    </h2>

                    <p>
                        Total Medicines :
                        {medicines.length}
                    </p>

                    <p>
                        Low Stock Items :
                        {lowStock.length}
                    </p>

                </div>

                {/* RESTOCK */}

                <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">

                    <h2 className="text-2xl font-bold text-purple-600 mb-4">
                        5. Restocking Recommendations
                    </h2>

                    {
                        lowStock.map((item) => (

                            <p key={item.medicineName}>
                                Order:
                                {item.medicineName}
                            </p>
                        ))
                    }

                </div>

                {/* BUSINESS RECOMMENDATIONS */}

                <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">

                    <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                        6. Business Recommendations
                    </h2>

                    <ul className="list-disc ml-6">

                        <li>
                            Restock fast-moving medicines
                            regularly.
                        </li>

                        <li>
                            Reduce excess stock of
                            slow-moving items.
                        </li>

                        <li>
                            Run promotional discounts
                            for low-selling medicines.
                        </li>

                        <li>
                            Monitor expiry medicines
                            weekly.
                        </li>

                    </ul>

                </div>

                {/* MONSOON PREDICTIONS */}

                <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">

                    <h2 className="text-2xl font-bold text-cyan-600 mb-4">
                        7. Seasonal & Disease Predictions
                    </h2>

                    <p>
                        Monsoon season may increase
                        demand for:
                    </p>

                    <ul className="list-disc ml-6 mt-2">

                        <li>Paracetamol</li>

                        <li>Cetirizine</li>

                        <li>Cough Syrups</li>

                        <li>Antibiotics</li>

                    </ul>

                    <p className="mt-4">
                        Maintain 30-50% extra stock
                        during rainy season.
                    </p>

                </div>

            </div>

        </MainLayout>
    );
}

export default AIInsights;