import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";

function RevenueReport() {

    const [sales, setSales] = useState([]);

    const [filter, setFilter] = useState("daily");

    const [selectedDate, setSelectedDate] = useState("");

    const [selectedMonth, setSelectedMonth] = useState(
        new Date().getMonth() + 1
    );

    const [selectedYear, setSelectedYear] = useState(
        new Date().getFullYear()
    );

    useEffect(() => {

        fetchSales();

    }, []);

    const fetchSales = async () => {

        const response =
            await API.get("/sales");

        setSales(response.data);

    };

    const groupedRevenue =
        sales.reduce((acc, sale) => {

            const date =
                new Date(sale.soldAt);

            let key;

            if (filter === "daily") {

                key =
                    date.toLocaleDateString();

            }

            else if (filter === "monthly") {

                key =
                    `${date.getMonth() + 1}-${date.getFullYear()}`;

            }

            else {

                key =
                    date.getFullYear();

            }

            acc[key] =
                (acc[key] || 0)
                +
                sale.totalPrice;

            return acc;

        }, {});

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const filteredSales = sales.filter(
        (sale) => {

            const saleDate =
                new Date(sale.soldAt);

            if (
                filter === "daily" &&
                selectedDate
            ) {

                return (
                    saleDate
                        .toISOString()
                        .split("T")[0]
                    === selectedDate
                );
            }

            if (
                filter === "monthly"
            ) {

                return (
                    saleDate.getMonth() + 1
                    === selectedMonth
                    &&
                    saleDate.getFullYear()
                    === selectedYear
                );
            }

            if (
                filter === "yearly"
            ) {

                return (
                    saleDate.getFullYear()
                    === selectedYear
                );
            }

            return true;
        }
    );

    return (

        <MainLayout>

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Revenue Report
                </h1>

                <div className="flex flex-wrap gap-3 mb-6">

                    <button
                        onClick={() => setFilter("daily")}
                        className="bg-blue-500 text-white px-4 py-2 rounded-3xl"
                    >
                        Daily
                    </button>

                    <button
                        onClick={() => setFilter("monthly")}
                        className="bg-green-600 text-white px-4 py-2 rounded-3xl"
                    >
                        Monthly
                    </button>

                    <button
                        onClick={() => setFilter("yearly")}
                        className="bg-purple-600 text-white px-4 py-2 rounded-3xl"
                    >
                        Yearly
                    </button>

                    {/* DAILY */}

                    {filter === "daily" && (

                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) =>
                                setSelectedDate(e.target.value)
                            }
                            className="
                border
                rounded-3xl
                px-3
                py-2
            "
                        />
                    )}

                    {/* MONTHLY */}

                    {filter === "monthly" && (

                        <>
                            <select
                                value={selectedMonth}
                                onChange={(e) =>
                                    setSelectedMonth(
                                        Number(e.target.value)
                                    )
                                }
                                className="
                    border
                    rounded-3xl
                    px-3
                    py-2
                "
                            >

                                {
                                    months.map(
                                        (month, index) => (

                                            <option
                                                key={index}
                                                value={index + 1}
                                            >
                                                {month}
                                            </option>
                                        )
                                    )
                                }

                            </select>

                            <select
                                value={selectedYear}
                                onChange={(e) =>
                                    setSelectedYear(
                                        Number(e.target.value)
                                    )
                                }
                                className="
                    border
                    rounded-3xl
                    px-3
                    py-2
                "
                            >
                                <option value="2024">
                                    2024
                                </option>

                                <option value="2025">
                                    2025
                                </option>

                                <option value="2026">
                                    2026
                                </option>

                                <option value="2027">
                                    2027
                                </option>

                            </select>
                        </>
                    )}

                    {/* YEARLY */}

                    {filter === "yearly" && (

                        <select
                            value={selectedYear}
                            onChange={(e) =>
                                setSelectedYear(
                                    Number(e.target.value)
                                )
                            }
                            className="
                border
                rounded-3xl
                px-3
                py-2
            "
                        >
                            <option value="2024">
                                2024
                            </option>

                            <option value="2025">
                                2025
                            </option>

                            <option value="2026">
                                2026
                            </option>

                            <option value="2027">
                                2027
                            </option>

                        </select>
                    )}

                </div>

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-gray-200 text-gray-700">

                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Medicine</th>
                            <th className="p-3 text-left">Quantity Sold</th>
                            <th className="p-3 text-left">Revenue</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredSales.map((sale) => (

                                <tr key={sale.id}
                                    className="bg-gray-100 hover:bg-gray-200"

                                >

                                    <td className=" p-3">

                                        {
                                            new Date(
                                                sale.soldAt
                                            ).toLocaleDateString()
                                        }

                                    </td>

                                    <td className=" p-3">
                                        {sale.medicineName}
                                    </td>

                                    <td className=" p-3">
                                        {sale.quantitySold}
                                    </td>

                                    <td className=" p-3">
                                        ₹ {sale.totalPrice}
                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </MainLayout>
    );
}

export default RevenueReport;