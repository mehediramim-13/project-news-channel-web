import React from 'react';
import Image from 'next/image';
import NavLink from './NavLink';
import UserInfo from './UserInfo';

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

                <UserInfo />
            </div> 

            <NavLink />
        </header>
    );
};

export default Header;