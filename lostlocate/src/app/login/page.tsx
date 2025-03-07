'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLogin from '@/app/hooks/useLogin';
import Image from 'next/image';
import { setCookie } from 'cookies-next';

const Login: React.FC = () => {
  const [generated_code, setCode] = useState<string>('');
  const [phone_number, setPhone] = useState<string>('');
  const { userLogin, isSubmitting} = useLogin();
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Inputs - Code:", generated_code, "Phone:", phone_number);
    try {
      const response = await userLogin({ generated_code, phone_number });
      console.log("API Response:", response);
      if (response) {
        setCookie('generated_code', response.generated_code, { maxAge: 60 * 60 * 24 });
        setCookie('phone_number', response.phone_number, { maxAge: 60 * 60 * 24 });
        setShowSuccessMessage(true);
        setShowErrorMessage(false);
        setTimeout(() => {
          setShowSuccessMessage(false);
          if (generated_code.startsWith('Po')) {
            router.push('/police/otpVerification');
          } else {
            router.push('/mortuary/otpVerification');
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  };
  return (
    <div className="flex flex-row h-screen bg-gray-200">
      <div className="flex-1 flex justify-center items-center bg-white">
        <Image src="/media/lostlocate.png" alt="Lost Locate Logo" className="w-full max-w-2xl h-auto"
        width={500}
        height={300}/>
      </div>
      <div className="flex-1 flex flex-col justify-center p-10 bg-yellow-100">
        <h2 className="text-6xl text-red-800 mb-8 text-center">LOGIN</h2>
        <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto w-full">
          <div className="mb-5">
            <label htmlFor="generated_code" className="block mb-2 font-bold text-gray-800 text-2xl">
              Enter code:
            </label>
            <input
              type="text"
              id="generated_code"
              value={generated_code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="1234"
              required
              className="w-full p-4 border-2 border-yellow-700 rounded-md text-lg"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="phone_number" className="block mb-2 font-bold text-gray-800 text-2xl">
              Enter Phone Number:
            </label>
            <input
              type="text"
              id="phone_number"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0743264217"
              required
              className="w-full p-4 border-2 border-yellow-700 rounded-md text-lg"
            />
          </div>
          {showErrorMessage && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-md shadow-lg z-50">
              Login failed. Please try again.
            </div>
          )}
          {showSuccessMessage && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg z-50">
              Login successful!
            </div>
          )}
          <button
            type="submit"
            className={`w-1/2 max-w-xs py-3 px-5 mt-4 text-3xl font-bold text-yellow-700 bg-red-900 rounded-md hover:bg-red-800 transition-colors duration-300 mx-auto ${
              isSubmitting ? 'opacity-50' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;