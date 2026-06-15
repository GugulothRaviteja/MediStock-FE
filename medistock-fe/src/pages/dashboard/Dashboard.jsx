import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import {
    FaCapsules,
    FaBoxes,
    FaExclamationTriangle,
    FaCalendarTimes,
    FaRupeeSign
} from "react-icons/fa";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState({
        totalMedicines: 0,
        totalStockQuantity: 0,
        lowStockCount: 0,
        expiryAlertCount: 0,
        totalMedicinesSold: 0,
        totalSalesRevenue: 0,
    });

    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    useEffect(() => {

        const showWelcome =
            localStorage.getItem("welcomeMessage");

        if (
            showWelcome === "true" &&
            role === "STAFF"
        ) {

            toast.success(
                `Welcome ${username} as a new staff member 🙏🏼`
            );

            localStorage.removeItem(
                "welcomeMessage"
            );
        }

    }, []);

    const userName = localStorage.getItem("userName");

    const stockData = [
        {
            name: "Total Medicines",
            value: dashboardData.totalMedicines,
            fill: "#23ca60",
        },
        {
            name: "Low Stock",
            value: dashboardData.lowStockCount,
            fill: "#e18035"
        },
        {
            name: "Expiry Alerts",
            value: dashboardData.expiryAlertCount,
            fill: "#facc15"

        },
    ];

    const pieData = [
        {
            name: "Available Stock",
            value: dashboardData.totalStockQuantity,
            fill: "#23ca60",

        },
        {
            name: "Sales",
            value: dashboardData.totalSales,
            fill: "#23a6ca",

        },
    ];

    const getDashboardSummary = async () => {

        try {

            const response = await API.get(
                "/dashboard/summary"
            );

            setDashboardData(response.data);
            localStorage.setItem(
                "lowStockCount",
                response.data.lowStockCount
            );

            localStorage.setItem(
                "expiryAlertCount",
                response.data.expiryAlertCount
            );

        } catch (error) {

            console.log("Dashboard Error", error);
        }
    };

    useEffect(() => {

        getDashboardSummary();

    }, []);

    const navigate = useNavigate();

    return (

        <MainLayout>
            <div className="min-h-screen bg-[#F7F8FC] p-6">

                {/* <div
                    className="
                    bg-gray-800
                    text-white
                    rounded-3xl
                    p-8
                    mb-8
                    shadow-lg
                    "
                >
                    <h2 className="text-3xl font-bold">
                        Welcome to MediStock
                    </h2>
                    <p className="mt-2 opacity-90">
                        Manage medicines, monitor stock,
                        expiry alerts and sales in one place.
                    </p>
                </div> */}


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Total Medicines */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border hover:bg-gray-700">

                        <div className="flex justify-between items-center">

                            <div onClick={() =>
                                navigate("/medicines")
                            }>

                                <p className="text-gray-500">
                                    Total Medicines
                                </p>

                                <h2 className="text-4xl font-bold text-blue-800 mt-3">
                                    {dashboardData.totalMedicines}
                                </h2>

                            </div>

                            <div className="bg-blue-100 p-4 rounded-2xl">

                                <FaCapsules
                                    size={28}
                                    className="text-blue-600"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Total Stock */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border hover:bg-gray-700"
                        onClick={() =>
                            navigate("/medicines")
                        }>

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">
                                    Total Stock
                                </p>

                                <h2 className="text-4xl font-bold text-green-600 mt-3">
                                    {dashboardData.totalStockQuantity}
                                </h2>

                            </div>

                            <div className="bg-green-100 p-4 rounded-2xl">

                                <FaBoxes
                                    size={28}
                                    className="text-green-600"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Low Stock */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border hover:bg-gray-700 "

                        onClick={() =>
                            navigate("/medicines/low-stock")
                        }
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">
                                    Low Stock Alerts
                                </p>

                                <h2 className="text-4xl font-bold text-red-500 mt-3">
                                    {dashboardData.lowStockCount}
                                </h2>

                            </div>

                            <div className="bg-red-100 p-4 rounded-2xl">

                                <FaExclamationTriangle
                                    size={28}
                                    className="text-red-500"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Expiry Alerts */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border hover:bg-gray-700"
                        onClick={() =>
                            navigate("/medicines/expiry")
                        }>

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">
                                    Expiry Alerts
                                </p>

                                <h2 className="text-4xl font-bold text-orange-500 mt-3">
                                    {dashboardData.expiryAlertCount}
                                </h2>

                            </div>

                            <div className="bg-orange-100 p-4 rounded-2xl">

                                <FaCalendarTimes
                                    size={28}
                                    className="text-orange-500"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* Total Sales Card */}

                <div className="mt-8" >
                    {/* <div className="bg-white rounded-3xl p-6 shadow-sm border hover:bg-gray-700"> */}

                    {/* <div className="flex justify-between items-center"> */}



                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                        {/* Total Medicines Sold */}

                        <div className="bg-white rounded-3xl p-6 shadow-sm border hover:bg-gray-700 hover:scale-105 "
                            onClick={() => navigate("/sales-report")}>

                            <p className="text-black-500 ">
                                Total Medicines Sold
                            </p>

                            <h2 className="text-5xl font-bold text-green-600 mt-3">
                                {dashboardData.totalMedicinesSold}
                            </h2>

                            <p className="text-sm text-gray-400 mt-2">
                                Total quantity sold
                            </p>

                        </div>

                        {/* Revenue */}

                        <div className="bg-white rounded-3xl p-6 shadow-sm border hover:bg-gray-700 hover:scale-105"
                            onClick={() => navigate("/revenue-report")}
                        >

                            <p className="text-gray-500">
                                Total Revenue
                            </p>

                            <h2 className="text-5xl font-bold text-blue-600 mt-3">
                                ₹ {dashboardData.totalSalesRevenue}
                            </h2>

                            <p className="text-sm text-gray-400 mt-2">
                                Total earnings
                            </p>

                        </div>

                    </div>
                    {/* <p className="text-gray-500">
                                    Total Sales
                                </p>

                                <h2 className="text-5xl font-bold text-purple-600 mt-3">
                                    {/* ₹ {dashboardData.totalSales} */}
                    {/* {dashboardData.totalSales} */}

                    {/* </h2> */}



                    {/* </div> */}

                    {/* </div> */}

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">

                    {/* BAR CHART */}

                    <div className="bg-white p-6 rounded-3xl shadow-sm border">

                        <h2 className="text-2xl font-bold mb-6">
                            Inventory Analytics
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stockData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" />
                            </BarChart>
                        </ResponsiveContainer>

                    </div>

                    {/* PIE CHART */}

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-bold mb-4">
                            Stock vs Sales
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>

                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    outerRadius={100}
                                    label
                                >
                                    <Cell />
                                    <Cell />
                                </Pie>

                                <Tooltip />

                            </PieChart>
                        </ResponsiveContainer>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                    <Link
                        to="/medicines"
                        className="bg-blue-600 text-white p-5 rounded-xl hover:scale-105 transition"
                    >
                        Manage Medicines
                    </Link>

                    <Link
                        to="/alerts"
                        className="bg-red-500 text-white p-5 rounded-xl hover:scale-105 transition"
                    >
                        View Alerts
                    </Link>

                    <Link
                        to="/sales"
                        className="bg-green-600 text-white p-5 rounded-xl hover:scale-105 transition"
                    >
                        Manage Sales
                    </Link>

                    <Link
                        to="/ai-insights"
                        className="bg-purple-600 text-white p-5 rounded-xl hover:scale-105 transition"
                    >
                        AI Insights
                    </Link>

                </div>

            </div>
        </MainLayout>
    );
}

export default Dashboard;