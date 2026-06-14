import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import doctorImage from "../../assets/doctor-login.jpg";

function ForgotPassword() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // SEND OTP

    const sendOtp = async () => {

        try {

            const response = await API.post(
                "/auth/send-otp",
                {
                    email: formData.email,
                }
            );

            setMessage(response.data);

            setStep(2);

        } catch (error) {

            console.log(error);
            setMessage(
                error.response?.data || error.message ||
                "Failed to send OTP");
        }
    };

    // VERIFY OTP

    const verifyOtp = async () => {

        try {

            const response = await API.post(
                "/auth/verify-otp",
                {
                    email: formData.email,
                    otp: formData.otp,
                }
            );

            setMessage(response.data);

            setStep(3);

        } catch (error) {

            setMessage("Invalid OTP");
        }
    };

    // RESET PASSWORD

    const resetPassword = async () => {

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            setMessage("Passwords do not match");
            return;
        }

        try {

            const response = await API.post(
                "/auth/reset-password",
                {
                    email: formData.email,
                    newPassword: formData.newPassword,
                }
            );

            alert("Password changed successfully!");

            // Clear old token if any
            localStorage.removeItem("token");

            // Redirect to Login page
            navigate("/login");

        } catch (error) {

            console.log(error);

            setMessage(
                error.response?.data ||
                "Password reset failed"
            );
        }
    };

    // const resetPassword = async () => {

    //     if (
    //         formData.newPassword !==
    //         formData.confirmPassword
    //     ) {

    //         setMessage(
    //             "Passwords do not match"
    //         );

    //         return;
    //     }

    //     try {

    //         const response = await API.post(
    //             "/auth/reset-password",
    //             {
    //                 email: formData.email,
    //                 newPassword:
    //                     formData.newPassword,
    //             }
    //         );

    //         alert(response.data);

    //         navigate("/login");

    //     } catch (error) {

    //         setMessage(
    //             "Password reset failed"
    //         );
    //     }
    // };

    return (

        <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">

            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

                {/* LEFT IMAGE */}

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
                            Secure Password Recovery
                        </p>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="p-10 flex items-center justify-center">

                    <div className="w-full max-w-md">

                        <h2 className="text-3xl font-bold text-center mb-8">
                            Forgot Password
                        </h2>

                        {/* STEP 1 */}

                        {step === 1 && (

                            <>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Registered Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-full px-5 py-3 mb-4"
                                />

                                <button
                                    onClick={sendOtp}
                                    className="w-full bg-blue-600 text-white py-3 rounded-full"
                                >
                                    Send OTP
                                </button>
                            </>
                        )}

                        {/* STEP 2 */}

                        {step === 2 && (

                            <>
                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    className="w-full border rounded-full px-5 py-3 mb-4"
                                />

                                <button
                                    onClick={verifyOtp}
                                    className="w-full bg-green-600 text-white py-3 rounded-full"
                                >
                                    Verify OTP
                                </button>
                            </>
                        )}

                        {/* STEP 3 */}

                        {step === 3 && (

                            <>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full border rounded-full px-5 py-3 mb-4"
                                />

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full border rounded-full px-5 py-3 mb-4"
                                />

                                <button
                                    onClick={resetPassword}
                                    className="w-full bg-purple-600 text-white py-3 rounded-full"
                                >
                                    Reset Password
                                </button>
                            </>
                        )}

                        {message && (

                            <p className="text-center text-red-500 mt-4">
                                {message}
                            </p>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;