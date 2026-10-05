import React from 'react';
import Image from 'next/image';
import NavLink from './NavLink';

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header>
            <div className="container mx-auto grid grid-cols-3 items-center py-3">
                <div />

                <div className="flex items-center justify-center gap-2">
                    <Image src="/logo.webp" alt="Logo" width={50} height={50} className="rounded-xl" />
                    <div className="leading-tight">
                        <h2 className="text-2xl font-bold text-[#c00000]">Bangla News 24</h2>
                        <p className="text-[13px] text-gray-600">{date}</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <button className="px-3 py-1.5 text-sm text-gray-800 hover:text-black">
                        সাইন ইন
                    </button>
                    <button className="rounded-md bg-[#c00000] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#a00000]">
                        সাইন আপ
                    </button>
                </div>
            </div>

            <NavLink />
        </header>
    );
};

export default Header;