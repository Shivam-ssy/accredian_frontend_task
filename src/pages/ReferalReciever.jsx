import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const ReferralReceiver = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const checkReferralStatus = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/referral/claim/${id}`);
        const data = await res.json();

        if (res.ok) {
          setStatus(data.claimed ? "claimed" : "success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error checking referral status:", error);
        setStatus("error");
      }
    };

    checkReferralStatus();
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-xl rounded-lg p-8 text-center max-w-sm w-full transition-opacity duration-500 animate-fadeIn">
      <div className="w-full flex justify-between items-center"><div className='w-fit flex flex-col my-5 items-center'><span className='text-[#1A73E8] font-bold text-xl'>accredian</span><span className='text-[8px]'>credentials that matter</span></div><Link className="text-blue-500 font-semibold underline" to="/">Home</Link></div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Referral Status</h2>
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
            <p className="text-blue-600 font-medium mt-3">Checking referral...</p>
          </div>
        )}
        {status === "claimed" && (
          <div className="text-red-600">
            <svg className="w-16 h-16 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-lg font-semibold">Referral Already Claimed</p>
          </div>
        )}
        {status === "success" && (
          <div className="text-green-600">
            <svg className="w-16 h-16 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg font-semibold">Referral Claimed Successfully!</p>
          </div>
        )}
        {status === "error" && (
          <div className="text-gray-600">
            <svg className="w-16 h-16 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M12 12h0" />
            </svg>
            <p className="text-lg font-semibold">Invalid or Expired Referral</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralReceiver;
