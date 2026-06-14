import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {

    const navigate = useNavigate();

    const [email,setEmail] =
            useState("");

    const [otp,setOtp] =
            useState("");

    const verifyOtp = async() => {

        try{

            await API.post(
                "/auth/verify-otp",
                {
                    email,
                    otp
                }
            );

            navigate(
                "/reset-password",
                {
                    state:{email}
                }
            );

        }catch(error){

            alert(
                "Invalid OTP"
            );
        }
    };

    return(

        <div>

            <input
                placeholder="Email"
                value={email}
                onChange={(e)=>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <input
                placeholder="OTP"
                value={otp}
                onChange={(e)=>
                    setOtp(
                        e.target.value
                    )
                }
            />

            <button
                onClick={verifyOtp}
            >
                Verify OTP
            </button>

        </div>
    );
}

export default VerifyOtp;