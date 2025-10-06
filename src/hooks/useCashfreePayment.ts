import { useEffect, useRef, useCallback } from "react";
import { load } from "@cashfreepayments/cashfree-js"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../dataProvider/services/axiosInstance";
import axios from "axios";


export function useCashfreePayment(mode: "sandbox" | "production" = "sandbox") {
    const cashfreeRef = useRef<any>(null);
    const intervalRef = useRef<any>(null);
    const navigate = useNavigate();
    const baseUrl = "http://localhost:3000/api/v1";

    // Initialize SDK only once
    const initializeSDK = useCallback(async () => {
        if (!cashfreeRef.current) {
            const cf = await load({ mode });
            cashfreeRef.current = cf;
        }
    }, [mode]);

    useEffect(() => {
        initializeSDK();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [initializeSDK]);

    const pollPaymentStatus = useCallback(
        (orderId: string) => {
            if (intervalRef.current) return;

            intervalRef.current = setInterval(async () => {
                try {
                    const res = await axios.get(`${baseUrl}/students/payment/status?orderId=${orderId}`);

                    const { data } = res;
                    if (data.statusCode === 200) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null;
                        navigate(`/payment-success?orderId=${orderId}`);
                    } else if (data.statusCode !== 200) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null;
                        navigate(`/payment-failed?orderId=${orderId}`);
                    }
                } catch (error) {
                    console.error("Polling error:", error);
                }
            }, 3000);
        },
        [navigate]
    );

    const doPayment = useCallback(
        async (batchId: string, studentId: string) => {
            await initializeSDK();

            try {
                const { data } = await axios.post(`${baseUrl}/students/${batchId}/payment`, {
                    studentId,
                });

                const paymentSessionId: string = data.data.payment_session_id;
                const orderId: string = data.data.order_id;

                const checkoutOptions = {
                    paymentSessionId,
                    redirectTarget: "_modal", // "_self" or "_blank"
                };

                cashfreeRef.current.checkout(checkoutOptions).then((result: any) => {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }

                    pollPaymentStatus(orderId);

                    if (result?.error) {
                        console.warn("User closed modal or error occurred:", result.error);
                    }
                });
            } catch (err) {
                console.error("Failed to initiate payment:", err);
            }
        },
        [initializeSDK, pollPaymentStatus]
    );

    return { doPayment };
}
