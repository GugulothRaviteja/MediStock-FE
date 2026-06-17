import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";

function SalesReport() {

    const [sales, setSales] = useState([]);

    const [filter, setFilter] = useState("daily");

    useEffect(() => {

        fetchSales();

    }, []);

    const fetchSales = async () => {

        try {

            const response = await API.get("/sales");

            setSales(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const groupedSales = sales.reduce((acc, sale) => {

        const date = new Date(sale.soldAt);

        let key;

        if (filter === "daily") {

            key = date.toLocaleDateString();

        } else if (filter === "monthly") {

            key = `${date.getMonth() + 1}-${date.getFullYear()}`;

        } else {

            key = date.getFullYear();
        }

        if (!acc[key]) {

            acc[key] = {
                totalQty: 0,
                medicines: []
            };
        }

        acc[key].totalQty += sale.quantitySold;

        if (
            !acc[key].medicines.includes(
                sale.medicineName
            )
        ) {
            acc[key].medicines.push(
                sale.medicineName
            );
        }

        return acc;

    }, {});
    // const groupedSales = sales.reduce((acc, sale) => {

    //     const date = new Date(sale.soldAt);

    //     let key;

    //     if (filter === "daily") {

    //         key = date.toLocaleDateString();

    //     }

    //     else if (filter === "monthly") {

    //         key =
    //             `${date.getMonth() + 1}-${date.getFullYear()}`;

    //     }

    //     else {

    //         key = date.getFullYear();

    //     }

    //     acc[key] =
    //         (acc[key] || 0)
    //         +
    //         sale.quantitySold;

    //     return acc;

    // }, {});


    return (

        <MainLayout>

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Sales Report
                </h1>

                <div className="flex gap-3 mb-6">

                    <button
                        onClick={() => setFilter("daily")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Daily
                    </button>

                    <button
                        onClick={() => setFilter("monthly")}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Monthly
                    </button>

                    <button
                        onClick={() => setFilter("yearly")}
                        className="bg-purple-600 text-white px-4 py-2 rounded"
                    >
                        Yearly
                    </button>

                </div>

                <table className="w-full bg-white">

                    <thead>

                        <tr>

                            <th className="p-3 border">
                                Date
                            </th>

                            <th className="p-3 border">
                                Total Medicines Sold
                            </th>

                            <th className="p-3 border">
                                Medicines Name
                            </th>

                        </tr>

                    </thead>
                    <tbody>

                        {
                            Object.entries(groupedSales)
                                .map(([date, data]) => (

                                    <tr key={date}>

                                        <td className="border p-3">
                                            {date}
                                        </td>

                                        <td className="border p-3">
                                            {data.totalQty}
                                        </td>

                                        <td className="border p-3">
                                            {data.medicines.join(", ")}
                                        </td>

                                    </tr>

                                ))
                        }

                    </tbody>

                    {/* <tbody>

                        {
                            Object.entries(groupedSales)
                                .map(([period, qty, madicineName]) => (

                                    <tr key={period}>

                                        <td className="border p-3">
                                            {period}
                                        </td>

                                        <td className="border p-3">
                                            {qty}
                                        </td>

                                        <td className="border p-3">
                                            {madicineName}
                                        </td>

                                    </tr>

                                ))
                        }

                    </tbody> */}

                </table>

            </div>

        </MainLayout>
    );
}

export default SalesReport;