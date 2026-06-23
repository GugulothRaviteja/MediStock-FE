import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../api/axios";
import doctorImage from "../../assets/doctor-login.jpg";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

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

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        let newErrors = { ...errors };

        switch (name) {

            case "username":

                if (!value.trim()) {

                    newErrors.username =
                        "User Name is required";

                } else {

                    delete newErrors.username;
                }

                break;

            case "email":

                if (!value.trim()) {

                    newErrors.email =
                        "Email is required";

                }
                else if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ) {

                    newErrors.email =
                        "Enter valid email";

                }
                else {

                    delete newErrors.email;
                }

                break;

            case "country":

                if (!value) {

                    newErrors.country =
                        "Country is required";

                } else {

                    delete newErrors.country;
                }

                break;

            case "mobileNumber":

                if (!value.trim()) {

                    newErrors.mobileNumber =
                        "Mobile Number is required";

                }
                else if (
                    !/^[0-9]{10}$/.test(value)
                ) {

                    newErrors.mobileNumber =
                        "Mobile number must be 10 digits";

                }
                else {

                    delete newErrors.mobileNumber;
                }

                break;

            case "password":

                if (!value.trim()) {

                    newErrors.password =
                        "Password is required";

                }
                else if (value.length < 6) {

                    newErrors.password =
                        "Password must be at least 6 characters";

                }
                else {

                    delete newErrors.password;
                }

                break;

            case "confirmPassword":

                if (!value.trim()) {

                    newErrors.confirmPassword =
                        "Confirm Password is required";

                }
                else if (
                    value !== formData.password
                ) {

                    newErrors.confirmPassword =
                        "Passwords do not match";

                }
                else {

                    delete newErrors.confirmPassword;
                }

                break;

            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleBlur = (e) => {

        const { name, value } = e.target;

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        let newErrors = { ...errors };

        if (!value.trim()) {

            newErrors[name] =
                `${name.replace(/([A-Z])/g, " $1")} is required`;

        }

        setErrors(newErrors);
    };

    // const handleChange = (e) => {

    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

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


    const isRegisterFormValid =

        formData.username.trim() &&
        formData.email &&
        formData.country &&
        formData.mobileNumber &&
        formData.password &&
        formData.confirmPassword &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        /^[0-9]{10}$/.test(formData.mobileNumber) &&
        formData.password.length >= 6 &&
        formData.password === formData.confirmPassword &&
        Object.keys(errors).length === 0;

    return (

        <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">

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

                            <label className="text-sm font-semibold text-gray-800">
                                User Name
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter User Name"
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full border rounded-full px-5 py-3 ${touched.username && errors.username
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            />
                            {touched.username && errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.username}
                                </p>
                            )}

                            <label className="text-sm font-semibold text-gray-800">
                                Email
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full border rounded-full px-5 py-3 ${touched.email && errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            />
                            {touched.email && errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}

                            <label className="text-sm font-semibold text-gray-800">
                                Country
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full border rounded-full px-5 py-3 ${touched.country && errors.country
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}                            >
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
                            {touched.country && errors.country && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.country}
                                </p>
                            )}

                            <label className="text-sm font-semibold text-gray-800">
                                Phone
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full border rounded-full px-5 py-3 ${touched.mobileNumber && errors.mobileNumber
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`} />
                            {touched.mobileNumber && errors.mobileNumber && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.mobileNumber}
                                </p>
                            )}

                            {/* PASSWORD */}

                            <div className="relative">

                                <label className="text-sm font-semibold text-gray-800">
                                    Password
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full border rounded-full px-5 py-3 ${touched.password && errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`} />
                                {touched.password && errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}

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

                                <label className="text-sm font-semibold text-gray-800">
                                    Confirm Password
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
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
                                    onBlur={handleBlur}
                                    className={`w-full border rounded-full px-5 py-3 ${touched.confirmPassword && errors.confirmPassword
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`} />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}

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
                                disabled={!isRegisterFormValid}
                                className="
w-full
bg-[#4582AC]
text-white
py-3
rounded-full
font-semibold
disabled:bg-gray-400
disabled:cursor-not-allowed
"
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