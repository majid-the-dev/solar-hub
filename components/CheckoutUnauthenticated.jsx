"use client"

import { AiTwotoneInfoCircle } from "react-icons/ai";
import AuthModal from "./AuthModal";
import { useState } from "react";

const CheckoutUnauthenticated = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="px-16 py-40">
        <div className="flex flex-col items-center justify-center">
          <AiTwotoneInfoCircle className="text-3xl" />
          <p className="text-[17px] md:text-xl text-center font-semibold mt-5">
            Oops! You are not logged in
          </p>
          <p className="text-xs text-gray-500 text-center font-light leading-4 mt-2">
            Login or create account to save time at checkout!
          </p>
          <button
            onClick={() => setModal(true)}
            className="animation bg-darkGreen text-white text-sm font-semibold rounded-full px-6 py-3 mt-4 hover:bg-darkGreen/90"
          >
            Sign In
          </button>
        </div>
      </div>
      {modal && <AuthModal modal={modal} setModal={setModal} />}
    </>
  );
};

export default CheckoutUnauthenticated;
