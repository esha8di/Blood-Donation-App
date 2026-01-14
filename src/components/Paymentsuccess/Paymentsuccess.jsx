import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { FiCheckCircle } from "react-icons/fi";

const Paymentsuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .post(`/success_payment?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
      });
  }, [axiosInstance, sessionId]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gray-200 rounded-2xl p-8 text-center">

        {/* Success Icon */}
        <FiCheckCircle className="mx-auto text-black text-6xl mb-4" />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-black mb-2">
          Payment Successful
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-sm">
          Thank you! Your payment has been completed successfully.
        </p>

      </div>
    </div>
  );
};

export default Paymentsuccess;
