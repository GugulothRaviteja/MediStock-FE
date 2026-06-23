import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Sales() {

    const navigate = useNavigate();

    const [medicines, setMedicines] = useState([]);

    const [weeklyReport, setWeeklyReport] = useState([]);

    const [salesHistory, setSalesHistory] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const salesPerPage = 5;


    const fetchSalesHistory = async () => {

        try {

            const response =
                await API.get("/sales/history");

            setSalesHistory(response.data);

        }
        catch (error) {

            console.log(error);
        }
    };

    const [saleData, setSaleData] = useState({
        medicineId: "",
        quantitySold: "",
        customerName: "",
        phoneNumber: "",
    });

    // FETCH MEDICINES

    const fetchMedicines = async () => {

        try {

            const response = await API.get(
                "/medicines"
            );

            setMedicines(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // FETCH WEEKLY REPORT

    const fetchWeeklyReport = async () => {

        try {

            const response = await API.get(
                "/sales/weekly-report"
            );

            setWeeklyReport(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // HANDLE INPUT CHANGE

    const handleChange = (e) => {

        setSaleData({
            ...saleData,
            [e.target.name]: e.target.value,
        });
    };

    // SELL MEDICINE

    const sellMedicine = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                `/sales/sell/${saleData.medicineId}`,
                {
                    quantitySold: Number(
                        saleData.quantitySold
                    ),
                    customerName:
                        saleData.customerName,
                    phoneNumber:
                        saleData.phoneNumber
                }
            );

            toast.success("Medicine Sold Successfully");

            fetchMedicines();

            fetchWeeklyReport();

            fetchSalesHistory();

            setCurrentPage(1);

            setSaleData({
                medicineId: "",
                quantitySold: "",
                customerName: "",
                phoneNumber: ""
            });
            fetchSalesHistory

        } catch (error) {

            console.log(error);

            alert("Sale Failed");
        }
    };

    useEffect(() => {

        fetchMedicines();

        fetchWeeklyReport();

        fetchSalesHistory();


    }, []);

    const indexOfLastSale =
        currentPage * salesPerPage;

    const indexOfFirstSale =
        indexOfLastSale - salesPerPage;

    const currentSales =
        salesHistory.slice(
            indexOfFirstSale,
            indexOfLastSale
        );

    const totalPages = Math.ceil(
        salesHistory.length /
        salesPerPage
    );


    const handlePrevious = () => {

        if (currentPage > 1) {

            setCurrentPage(
                currentPage - 1
            );
        }
    };

    const handleNext = () => {

        if (currentPage < totalPages) {

            setCurrentPage(
                currentPage + 1
            );
        }
    };

    return (

        <MainLayout>
            <div className="min-h-screen bg-gray-100 p-6">

                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Sales Management
                </h1>

                {/* MEDICINES STOCK TABLE */}

                {/* <div className="bg-white p-6 rounded-xl shadow mb-10 overflow-x-auto">

                    <h2 className="text-2xl font-semibold mb-4">
                        Current Stock
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-blue-600 text-white">

                                <th className="p-3 text-left">
                                    Medicine
                                </th>

                                <th className="p-3 text-left">
                                    Quantity
                                </th>

                                <th className="p-3 text-left">
                                    Price
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                medicines.map((medicine) => (

                                    <tr
                                        key={medicine.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {medicine.medicineName}
                                        </td>

                                        <td className="p-3">
                                            {medicine.quantity}
                                        </td>

                                        <td className="p-3">
                                            ₹ {medicine.price}
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div> */}
                <h2 className="text-2xl font-semibold mb-4">
                    Sales History
                </h2>
                <div className="bg-gradient-to-r from-gray-300 to-gray-100 rounded-xl shadow overflow-auto ">


                    <table className=" w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-600 text-white">

                                <th className="p-3 text-left">
                                    ID
                                </th>

                                <th className="p-3 text-left">
                                    Medicine Name
                                </th>

                                <th className="p-3 text-left">
                                    Quantity of Medicine
                                </th>

                                <th className="p-3 text-left">
                                    Customer Name
                                </th>

                                <th className="p-3 text-left">
                                    Phone Number
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                currentSales.map((sale) => (

                                    <tr
                                        key={sale.transactionId}
                                        className="bg-gray-100 hover:bg-gray-200"
                                    >

                                        <td className="p-3">
                                            {sale.transactionId}
                                        </td>

                                        <td className="p-3">
                                            {sale.medicineName}
                                        </td>

                                        <td className="p-3">
                                            {sale.quantitySold}
                                        </td>

                                        <td className="p-3">
                                            {sale.customerName}
                                        </td>

                                        <td className="p-3">
                                            {sale.phoneNumber}
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                    <div
                        className="
    flex
    justify-between
    items-center
    mt-6
    "
                    >

                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="
        bg-gray-500
        hover:bg-gray-700
        text-white
        px-4
        py-2
        rounded-lg
        disabled:opacity-50
        "
                        >
                            ← Previous
                        </button>

                        <span className="font-semibold">

                            Page {currentPage}
                            {" "}
                            of
                            {" "}
                            {totalPages}

                        </span>

                        <button
                            onClick={handleNext}
                            disabled={
                                currentPage === totalPages
                            }
                            className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-4
        py-2
        rounded-lg
        disabled:opacity-50
        "
                        >
                            Next →
                        </button>

                    </div>

                </div>

                {/* SALES REPORT */}

                <div className="flex justify-left mt-6">

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

export default Sales;