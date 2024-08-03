"use client"

import { Toaster } from "react-hot-toast"

const ToasterProvider = () => {
    return (
        <Toaster className="z-[99999]" />
    )
}

export default ToasterProvider;