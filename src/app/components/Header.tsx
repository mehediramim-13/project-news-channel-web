import React from 'react';
import Image from 'next/image';
import NavLink from './NavLink';
import UserInfo from './UserInfo';

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="contents">
            <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-3 md:grid md:grid-cols-3 md:px-6">
                <div className="hidden md:block" />

                <div className="flex min-w-0 items-center gap-2 md:justify-center">
                    <Image
                        src="/icon.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="h-9 w-9 shrink-0 rounded-xl sm:h-[50px] sm:w-[50px]"
                    />
                    <div className="min-w-0 leading-tight">
                        <h2 className="truncate text-lg font-bold text-[#c00000] sm:text-2xl">
                            Bangla News 24
                        </h2>
                        <p className="hidden text-[13px] text-gray-600 sm:block">{date}</p>
                    </div>
                </div>

                <UserInfo />
            </div>

            <NavLink />
        </header>
    );
};

export default Header;