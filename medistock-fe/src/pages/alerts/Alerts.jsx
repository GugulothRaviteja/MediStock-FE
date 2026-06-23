import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";

import { useNavigate } from "react-router-dom";

function Alerts() {

    const navigate = useNavigate();

    const [lowStockAlerts, setLowStockAlerts] = useState([]);

    const [expiryAlerts, setExpiryAlerts] = useState([]);

    // FETCH LOW STOCK ALERTS

    const getLowStockAlerts = async () => {

        try {

            const response = await API.get(
                "/alerts/low-stock"
            );

            setLowStockAlerts(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // FETCH EXPIRY ALERTS

    const getExpiryAlerts = async () => {

        try {

            const response = await API.get(
                "/alerts/expiry"
            );

            setExpiryAlerts(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getLowStockAlerts();

        getExpiryAlerts();

    }, []);

    return (

        <MainLayout >
            <div className="min-h-screen bg-gray-100 p-6">

                <h1 className="text-4xl font-bold text-gray-600 mb-8">
                    Alerts Dashboard
                </h1>

                {/* LOW STOCK ALERTS */}

                <div className="mb-10">

                    <h2 className="text-2xl font-semibold text-red-500 mb-4">
                        Low Stock Alerts
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {
                            lowStockAlerts.length > 0
                                ? (
                                    lowStockAlerts.map((alert) => (

                                        <div
                                            key={alert.medicineId}
                                            className="bg-white rounded-3xl p-6 shadow-sm border border-l-4 border-gray-500 border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50"
                                        >

                                            <h3 className="text-xl font-bold mb-2">
                                                {alert.medicineName}
                                            </h3>

                                            <p className="text-gray-700">
                                                Quantity Left:
                                                <span className="font-bold text-red-500 ml-2">
                                                    {alert.quantity}
                                                </span>
                                            </p>

                                            <p className="mt-3 text-red-800 font-medium">
                                                {alert.alertMessage}
                                            </p>

                                        </div>
                                    ))
                                )
                                : (
                                    <p className="text-gray-500">
                                        No low stock alerts
                                    </p>
                                )
                        }

                    </div>

                </div>

                {/* EXPIRY ALERTS */}

                <div>

                    <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
                        Expiry Alerts
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {
                            expiryAlerts.length > 0
                                ? (
                                    expiryAlerts.map((alert) => (

                                        <div
                                            key={alert.medicineId}
                                            className="bg-white rounded-3xl p-6 shadow-sm border border-l-4 border-gray-500 border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50"
                                        >

                                            <h3 className="text-xl font-bold mb-2">
                                                {alert.medicineName}
                                            </h3>

                                            <p className="text-gray-800">
                                                Expiry Date:
                                                <span className="font-bold ml-2 text-red-500">
                                                    {alert.expiryDate}
                                                </span>
                                            </p>

                                            <p className="text-gray-700 mt-2">
                                                Days Left:
                                                <span className="font-bold text-yellow-600 ml-2">
                                                    {alert.daysLeft}
                                                </span>
                                            </p>

                                            <p className="mt-3 text-yellow-800 font-medium">
                                                {alert.alertMessage}
                                            </p>

                                        </div>
                                    ))
                                )
                                : (
                                    <p className="text-gray-500">
                                        No expiry alerts
                                    </p>
                                )
                        }

                    </div>

                </div>

                <div className="flex justify-lest mt-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="
        bg-gray-600
        hover:bg-gray-700
        text-white
        px-6
        py-3
        rounded-xl
        transition
        "
                    >
                        ← Back
                    </button>

                </div>
            </div>
        </MainLayout>
    );
}

export default Alerts;