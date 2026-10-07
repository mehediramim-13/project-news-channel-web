import React from "react";

const LoadingPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fff5f5] via-white to-[#ffe3e3] px-4">
            <div className="flex flex-col items-center">
               
                <div className="relative h-20 w-20">
                    <div className="absolute inset-0 rounded-full border-4 border-red-100" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#c00000]" />
                    <div className="absolute inset-3 animate-pulse rounded-full bg-gradient-to-br from-[#e53935] to-[#8b0000] opacity-80" />
                </div>

                <h2 className="mt-6 text-lg font-semibold text-gray-800">লোড হচ্ছে...</h2>

                <div className="mt-3 flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#c00000] [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#c00000] [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#c00000]" />
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;