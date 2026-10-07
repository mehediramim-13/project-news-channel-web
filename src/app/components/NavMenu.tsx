"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Item {
    slug: string;
    title: string;
}

const NavMenu = ({ items }: { items: Item[] }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const isActive = (href: string) => pathname === href;

    const linkClass = (href: string) =>
        isActive(href)
            ? "text-[#c00000] font-semibold"
            : "text-gray-800 hover:text-[#c00000]";

    return (
        <nav className="sticky top-0 z-40 border-y border-gray-200 bg-white md:border-0 md:py-5">
            <div className="container mx-auto flex items-center justify-between px-4 py-2 md:hidden">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label="মেনু"
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-[#c00000] hover:text-[#c00000]"
                >
                    <span className="relative flex h-4 w-5 flex-col justify-between">
                        <span
                            className={`h-0.5 w-full rounded bg-current transition-all duration-300 ${
                                open ? "translate-y-[7px] rotate-45" : ""
                            }`}
                        />
                        <span
                            className={`h-0.5 w-full rounded bg-current transition-all duration-300 ${
                                open ? "opacity-0" : ""
                            }`}
                        />
                        <span
                            className={`h-0.5 w-full rounded bg-current transition-all duration-300 ${
                                open ? "-translate-y-[7px] -rotate-45" : ""
                            }`}
                        />
                    </span>
                    মেনু
                </button>

                <span className="text-xs text-gray-500">
                    {items.length + 1}টি বিভাগ
                </span>
            </div>

            <div
                id="mobile-menu"
                className={`grid overflow-hidden transition-all duration-300 ease-out md:hidden ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="container mx-auto grid grid-cols-2 gap-2 px-4 pb-4 pt-2">
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className={`rounded-xl border px-4 py-2.5 text-sm transition ${
                                isActive("/")
                                    ? "border-[#c00000] bg-red-50 font-semibold text-[#c00000]"
                                    : "border-gray-200 bg-white text-gray-800 hover:border-[#c00000] hover:text-[#c00000]"
                            }`}
                        >
                            হোম
                        </Link>
                        {items.map((n, i) => {
                            const href = `/category/${n.slug}`;
                            return (
                                <Link
                                    key={`${n.slug}-${i}`}
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    className={`rounded-xl border px-4 py-2.5 text-sm transition ${
                                        isActive(href)
                                            ? "border-[#c00000] bg-red-50 font-semibold text-[#c00000]"
                                            : "border-gray-200 bg-white text-gray-800 hover:border-[#c00000] hover:text-[#c00000]"
                                    }`}
                                >
                                    {n.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="container mx-auto hidden flex-wrap justify-center gap-x-5 gap-y-2 px-4 md:flex">
                <Link href="/" className={`transition-colors ${linkClass("/")}`}>
                    হোম
                </Link>
                {items.map((n, i) => {
                    const href = `/category/${n.slug}`;
                    return (
                        <Link
                            key={`${n.slug}-${i}`}
                            href={href}
                            className={`transition-colors ${linkClass(href)}`}
                        >
                            {n.title}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default NavMenu;