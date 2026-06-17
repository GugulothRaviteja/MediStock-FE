// import { useEffect, useState } from "react";
// import API from "../../api/axios";
// import MainLayout from "../../layouts/MainLayout";
// import { useNavigate } from "react-router-dom";

// function AIInsights() {

//     const navigate = useNavigate();

//     const [insights, setInsights] = useState([]);

//     const fetchAIInsights = async () => {

//         try {

//             const response = await API.get(
//                 "/ai/insights"
//             );

//             setInsights(response.data);

//         } catch (error) {

//             console.log(error);
//         }
//     };

//     useEffect(() => {

//         fetchAIInsights();

//     }, []);

//     return (

//         <MainLayout>
//             <div className="min-h-screen bg-gray-100 p-6">

//                 <h1 className="text-4xl font-bold text-blue-600 mb-8">
//                     AI Inventory Insights
//                 </h1>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//                     {
//                         insights.length > 0
//                             ? (
//                                 insights.map((item, index) => (

//                                     <div
//                                         key={index}
//                                         className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600"
//                                     >

//                                         <h2 className="text-2xl font-bold text-purple-600 mb-4">
//                                             {item.medicineName}
//                                         </h2>

//                                         {/* CURRENT STOCK */}

//                                         <div className="mb-3">

//                                             <p className="text-gray-600">
//                                                 Current Stock
//                                             </p>

//                                             <p className="text-xl font-semibold">
//                                                 {item.currentStock}
//                                             </p>

//                                         </div>

//                                         {/* MONTHLY SALES */}

//                                         <div className="mb-3">

//                                             <p className="text-gray-600">
//                                                 Estimated Monthly Sales
//                                             </p>

//                                             <p className="text-xl font-semibold">
//                                                 {item.estimatedMonthlySales}
//                                             </p>

//                                         </div>

//                                         {/* RUNOUT DAYS */}

//                                         <div className="mb-3">

//                                             <p className="text-gray-600">
//                                                 Estimated Runout Days
//                                             </p>

//                                             <p className="text-xl font-semibold text-red-500">
//                                                 {item.estimatedRunOutDays} Days
//                                             </p>

//                                         </div>

//                                         {/* RECOMMENDATION */}

//                                         <div className="mt-5 bg-purple-100 p-4 rounded-lg">

//                                             <p className="font-medium text-purple-700">
//                                                 {item.recommendation}
//                                             </p>

//                                         </div>

//                                     </div>
//                                 ))
//                             )
//                             : (
//                                 <p className="text-gray-500">
//                                     No AI insights available
//                                 </p>
//                             )
//                     }

//                 </div>

//                  <div className="flex justify-lest mt-6">

//                     <button
//                         onClick={() => navigate(-1)}
//                         className="
//         bg-gray-600
//         hover:bg-gray-700
//         text-white
//         px-6
//         py-3
//         rounded-xl
//         transition
//         "
//                     >
//                         ← Back
//                     </button>

//                 </div>

//             </div>
//         </MainLayout>
//     );
// }

// export default AIInsights;


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

                <div className="bg-white p-6 rounded-xl shadow mb-6">

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

                <div className="bg-white p-6 rounded-xl shadow mb-6">

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

                <div className="bg-white p-6 rounded-xl shadow mb-6">

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

                <div className="bg-white p-6 rounded-xl shadow mb-6">

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

                <div className="bg-white p-6 rounded-xl shadow mb-6">

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

                <div className="bg-white p-6 rounded-xl shadow mb-6">

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

                <div className="bg-white p-6 rounded-xl shadow mb-6">

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