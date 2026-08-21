import React, { useContext, useEffect } from "react";
import "./Verify.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {

    const [searchParams] = useSearchParams();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const { url } = useContext(StoreContext);

    const navigate = useNavigate();

    const verifyPayment = async () => {

        console.log("Success:", success);
        console.log("OrderId:", orderId);

        try {

            const response = await axios.post(
                url + "/api/order/verify",
                {
                    success,
                    orderId
                }
            );

            console.log("Backend Response:", response.data);

            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;