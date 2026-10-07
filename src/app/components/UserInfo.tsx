"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Bairer kothao click korle dropdown bondho hobe
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center justify-end gap-3">
            {user ? (
                <div className="relative" ref={menuRef}>
                    <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
                        {user.image ? (
                            <Image src={user.image} alt={user.name ?? "User"} width={32} height={32} className="rounded-full" />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c00000] text-sm font-bold text-white">
                                {user.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                        <span className="text-sm text-gray-800">{user.name}</span>
                    </button>

                    {open && (
                        <div className="absolute right-0 top-full z-50 mt-1 w-36 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
                            <Link
                                href="/profilePage"
                                onClick={() => setOpen(false)}
                                className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                                প্রোফাইল
                            </Link>
                            <button
                                onClick={() => authClient.signOut()}
                                className="block w-full px-3 py-2 text-left text-sm text-[#c00000] hover:bg-gray-100"
                            >
                                সাইন আউট
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link href="/signin" className="px-3 py-1.5 text-sm text-gray-800 hover:text-black">
                        সাইন ইন
                    </Link>
                    <Link href="/signup" className="rounded-md bg-[#c00000] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#a00000]">
                        সাইন আপ
                    </Link>
                </>
            )}
        </div>
    );
};

export default UserInfo;