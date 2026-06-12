import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../api/axios";
import doctorImage from "../../assets/doctor-login.jpg";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "username",
                response.data.username
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            

            navigate("/dashboard");

        } catch (error) {

            setError(
                "Invalid Email or Password"
            );
        }
    };

    return (

        <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">

            <div className="w-4xl max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

                {/* LEFT PANEL */}

                <div className="relative hidden md:block">

                    <img
                        src={doctorImage}
                        alt="Doctor"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-[#4582AC]/40 to-[#2C5E8A]/90"></div>

                    <div className="absolute bottom-10 left-10 text-white">

                        <div className="flex items-center gap-3 mb-4">

                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">

                                💊

                            </div>

                            <h1 className="text-3xl font-bold">
                                MEDISTOCK
                            </h1>

                        </div>

                        <p className="max-w-sm text-sm leading-6">

                            Empowering Healthcare,
                            One Click at a Time:
                            Your Health,
                            Your Records,
                            Your Control.

                        </p>

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="flex items-center justify-center p-10">

                    <div className="w-full max-w-md">

                        {/* LOGO */}

                        <div className="flex justify-center mb-6">

                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl">

                                💊

                            </div>

                        </div>

                        <h1 className="text-4xl font-bold text-center text-gray-800">
                            Login
                        </h1>

                        <p className="text-center text-gray-400 mt-2 mb-8">
                            Log in to your account
                        </p>

                        <form
                            onSubmit={handleLogin}
                            className="space-y-5"
                        >

                            {/* EMAIL */}

                            <div>

                                <label className="text-sm font-semibold text-gray-800">

                                    Email

                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-full
                                    px-5
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-400
                                    "
                                />

                            </div>

                            {/* PASSWORD */}

                            <div>

                                <label className="text-sm font-semibold text-gray-800">

                                    Password

                                </label>

                                <div className="relative mt-2">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="
                                        w-full
                                        border
                                        rounded-full
                                        px-5
                                        py-3
                                        pr-12
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-400
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                        "
                                    >

                                        {
                                            showPassword
                                                ? <FaEyeSlash />
                                                : <FaEye />
                                        }

                                    </button>

                                </div>

                            </div>

                            {/* ERROR */}

                            {
                                error && (

                                    <p className="text-red-500 text-sm">

                                        {error}

                                    </p>
                                )
                            }

                            {/* FORGOT PASSWORD */}

                            {/* <div className="text-right">

                                <a
                                    href="#"
                                    className="text-[#4582AC] text-sm"
                                >
                                    Forgot Password?
                                </a>

                            </div> */}

                            {/* LOGIN */}

                            <button
                                type="submit"
                                className="
                                w-full
                                bg-[#4582AC]
                                hover:bg-[#2C5E8A]
                                text-white
                                py-3
                                rounded-full
                                font-semibold
                                transition
                                "
                            >
                                Log In
                            </button>

                            {/* GOOGLE */}

                            {/* <button
                                type="button"
                                className="
                                w-full
                                border
                                py-3
                                rounded-full
                                hover:bg-gray-50
                                "
                            >
                                Log in with Google
                            </button> */}

                            {/* FOOTER */}

                            <p className="text-center text-gray-500">

                                Don't have an account?{" "}

                                <span className="text-[#4582AC] font-semibold cursor-pointer">

                                    Sign Up

                                </span>

                            </p>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;