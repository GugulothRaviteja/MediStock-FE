import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
    FaEdit,
    FaTrashAlt,
    FaSearch,
    FaCapsules,
    FaBoxes
} from "react-icons/fa";

function Medicines() {

    const [medicines, setMedicines] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [errors, setErrors] = useState({});

    const medicinesPerPage = 10;

    const [editId, setEditId] = useState(null);

    const [debouncedSearch, setDebouncedSearch] = useState("");

    const navigate = useNavigate();

    const location = useLocation();

    const role = localStorage.getItem("role");

    const showLowStock = location.pathname === "/medicines/low-stock";

    const showExpiry = location.pathname === "/medicines/expiry";

    const [sellErrors, setSellErrors] = useState({});

    const [sellData, setSellData] = useState({
        medicineId: "",
        quantitySold: "",
        customerName: "",
        phoneNumber: ""
    });

    const [formData, setFormData] = useState({
        medicineName: "",
        quantity: "",
        price: "",
        expiryDate: "",
        manufacturer: "",
    });

    const [showSellForm, setShowSellForm] = useState(false);

    // FETCH ALL MEDICINES

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

    // HANDLE INPUT CHANGE

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateMedicineForm = () => {

        let newErrors = {};

        if (!formData.medicineName.trim()) {
            newErrors.medicineName =
                "Medicine Name is required";
        } else if (
            !/^[A-Za-z ]+$/.test(formData.medicineName)
        ) {
            newErrors.medicineName = "Medicine name must contain alphabets..";
        }

        if (!formData.quantity) {
            newErrors.quantity =
                "Quantity is required";
        } else if (Number(formData.quantity) <= 0) {
            newErrors.quantity =
                "Quantity must be greater than 0";
        }

        if (!formData.price) {
            newErrors.price =
                "Price is required";
        } else if (Number(formData.price) <= 0) {
            newErrors.price =
                "Price must be greater than 0";
        }

        if (!formData.expiryDate) {
            newErrors.expiryDate =
                "Expiry Date is required";
        }

        if (!formData.manufacturer.trim()) {
            newErrors.manufacturer =
                "Manufacturer is required";
        } else if (
            !/^[A-Za-z ]+$/.test(formData.manufacturer)
        ) {
            newErrors.manufacturer = "manufacturer must contain alphabets..";
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // ADD MEDICINE
    const addMedicine = async (e) => {

        e.preventDefault();

        let newErrors = {};

        // Medicine Name Validation
        if (!formData.medicineName.trim()) {
            newErrors.medicineName =
                "Medicine Name is required";
        }

        // Quantity Validation
        if (!formData.quantity) {
            newErrors.quantity =
                "Quantity is required";
        } else if (Number(formData.quantity) <= 0) {
            newErrors.quantity =
                "Quantity must be greater than 0";
        }

        // Price Validation
        if (!formData.price) {
            newErrors.price =
                "Price is required";
        } else if (Number(formData.price) <= 0) {
            newErrors.price =
                "Price must be greater than 0";
        }

        // Expiry Date Validation
        if (!formData.expiryDate) {
            newErrors.expiryDate =
                "Expiry Date is required";
        } else {

            const selectedDate =
                new Date(formData.expiryDate);

            const today = new Date();

            today.setHours(0, 0, 0, 0);

            if (selectedDate <= today) {
                newErrors.expiryDate =
                    "Expiry Date must be a future date";
            }
        }

        // Manufacturer Validation
        if (!formData.manufacturer.trim()) {
            newErrors.manufacturer =
                "Manufacturer is required";
        }

        // Stop submission if validation fails
        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors);

            return;
        }

        // Clear old errors
        setErrors({});

        try {

            await API.post(
                "/medicines",
                {
                    ...formData,
                    quantity: Number(formData.quantity),
                    price: Number(formData.price),
                }
            );

            toast.success(
                "Medicine added successfully"
            );

            fetchMedicines();

            setShowForm(false);

            setFormData({
                medicineName: "",
                quantity: "",
                price: "",
                expiryDate: "",
                manufacturer: "",
            });

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to add medicine"
            );
        }
    };

    const editMedicine = (medicine) => {

        setShowForm(true);

        setEditId(medicine.id);

        setFormData({
            medicineName: medicine.medicineName,
            quantity: medicine.quantity,
            price: medicine.price,
            expiryDate: medicine.expiryDate,
            manufacturer: medicine.manufacturer,
        });
    };


    // UPDATE MEDICINE

    const updateMedicine = async (e) => {

        e.preventDefault();

        try {
            if (!formData.medicineName.trim()) {
                toast.error("Medicine Name is required");
                return;
            }

            if (
                !/^[A-Za-z ]+$/.test(formData.medicineName)
            ) {
                toast.error(
                    "Medicine Name must contain only alphabets.."
                );
                return;
            }

            if (Number(formData.quantity) <= 0) {
                toast.error("Quantity must be greater than 0");
                return;
            }

            if (Number(formData.price) <= 0) {
                toast.error("Price must be greater than 0");
                return;
            }

            if (!formData.manufacturer.trim()) {
                toast.error("Manufacturer is required");
                return;
            }

            if (
                !/^[A-Za-z ]+$/.test(formData.manufacturer)
            ) {
                toast.error(
                    "Manufacturer must contain only alphabets"
                );
                return;
            }

            await API.put(
                `/medicines/${editId}`,
                {
                    ...formData,
                    quantity: Number(formData.quantity),
                    price: Number(formData.price),
                }
            );

            toast.success("Medicines Updated successfully");
            fetchMedicines();
            setShowForm(false);

            setEditId(null);

            setFormData({
                medicineName: "",
                quantity: "",
                price: "",
                expiryDate: "",
                manufacturer: "",
            });

        } catch (error) {

            console.log(error);
        }
    };

    const handleSellChange = (e) => {

        const { name, value } = e.target;

        setSellData({
            ...sellData,
            [name]: value,
        });

        setSellErrors({
            ...sellErrors,
            [name]: "",
        });
    };

    const validateSellForm = () => {

        let newErrors = {};

        if (!sellData.medicineId) {
            newErrors.medicineId =
                "Please select medicine";
        }

        if (!sellData.quantitySold) {
            newErrors.quantitySold =
                "Quantity is required";
        } else if (Number(sellData.quantitySold) <= 0) {
            newErrors.quantitySold =
                "Quantity must be greater than 0";
        }

        if (!sellData.customerName.trim()) {
            newErrors.customerName =
                "Customer Name is required";
        }

        if (!sellData.phoneNumber.trim()) {

            newErrors.phoneNumber =
                "Phone Number is required";

        } else if (
            !/^[6-9]\d{9}$/.test(
                sellData.phoneNumber
            )
        ) {

            newErrors.phoneNumber =
                "Phone number must start with 6,7,8,9 and contain exactly 10 digits";

        }

        setSellErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const sellMedicine = async (e) => {

        e.preventDefault();

        if (!validateSellForm()) {
            return;
        }

        try {

            await API.post(
                `/sales/sell/${sellData.medicineId}`,
                {
                    quantitySold: Number(
                        sellData.quantitySold
                    ),
                    customerName:
                        sellData.customerName,
                    phoneNumber:
                        sellData.phoneNumber,
                }
            );

            toast.success(
                "Medicine Sold Successfully"
            );

            fetchMedicines();

            setSellData({
                medicineId: "",
                quantitySold: "",
                customerName: "",
                phoneNumber: "",
            });

            setSellErrors({});

        } catch (error) {

            console.log(error);

            toast.error("Sale Failed");
        }
    };

    const deleteMedicine = async (id) => {

        try {

            await API.delete(
                `/medicines/${id}`
            );

            toast.success("Medicines Deleted successfully");

            fetchMedicines();

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchMedicines();

    }, []);

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(searchTerm);

        }, 500);

        return () => clearTimeout(timer);

    }, [searchTerm]);

    const filteredMedicines = medicines
        .filter((medicine) => {

            if (showLowStock) {
                return medicine.quantity <= 10;
            }

            if (showExpiry) {

                const today = new Date();
                const expiry = new Date(medicine.expiryDate);

                const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
                return diffDays >= 0 && diffDays <= 30;
            }

            return true;
        })
        .filter((medicine) => {

            const search =
                debouncedSearch.toLowerCase();

            return (
                medicine.medicineName
                    ?.toLowerCase()
                    .includes(search)

                ||

                medicine.manufacturer
                    ?.toLowerCase()
                    .includes(search)
            );
        });

    const indexOfLastMedicine =
        currentPage * medicinesPerPage;

    const indexOfFirstMedicine =
        indexOfLastMedicine - medicinesPerPage;

    const currentMedicines =
        filteredMedicines.slice(
            indexOfFirstMedicine,
            indexOfLastMedicine
        );

    const totalPages = Math.ceil(
        filteredMedicines.length /
        medicinesPerPage
    );

    const resetForm = () => {

        setFormData({
            medicineName: "",
            quantity: "",
            price: "",
            expiryDate: "",
            manufacturer: "",
        });

        setEditId(null);

        setShowForm(false);
    };


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


                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Medicines Management
                    </h1>

                    {
                        role === "ADMIN" && (
                            <button
                                onClick={() => {

                                    setEditId(null);

                                    setFormData({
                                        medicineName: "",
                                        quantity: "",
                                        price: "",
                                        expiryDate: "",
                                        manufacturer: "",
                                    });

                                    setShowForm(true);
                                }}
                                className="
        bg-green-700
        hover:bg-green-900
        text-white
        px-6
        py-3
        rounded-xl
        font-medium
        "
                            >
                                + Add Medicine
                            </button>
                        )
                    }

                </div>

                {
                    showForm && (

                        <div className="bg-white p-6 rounded-3xl shadow-sm border mb-8">

                            <div className="flex justify-between items-center mb-4">

                                <h2 className="text-2xl font-semibold">

                                    {
                                        editId
                                            ? "Update Medicine"
                                            : "Add Medicine"
                                    }

                                </h2>

                                <button
                                    onClick={resetForm}
                                    className="
                    text-red-500
                    font-medium
                    "
                                >
                                    Close
                                </button>

                            </div>

                            <form
                                onSubmit={
                                    editId
                                        ? updateMedicine
                                        : addMedicine
                                }
                                className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
                "
                            >

                                <div>
                                    <label className="font-medium block mb-1">
                                        Medicine Name
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="medicineName"
                                        placeholder="Enter Medicine Name"
                                        value={formData.medicineName}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(
                                                /[^A-Za-z ]/g,
                                                ""
                                            );

                                            setFormData({
                                                ...formData,
                                                medicineName: value,
                                            });
                                        }}
                                        className={`w-full border p-3 rounded-lg ${errors.medicineName
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />

                                    {errors.medicineName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.medicineName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="font-medium block mb-1">
                                        Quantity
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Enter Quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className={`w-full border p-3 rounded-lg ${errors.quantity
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />

                                    {errors.quantity && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="font-medium block mb-1">
                                        Price
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Enter Price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className={`w-full border p-3 rounded-lg ${errors.price
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />

                                    {errors.price && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="font-medium block mb-1">
                                        Expiry Date
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="date"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        className={`w-full border p-3 rounded-lg ${errors.expiryDate
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />

                                    {errors.expiryDate && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.expiryDate}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="font-medium block mb-1">
                                        Manufacturer
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="manufacturer"
                                        placeholder="Enter Manufacturer"
                                        value={formData.manufacturer}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(
                                                /[^A-Za-z ]/g,
                                                ""
                                            );

                                            setFormData({
                                                ...formData,
                                                manufacturer: value,
                                            });
                                        }}
                                        className={`w-full border p-3 rounded-lg ${errors.manufacturer
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />

                                    {errors.manufacturer && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.manufacturer}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2 lg:col-span-3 flex gap-3 mt-4">


                                    <button
                                        type="submit"
                                        className={`
                                        text-white
                                        px-6
                                        py-3
                                        rounded-lg
                                        ${editId
                                                ? "bg-yellow-500 hover:bg-yellow-600"
                                                : "bg-blue-600 hover:bg-blue-700"
                                            }
                                        `}
                                    >
                                        {editId ? "Update" : "Add"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="
                                        bg-gray-500
                                        hover:bg-gray-600
                                        text-white
                                        px-6
                                        py-3
                                        rounded-lg
                                        "
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>

                        </div>
                    )
                }


                <div className="flex flex-col md:flex-row gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search Medicine..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="
        border
        p-3
        rounded-full
        flex-1
        "
                    />

                    <button
                        onClick={() =>
                            setShowSellForm(true)
                        }
                        className="
        bg-green-600
        hover:bg-green-700
        text-white
        px-6
        py-3
        rounded-3xl
        "
                    >
                        Sell Medicine
                    </button>

                </div>

                {
                    showSellForm && (

                        <div
                            className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
            "
                        >

                            <div
                                className="
                bg-white
                rounded-3xl
                p-8
                w-full
                max-w-2xl
                "
                            >

                                <div className="flex justify-between items-center mb-6">

                                    <h2 className="text-2xl font-bold">
                                        Sell Medicine
                                    </h2>

                                    <button
                                        onClick={() =>
                                            setShowSellForm(false)
                                        }
                                        className="
                        text-red-500
                        font-bold
                        "
                                    >
                                        ✕
                                    </button>

                                </div>

                                <form
                                    onSubmit={sellMedicine}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >

                                    {/* MEDICINE */}

                                    <div>

                                        <label className="font-medium">
                                            Medicine
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>

                                        <select
                                            name="medicineId"
                                            value={sellData.medicineId}
                                            onChange={handleSellChange}
                                            className={`w-full border p-3 rounded-lg mt-1 ${sellErrors.medicineId
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                }`}
                                        >

                                            <option value="">
                                                Select Medicine
                                            </option>

                                            {
                                                medicines.map((medicine) => (

                                                    <option
                                                        key={medicine.id}
                                                        value={medicine.id}
                                                    >
                                                        {medicine.medicineName}
                                                    </option>

                                                ))
                                            }

                                        </select>

                                        {
                                            sellErrors.medicineId && (

                                                <p className="text-red-500 text-sm mt-1">
                                                    {sellErrors.medicineId}
                                                </p>

                                            )
                                        }

                                    </div>

                                    {/* QUANTITY */}

                                    <div>

                                        <label className="font-medium">
                                            Quantity
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>

                                        <input
                                            type="number"
                                            name="quantitySold"
                                            value={sellData.quantitySold}
                                            onChange={handleSellChange}
                                            placeholder="Enter Quantity"
                                            min="1"
                                            className={`w-full border p-3 rounded-lg mt-1 ${sellErrors.quantitySold
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                }`}
                                        />

                                        {
                                            sellErrors.quantitySold && (

                                                <p className="text-red-500 text-sm mt-1">
                                                    {sellErrors.quantitySold}
                                                </p>

                                            )
                                        }

                                    </div>

                                    {/* CUSTOMER NAME */}

                                    <div>

                                        <label className="font-medium">
                                            Customer Name
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>

                                        <input
                                            type="text"
                                            name="customerName"
                                            value={sellData.customerName}
                                            onChange={handleSellChange}
                                            placeholder="Enter Customer Name"
                                            className={`w-full border p-3 rounded-lg mt-1 ${sellErrors.customerName
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                }`}
                                        />

                                        {
                                            sellErrors.customerName && (

                                                <p className="text-red-500 text-sm mt-1">
                                                    {sellErrors.customerName}
                                                </p>

                                            )
                                        }

                                    </div>

                                    {/* PHONE NUMBER */}

                                    <div>

                                        <label className="font-medium">
                                            Phone Number
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>

                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={sellData.phoneNumber}
                                            onChange={handleSellChange}
                                            placeholder="Enter 10 Digit Phone Number"
                                            maxLength={10}
                                            className={`w-full border p-3 rounded-lg mt-1 ${sellErrors.phoneNumber
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                }`}
                                        />

                                        {
                                            sellErrors.phoneNumber && (

                                                <p className="text-red-500 text-sm mt-1">
                                                    {sellErrors.phoneNumber}
                                                </p>

                                            )
                                        }

                                    </div>

                                    {/* SUBMIT BUTTON */}

                                    <div className="md:col-span-2 flex justify-end mt-4">

                                        <button
                                            type="submit"
                                            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-8
            py-3
            rounded-lg
            font-medium
            transition
            "
                                        >
                                            Sell Medicine
                                        </button>

                                    </div>

                                </form>


                            </div>

                        </div>

                    )
                }

                {/* MEDICINES TABLE */}

                <div className="bg-white p-6 rounded-3xl shadow-sm border overflow-x-auto">


                    <h2 className="text-2xl font-semibold mb-4">
                        Medicines List
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-200 text-gray-700">

                                <th className="p-3 text-left">
                                    Medicine
                                </th>

                                <th className="p-3 text-left">
                                    Quantity
                                </th>

                                <th className="p-3 text-left">
                                    Price
                                </th>

                                <th className="p-3 text-left">
                                    Expiry Date
                                </th>

                                <th className="p-3 text-left">
                                    Manufacturer
                                </th>

                                <th className="p-3 text-left">
                                    Status
                                </th>

                                {
                                    role === "ADMIN" && (
                                        <th className="p-3 text-left">
                                            Actions
                                        </th>
                                    )
                                }

                            </tr>

                        </thead>

                        <tbody>

                            {
                                currentMedicines.map((medicine) => (

                                    <tr
                                        key={medicine.id}
                                        className="border-b hover:bg-gray-50"
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

                                        <td className="p-3">
                                            {medicine.expiryDate}
                                        </td>

                                        <td className="p-3">
                                            {medicine.manufacturer}
                                        </td>

                                        <td className="p-3">

                                            {
                                                medicine.quantity === 0 ? (

                                                    <span className="
      bg-red-100
      text-red-600
      px-3
      py-1
      rounded-full
      text-sm
      ">
                                                        Out Of Stock
                                                    </span>

                                                ) : medicine.quantity <= 10 ? (

                                                    <span className="
      bg-yellow-100
      text-yellow-600
      px-3
      py-1
      rounded-full
      text-sm
      ">
                                                        Low Stock
                                                    </span>

                                                ) : (

                                                    <span className="
      bg-green-100
      text-green-600
      px-3
      py-1
      rounded-full
      text-sm
      ">
                                                        In Stock
                                                    </span>

                                                )
                                            }

                                        </td>

                                        <td className="p-3 flex gap-2">
                                            {
                                                role === "ADMIN" && (
                                                    <button
                                                        onClick={() =>
                                                            editMedicine(medicine)
                                                        }
                                                        className="
  text-yellow-500
  hover:text-yellow-700
  text-lg
  "
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                )
                                            }

                                            {
                                                role === "ADMIN" && (


                                                    <button
                                                        onClick={() =>
                                                            deleteMedicine(medicine.id)
                                                        }
                                                        className="
  text-red-500
  hover:text-red-700
  text-lg
  "
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                )
                                            }

                                        </td>

                                    </tr>
                                )
                                )

                            }

                        </tbody>

                    </table>

                    <div className="
flex
justify-between
items-center
mt-6
">

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

                            Page {currentPage} of {totalPages}

                        </span>

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="
        bg-gray-600
        hover:bg-gray-900
        text-white
        px-4
        py-2
        rounded-lg
        disabled:opacity-50
        "
                        >
                            Next
                        </button>

                    </div>

                </div>

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

export default Medicines;