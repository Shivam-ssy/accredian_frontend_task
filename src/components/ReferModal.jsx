import React, { useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

const ReferralModal = ({ isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    refereeName: "",
    refereeEmail: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    referrerName: Yup.string()
      .required("Your name is required")
      .min(2, "Name must be at least 2 characters"),
    referrerEmail: Yup.string()
      .email("Please enter a valid email")
      .required("Your email is required"),
    referrerPhone: Yup.string()
      .matches(/^[0-9\s\(\)\-\+]+$/, "Please enter a valid phone number")
      .min(10, "Phone number is short")
      .max(10,"Please Enter 10 digits" ),
    refereeName: Yup.string()
      .required("Friend's name is required")
      .min(2, "Name must be at least 2 characters"),
    refereeEmail: Yup.string()
      .email("Please enter a valid email")
      .required("Friend's email is required")
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateField = async (name, value) => {
    try {
      await Yup.reach(validationSchema, name).validate(value);
      return "";
    } catch (error) {
      return error.message;
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    const errorMessage = await validateField(name, value);
    
    if (errorMessage) {
      setErrors({ ...errors, [name]: errorMessage });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      
      // If validation passes, continue with submission
    //   console.log("Form data is valid:", formData);
      const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/referral/create`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      }).then((response)=> response.json())
      console.log(res);
      
      if(res?.status==201){
        toast("Referral sent successfully")
      }
      else{
        toast(res.message ||"Something went wrong")
      }
      setIsModalOpen(false);
    } catch (error) {
      // Collect all validation errors
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
    <ToastContainer/> 
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 z-50 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Refer a Friend</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 text-sm">Share the benefits with your friends and colleagues!</p>
              <p className="text-gray-600 mb-3 text-sm">You can sent until he/she Claim it</p>
              
              <div className="border-l-4 pl-3 py-1 mb-3" style={{ borderColor: "#1A73E8" }}>
                <h3 className="font-medium text-gray-800 text-sm">Your Information</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="referrerName"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-sm ${
                      errors.referrerName ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ focusRing: "#1A73E8" }}
                    placeholder="Enter Your Name"
                    value={formData.referrerName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.referrerName && (
                    <p className="text-red-500 text-xs mt-1">{errors.referrerName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    name="referrerEmail"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-sm ${
                      errors.referrerEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ focusRing: "#1A73E8" }}
                    placeholder="Enter Your Email"
                    value={formData.referrerEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.referrerEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.referrerEmail}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Your Phone</label>
                  <input
                    type="tel"
                    name="referrerPhone"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-sm ${
                      errors.referrerPhone ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ focusRing: "#1A73E8" }}
                    placeholder="(123) 456-7890"
                    value={formData.referrerPhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.referrerPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.referrerPhone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="border-l-4 pl-3 py-1 mb-3" style={{ borderColor: "#1A73E8" }}>
                <h3 className="font-medium text-gray-800 text-sm">Friend's Information</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Friend's Name</label>
                  <input
                    type="text"
                    name="refereeName"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-sm ${
                      errors.refereeName ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ focusRing: "#1A73E8" }}
                    placeholder="Enter Friend's Name"
                    value={formData.refereeName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.refereeName && (
                    <p className="text-red-500 text-xs mt-1">{errors.refereeName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Friend's Email</label>
                  <input
                    type="email"
                    name="refereeEmail"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-sm ${
                      errors.refereeEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ focusRing: "#1A73E8" }}
                    placeholder="Enter Friend's Email"
                    value={formData.refereeEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.refereeEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.refereeEmail}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 transition duration-300"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 cursor-pointer text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center"
                style={{ backgroundColor: "#1A73E8" }}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Send Invitation"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralModal;