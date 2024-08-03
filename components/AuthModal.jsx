// "use client"

// import { useState } from 'react'
// import AuthForm from './AuthForm';
// import { IoClose } from "react-icons/io5";

// const AuthModal = () => {

//     const [modal, setModal] = useState(false);
//     const [type, setType] = useState("sign-in");

//   return (
//     <>
//         <button onClick={() => setModal(true)} className='text-xs font-light hover:text-darkGreen hover:font-medium'>
//             Account
//         </button>

//         {modal && (
//             <div onClick={() => {setModal(false); setType("sign-in")}} className="fixed inset-0 bg-dark/90 flex items-center justify-center z-[999] px-6">
//                 <div onClick={(e) => e.stopPropagation()} className="relative bg-white w-full max-w-lg max-h-[85vh] rounded-lg px-7 py-14 overflow-y-scroll animate__animated animate__zoomIn">
//                     <h1 className='text-lg md:text-2xl text-center font-semibold'>
//                         {type === "sign-in" ? "Sign In" : "Sign Up"}
//                     </h1>
//                     <p className='text-gray-400 text-xs text-center font-normal mt-2'>Enter your personal details to get started</p>
//                     <div className='mt-10'>
//                         <AuthForm type={type} setType={setType} setModal={setModal} />
//                     </div>
//                     <button onClick={() => {setModal(false); setType("sign-in")}} className='absolute top-3 right-3 text-gray-500 text-lg hover:bg-gray-100 rounded-full p-2'>
//                         <IoClose />
//                     </button>
//                 </div>
//             </div>
//         )}
//     </>
//   )
// }

// export default AuthModal

"use client";

import { useState } from "react";
import AuthForm from "./AuthForm";
import { IoClose } from "react-icons/io5";

const AuthModal = ({ modal, setModal }) => {
  const [type, setType] = useState("sign-in");

  return (
    <div
      onClick={() => {
        setModal(false);
        setType("sign-in");
      }}
      className="fixed inset-0 bg-dark/90 flex items-center justify-center z-[999] px-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-lg max-h-[85vh] rounded-lg px-7 py-14 overflow-y-scroll animate__animated animate__zoomIn"
      >
        <h1 className="text-lg md:text-2xl text-center font-semibold">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </h1>
        <p className="text-gray-400 text-xs text-center font-normal mt-2">
          Enter your personal details to get started
        </p>
        <div className="mt-10">
          <AuthForm type={type} setType={setType} setModal={setModal} />
        </div>
        <button
          onClick={() => {
            setModal(false);
            setType("sign-in");
          }}
          className="absolute top-3 right-3 text-gray-500 text-lg hover:bg-gray-100 rounded-full p-2"
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
