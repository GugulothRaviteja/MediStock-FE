import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {

    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area

} from "recharts";

import {
    FaCapsules,
    FaBoxes,
    FaExclamationTriangle,
    FaCalendarTimes,
    FaRupeeSign
} from "react-icons/fa";

function Dashboard() {

    const [salesData, setSalesData] = useState([]);

    const [chatMessages, setChatMessages] = useState([
        {
            sender: "ai",
            text: "Hello 👋 I'm your AI Medical Assistant. Ask me anything about medicines, fever, cold, allergies, stock insights, etc."
        }
    ]);

    const [userMessage, setUserMessage] = useState("");

    const [timeFilter, setTimeFilter] = useState("monthly");

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

    // const stockData = [
    //     {
    //         name: "Total Medicines",
    //         value: dashboardData.totalMedicines,
    //         fill: "#23ca60",
    //     },
    //     {
    //         name: "Low Stock",
    //         value: dashboardData.lowStockCount,
    //         fill: "#e18035"
    //     },
    //     {
    //         name: "Expiry Alerts",
    //         value: dashboardData.expiryAlertCount,
    //         fill: "#facc15"

    //     },
    // ];

    // const pieData = [
    //     {
    //         name: "Available Stock",
    //         value: dashboardData.totalStockQuantity,
    //         fill: "#23ca60",

    //     },
    //     {
    //         name: "Sales",
    //         value: dashboardData.totalSales,
    //         fill: "#23a6ca",

    //     },
    // ];

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

    const fetchRevenueData = async () => {

        try {

            const response =
                await API.get("/sales");

            const grouped = {};

            response.data.forEach((sale) => {

                const date =
                    new Date(sale.soldAt);

                let key;

                if (timeFilter === "daily") {

                    key =
                        date.toLocaleDateString();

                }

                else if (
                    timeFilter === "monthly"
                ) {

                    key =
                        date.toLocaleString(
                            "default",
                            {
                                month: "short"
                            }
                        );

                }

                else {

                    key =
                        date.getFullYear();
                }

                grouped[key] =
                    (grouped[key] || 0)
                    +
                    sale.totalPrice;
            });

            const chartData =
                Object.entries(grouped).map(
                    ([period, revenue]) => ({
                        period,
                        revenue
                    })
                );

            setSalesData(chartData);

        } catch (error) {

            console.log(error);
        }
    };

    const sendMessage = () => {

        if (!userMessage.trim()) return;

        const userChat = {
            sender: "user",
            text: userMessage
        };

        let aiReply = "";

        const query =
            userMessage.toLowerCase();

        if (
            query.includes("fever")
        ) {

            aiReply =
                "For mild fever, Paracetamol is commonly used. if you'r suffering from high fever please use DOLO 650 and Please consult a doctor if symptoms persist.";

        }

        else if (
            query.includes("cold")
        ) {

            aiReply =
                "For cold symptoms, antihistamines and steam inhalation may help. And you may take Sytrigen if requered.";

        }

        else if (
            query.includes("headache")
        ) {

            aiReply =
                "For headache, use crocin for better relief from headach.";

        }

        else if (
            query.includes("stock")
        ) {

            aiReply =
                `Current stock available: ${dashboardData.totalStockQuantity} units.`;

        }

        else {

            aiReply =
                "I understand your question. Please consult a healthcare professional for medical advice.";
        }

        setChatMessages((prev) => [
            ...prev,
            userChat,
            {
                sender: "ai",
                text: aiReply
            }
        ]);

        setUserMessage("");
    };

    useEffect(() => {

        getDashboardSummary();
        fetchRevenueData();

    }, [timeFilter]);

    const navigate = useNavigate();

    return (

        <MainLayout>
            <div className="min-h-screen bg-[#F7F8FC] p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Total Medicines */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">

                        <div className="flex justify-between items-center">

                            <div onClick={() =>
                                navigate("/medicines")
                            }>

                                <p className="text-gray-600 mt-2">
                                    Total Medicines
                                </p>

                                <h2 className="text-xl font-bold text-gray-800">
                                    {dashboardData.totalMedicines}
                                </h2>

                            </div>

                            <div className="bg-gray-100 p-4 rounded-2xl">

                                <FaCapsules
                                    size={28}
                                    className="text-blue-600"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Total Stock */}

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50"
                        onClick={() =>
                            navigate("/medicines")
                        }>

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-600 mt-2">
                                    Total Stock
                                </p>

                                <h2 className="text-xl font-bold text-gray-800">
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

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50"

                        onClick={() =>
                            navigate("/medicines/low-stock")
                        }
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-600 mt-2">
                                    Low Stock Alerts
                                </p>

                                <h2 className="text-xl font-bold text-gray-800">
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

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50"
                        onClick={() =>
                            navigate("/medicines/expiry")
                        }>

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-600 mt-2">
                                    Expiry Alerts
                                </p>

                                <h2 className="text-xl font-bold text-gray-800">
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
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                        {/* Total Medicines Sold */}

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50"
                            onClick={() => navigate("/sales-report")}>

                            <p className="text-black-500 ">
                                Total Medicines Sold
                            </p>

                            <h2 className="text-xl font-bold text-gray-800">
                                {dashboardData.totalMedicinesSold}
                            </h2>

                            <p className="text-sm text-gray-400 mt-2">
                                Total quantity sold
                            </p>

                        </div>

                        {/* Revenue */}

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50"
                            onClick={() => navigate("/revenue-report")}
                        >

                            <p className="text-gray-500">
                                Total Revenue
                            </p>

                            <h2 className="text-xl font-bold text-gray-800">
                                ₹ {dashboardData.totalSalesRevenue}
                            </h2>

                            <p className="text-sm text-gray-400 mt-2">
                                Total earnings
                            </p>

                        </div>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-2xl font-bold">
                                Revenue Overview
                            </h2>

                            <select
                                value={timeFilter}
                                onChange={(e) =>
                                    setTimeFilter(e.target.value)
                                }
                                className="
                                px-4
                                py-2
                                rounded-full
                                bg-white
                                shadow-md"
                            >
                                <option value="daily">
                                    Daily
                                </option>
                                <option value="monthly">
                                    Monthly
                                </option>

                                <option value="yearly">
                                    Yearly
                                </option>
                            </select>

                        </div>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <AreaChart
                                data={salesData}
                            >

                                <XAxis
                                    dataKey="period"
                                />

                                <YAxis />

                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3B82F6"
                                    fill="#93C5FD"
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    </div>


                    <div className="bg-white rounded-3xl p-6 shadow-sm border flex flex-col h-[400px] border-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-200/50">


                        <div className="p-4 border-b">

                            <h2 className="text-xl font-bold">
                                AI Medical Assistant
                            </h2>

                        </div>

                        <div
                            className="
    flex-1
    overflow-y-auto
    p-4
    space-y-3
    "
                        >

                            {chatMessages.map(
                                (msg, index) => (

                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                            }`}
                                    >

                                        <div
                                            className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.sender === "user"
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200"
                                                }`}
                                        >

                                            {msg.text}

                                        </div>

                                    </div>
                                )
                            )}

                        </div>

                        <div
                            className="
    border-t
    p-3
    flex
    gap-2
    "
                        >

                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) =>
                                    setUserMessage(
                                        e.target.value
                                    )
                                }
                                placeholder="Ask me anything (e.g., I have a fever, what should I take?)..."
                                className="
      flex-1
      border
      rounded-xl
      px-4
      py-2
      "
                            />

                            <button
                                onClick={sendMessage}
                                className="
      bg-gray-800
      text-white
      px-5
      rounded-xl
      "
                            >
                                Send
                            </button>

                        </div>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                    <Link
                        to="/medicines"
                        className="bg-gradient-to-r from-stone-400 to-neutral-300 text-white p-5 rounded-xl hover:scale-105 transition"
                    >
                        Manage Medicines
                    </Link>

                    <Link
                        to="/alerts"
                        className="bg-gradient-to-r from-slate-500 to-slate-300 text-white p-5 rounded-xl hover:scale-105 transition"
                    >
                        View Alerts
                    </Link>

                    <Link
                        to="/sales"
                        className="bg-gradient-to-r from-slate-800 to-slate-500 text-white p-5 rounded-xl hover:scale-105 transition"
                    >
                        Manage Sales
                    </Link>

                    <Link
                        to="/ai-insights"
                        className="bg-gradient-to-r from-stone-500 to-neutral-300 text-white p-5 rounded-xl hover:scale-105 transition"
                    >
                        AI Insights
                    </Link>

                </div>

            </div>
        </MainLayout>
    );
}

export default Dashboard;