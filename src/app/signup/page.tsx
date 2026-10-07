"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            image: string;
            password: string;
            email: string;
        };

        const { name, image, email, password } = user;

        const { data, error } = await authClient.signUp.email({
            name,
            image,
            email,
            password,
            callbackURL: "/",
        });

        if (data) {
            toast.success("Sign Up Successfully.");
            router.push("/");
        }
        if (error) {
            console.log("SIGNUP ERROR:", error);
            toast.error(error.message || "SignUp failed. Please try again");
        }
    };

    const handleGoogleSignUp = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            console.log(error);
            toast.error("Something wrong with google Sign up. Try Again Later");
        }
    }; 

    return (
        <div className="flex flex-col items-center justify-center my-10">
            <h1 className="text-2xl text-red-700 font-bold">সাইন আপ</h1>

            <form onSubmit={onSubmit}>
                <fieldset className="fieldset rounded-box w-xs p-4">
                    <label className="label text-lg text-black">নাম</label>
                    <input name="name" type="text" className="input" placeholder="Name" />

                    <label className="label text-lg text-black">ImageURL</label>
                    <input name="image" type="url" className="input" placeholder="Image" />

                    <label className="label text-lg text-black">ইমেইল</label>
                    <input name="email" type="email" className="input" placeholder="Email" />

                    <label className="label text-lg text-black">পাসওয়ার্ড</label>
                    <input name="password" type="password" className="input" placeholder="Password" />

                    <button type="submit" className="btn bg-red-700 text-white mt-4">
                        সাইন আপ করুন
                    </button>
                </fieldset>
            </form>

            <button
                onClick={handleGoogleSignUp}
                className="btn bg-white text-black border-[#e5e5e5]"
            >
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Sign up with Google
            </button>
        </div>
    );
};

export default SignUpPage;