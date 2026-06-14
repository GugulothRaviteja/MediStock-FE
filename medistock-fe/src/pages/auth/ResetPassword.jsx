import { useState } from "react";
import API from "../../api/axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
        
    const navigate = useNavigate();

    const location =
        useLocation();

    const email =
        location.state.email;

    const [newPassword,
        setNewPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const resetPassword =
        async () => {

            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "Passwords not match"
                );

                return;
            }

            await API.post(
                "/auth/reset-password",
                {
                    email,
                    newPassword
                }
            );

            alert(
                "Password Updated"
            );

            navigate("/");
        };

    return (

        <div>

            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                    setNewPassword(
                        e.target.value
                    )
                }
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(
                        e.target.value
                    )
                }
            />

            <button
                onClick={resetPassword}
            >
                Update Password
            </button>

        </div>
    );
}

export default ResetPassword;