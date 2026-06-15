import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../api/axios";
import doctorImage from "../../assets/doctor-login.jpg";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        country: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        setMessage("");

        if (
            !formData.username ||
            !formData.email ||
            !formData.country ||
            !formData.mobileNumber ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            setMessage("All fields are required");

            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {

            setMessage("Enter valid email");

            return;
        }

        const mobileRegex = /^[0-9]{10}$/;

        if (!mobileRegex.test(formData.mobileNumber)) {

            setMessage(
                "Mobile number must be 10 digits"
            );

            return;
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setMessage(
                "Passwords do not match"
            );

            return;
        }

        try {

            const response = await API.post(
                "/auth/register",
                {
                    username:
                        formData.username,
                    email:
                        formData.email,
                    country:
                        formData.country,
                    mobileNumber:
                        formData.mobileNumber,
                    password:
                        formData.password,
                }
            );

            alert(response.data);

            alert(
                "Registration Submitted Successfully. Wait for Admin Approval."
            );

            navigate("/login");

        } catch (error) {

            setMessage(
                error.response?.data ||
                "Registration Failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">

            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

                {/* LEFT SECTION */}

                <div className="hidden md:block relative">

                    <img
                        src={doctorImage}
                        alt="Doctor"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-[#4582AC]/40 to-[#2C5E8A]/90"></div>

                    <div className="absolute bottom-10 left-10 text-white">

                        <h1 className="text-4xl font-bold mb-4">
                            MEDISTOCK
                        </h1>

                        <p>
                            Create your staff account
                        </p>

                    </div>

                </div>

                {/* RIGHT SECTION */}

                <div className="p-10">

                    <div className="max-w-md mx-auto">

                        <h2 className="text-4xl font-bold text-center text-gray-800">
                            Create Account
                        </h2>

                        <p className="text-center text-gray-500 mt-2 mb-8">
                            Register as Staff
                        </p>

                        <form
                            onSubmit={handleRegister}
                            className="space-y-4"
                        >

                            <input
                                type="text"
                                name="username"
                                placeholder="User Name"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full border rounded-full px-5 py-3"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-full px-5 py-3"
                            />

                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full border rounded-full px-5 py-3"
                            >
                                <option value="">
                                    Select Country
                                </option>

                                <option value="India">
                                    India
                                </option>

                                <option value="USA">
                                    USA
                                </option>

                                <option value="UK">
                                    UK
                                </option>

                                <option value="Canada">
                                    Canada
                                </option>
                            </select>

                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className="w-full border rounded-full px-5 py-3"
                            />

                            {/* PASSWORD */}

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border rounded-full px-5 py-3 pr-12"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >

                                    {
                                        showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }

                                </button>

                            </div>

                            {/* CONFIRM PASSWORD */}

                            <div className="relative">

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={handleChange}
                                    className="w-full border rounded-full px-5 py-3 pr-12"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >

                                    {
                                        showConfirmPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }

                                </button>

                            </div>

                            {
                                message && (

                                    <p className="text-red-500 text-sm text-center">

                                        {message}

                                    </p>
                                )
                            }

                            <button
                                type="submit"
                                className="w-full bg-[#4582AC] hover:bg-[#2C5E8A] text-white py-3 rounded-full font-semibold"
                            >
                                Register
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;