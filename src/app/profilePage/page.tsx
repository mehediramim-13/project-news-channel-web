"use client"

import { authClient } from '@/lib/auth-client';
import Image from "next/image";
import React, { useState } from 'react';

const Profile = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [show, setShow] = useState(false);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updateUser = Object.fromEntries(formData.entries());

        await authClient.updateUser({
            ...updateUser
        })
    }

    const handleShowForm = () => {
        setShow(!show);
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                {/* Top banner */}
                <div className="h-28 bg-gradient-to-r from-[#c00000] to-[#7a0000]" />

                <div className="flex flex-col items-center px-6 pb-8 text-center">
                    {/* Avatar */}
                    <div className="-mt-14 mb-4">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user.name ?? "User"}
                                width={112}
                                height={112}
                                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                            />
                        ) : (
                            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#c00000] text-4xl font-bold text-white shadow-md">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                    <p className="mt-1 text-sm text-gray-500">{user?.email}</p>

                    <button
                        onClick={handleShowForm}
                        className="mt-6 rounded-full bg-[#c00000] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#a00000]"
                    >
                        {show ? "বাতিল করুন" : "প্রোফাইল এডিট করুন"}
                    </button>

                    {show && (
                        <form onSubmit={handleUpdateProfile} className="mt-6 w-full space-y-4 text-left">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">নাম</label>
                                <input
                                    name="name"
                                    type="text"
                                    defaultValue={user?.name}
                                    placeholder="আপনার নাম"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">ছবির লিংক (Image URL)</label>
                                <input
                                    name="image"
                                    type="url"
                                    defaultValue={user?.image ?? ""}
                                    placeholder="https://..."
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-[#c00000] py-2 text-sm font-semibold text-white transition hover:bg-[#a00000]"
                            >
                                আপডেট করুন
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;