"use client"

import { authClient } from '@/lib/auth-client';
import Image from "next/image";
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [show, setShow] = useState(false);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updateUser = Object.fromEntries(formData.entries()) as { name: string; image: string };

        if (updateUser.name === user?.name && updateUser.image === (user?.image ?? "")) {
            toast.error("আগের তথ্যই আছে, কিছু পরিবর্তন করুন");
            return;
        }

        const { error } = await authClient.updateUser({
            ...updateUser,
        });

        if (error) {
            toast.error(error.message || "প্রোফাইল আপডেট হয়নি");
        } else {
            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
            setShow(false);
        }
    };

    const handleShowForm = () => {
        setShow(!show);
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-6 sm:py-10">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                <div className="h-24 bg-gradient-to-r from-[#c00000] to-[#7a0000] sm:h-28" />

                <div className="flex flex-col items-center px-4 pb-6 text-center sm:px-6 sm:pb-8">
                    <div className="-mt-12 mb-4 sm:-mt-14">
                        {user?.image ? (
                            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md sm:h-28 sm:w-28">
                                <Image
                                    src={user.image}
                                    alt={user.name ?? "User"}
                                    fill
                                    sizes="112px"
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#c00000] text-3xl font-bold text-white shadow-md sm:h-28 sm:w-28 sm:text-4xl">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>

                    <h1 className="max-w-full break-words text-xl font-bold text-gray-900 sm:text-2xl">{user?.name}</h1>
                    <p className="mt-1 max-w-full break-all text-sm text-gray-500">{user?.email}</p>

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