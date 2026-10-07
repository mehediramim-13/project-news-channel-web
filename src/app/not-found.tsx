"use client";

import React from "react";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fff5f5] via-white to-[#ffe3e3] px-4">
            <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-10 text-center shadow-xl">
                <h1 className="bg-gradient-to-b from-[#e53935] to-[#8b0000] bg-clip-text text-8xl font-black tracking-widest text-transparent sm:text-9xl">
                    404
                </h1>

                <div className="mx-auto my-6 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[#c00000] to-transparent" />

                <h2 className="text-2xl font-bold text-gray-900">পেজটি খুঁজে পাওয়া যায়নি</h2>
                <p className="mt-3 text-sm text-gray-500">
                    আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল।
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        onClick={() => window.history.back()}
                        className="rounded-full border border-[#c00000] px-6 py-2.5 text-sm font-semibold text-[#c00000] transition hover:bg-red-50"
                    >
                        পেছনে যান
                    </button>
                    <Link
                        href="/"
                        className="rounded-full bg-[#c00000] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#a00000]"
                    >
                        হোমে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;