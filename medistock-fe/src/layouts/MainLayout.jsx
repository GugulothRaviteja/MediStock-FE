import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
    FaBars,
    FaTimes,
    FaHome,
    FaCapsules,
    FaBell,
    FaShoppingCart,
    FaRobot,
    FaSignOutAlt,
    FaUsers,
    FaUserShield
} from "react-icons/fa";

import { MdAdminPanelSettings } from "react-icons/md";

import { toast } from "react-toastify";

function MainLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const location = useLocation();

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const username = localStorage.getItem("username");

    const handleLogout = () => {

        localStorage.removeItem("token");

        toast.success("Logged Out Successfully");

        navigate("/");
    };

    const menuItems = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaHome />
        },



        // ...(role === "ADMIN"
        //     ? [
                {
                path: "/medicines",
                name: "Medicines",
                icon: <FaCapsules />
            },
        // ]
        //     : []),

        ...(role === "ADMIN"
            ? [{
                path: "/users",
                name: "Users",
                icon: <FaUsers />
            }]
            : []),

        {
            path: "/alerts",
            name: "Alerts",
            icon: <FaBell />
        },

        {
            path: "/sales",
            name: "Sales",
            icon: <FaShoppingCart />
        },

        {
            path: "/ai-insights",
            name: "AI Insights",
            icon: <FaRobot />
        }
    ];

    // const menuItems = [
    //     {
    //         path: "/dashboard",
    //         name: "Dashboard",
    //         icon: <FaHome />
    //     },
    //     {
    //         path: "/medicines",
    //         name: "Medicines",
    //         icon: <FaCapsules />
    //     },
    //     {
    //         path: "/alerts",
    //         name: "Alerts",
    //         icon: <FaBell />
    //     },
    //     {
    //         path: "/sales",
    //         name: "Sales",
    //         icon: <FaShoppingCart />
    //     },
    //     {
    //         path: "/ai-insights",
    //         name: "AI Insights",
    //         icon: <FaRobot />
    //     }
    // ];

    return (

        <div className="min-h-screen bg-gray-100 flex">

            {/* MOBILE MENU BUTTON */}

            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-gray-600 text-white p-3 rounded-lg"
                onClick={() => setSidebarOpen(true)}
            >
                <FaBars />
            </button>

            {/* SIDEBAR */}

            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-6 z-40 flex flex-col transform transition-transform duration-300
        ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }`}
            >

                {/* CLOSE BUTTON MOBILE */}

                <div className="flex justify-between items-center mb-8 md:hidden">

                    <h1 className="text-2xl font-bold">
                        MediStock
                    </h1>

                    <button
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FaTimes />
                    </button>

                </div>

                <div className="mb-10">

                    <h1 className="text-4xl font-extrabold">
                        MediStock
                    </h1>

                    <p className="text-white-100 text-sm mt-1">
                        Pharmacy Management
                    </p>

                </div>
                {/* <h1 className="text-3xl font-bold mb-10 hidden md:block">
                    MediStock
                </h1> */}
                <div className="pb-3 ">
                    <div className="mt-10 bg-white/10 rounded-2xl p-2">

                        <div className="flex items-center gap-1 ">

                            <div
                                className="
                            
                            w-14
                            h-14
                            rounded-full
                            bg-white
                            flex
                            items-center
                            justify-center
                            "
                            >

                                <FaUserShield
                                    size={26}
                                    className="text-blue-700"
                                />

                            </div>

                            <div >

                                <p className="font-bold text-white">
                                    {username}
                                </p>

                                <div className="flex items-center gap-1">

                                    <MdAdminPanelSettings
                                        className="text-yellow-300"
                                    />

                                    <span className="text-white-100 text-sm">
                                        {role}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <nav className="space-y-3">

                        {
                            menuItems.map((item) => (

                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300
                ${location.pathname === item.path
                                            ? "bg-[#bbbf63] text-white-700 shadow-lg"
                                            : "hover:bg-[#bbbf63]"
                                        }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {item.icon}

                                    {item.name}

                                </Link>
                            ))
                        }

                    </nav>

                </div>

                {/* LOGOUT */}

                <button
                    onClick={handleLogout}
                    className="
                    mt-8
                    flex
                    items-center
                    justify-center
                    gap-2
                    hover:bg-[#bbbf63]
                    w-full
                    p-4
                    rounded-2xl
                    transition-all
                    "
                // className="mt-10 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 w-full p-3 rounded-lg"
                >
                    <FaSignOutAlt />

                    Logout
                </button>

            </div>

            {/* PAGE CONTENT */}

            <div
                className="flex-1 md:ml-64 bg-[#F7F8FC] p-0 overflow-y-auto h-screen"
            >

                <Header
                    username={username}
                    role={role}
                    lowStockCount={
                        Number(
                            localStorage.getItem("lowStockCount")
                        ) || 0
                    }
                    expiryAlertCount={
                        Number(
                            localStorage.getItem("expiryAlertCount")
                        ) || 0
                    }
                />

                <main
                    className="
    flex-1
    overflow-y-auto
    bg-[#F7F8FC]
    p-6
    "
                >

                    {children}

                </main>

                <Footer />

            </div>

        </div>
    );
}

export default MainLayout;