"use client"

import React from 'react';
import {useRouter} from "next/navigation";
import Link from 'next/link';
import usePrivateStore from "@/store/privateStore";
import useLoginStore from "@/store/loginStore";
import useConversationStore from "@/store/conversationStore";
import Cookies from "js-cookie";

const Toolbar = () => {

    // Zustand
    const {user} = usePrivateStore();
    const {isLoggedIn, setIsLoggedIn} = useLoginStore()
    const {conversations} = useConversationStore()

    // Router
    const router = useRouter()

    // Function
    function logout() {
        Cookies.remove("chatToken");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("conversations");
        setIsLoggedIn(false);
        router.push("/");
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/allusers">All Users</Link>
                        </li>
                        {isLoggedIn ? <>
                            <li>
                                <Link href="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link href="/conversations">Conversations {conversations.length === 0 ? "" : <>{conversations.length}</>}</Link>
                            </li>
                        </> : <>
                            <li>
                                <Link href="/register">Register</Link>
                            </li>
                        </>}
                    </ul>
                </div>
                <div className="btn btn-ghost text-xl"><Link href="/">Chat App</Link></div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-1 px-1">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/allusers">All Users</Link>
                    </li>
                    {isLoggedIn ? <>
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link href="/conversations">Conversations {conversations.length === 0 ? "" : <span className="badge badge-info">{conversations.length}</span>}</Link>
                        </li>
                    </> : <>
                        <li>
                            <Link href="/register">Register</Link>
                        </li>
                    </>}
                </ul>
            </div>
            <div className="navbar-end">
                {isLoggedIn ?
                    <div className="flex gap-3">
                        <div className="avatar tooltip tooltip-left" data-tip={user.nickname}>
                            <div className="w-12 rounded-full ring-primary ring-offset-base-100 ring ring-offset-1">
                                <img src={user.picture}/>
                            </div>
                        </div>
                        <button className="btn btn-primary"
                                onClick={logout}>
                            Logout
                        </button>
                    </div>
                    :
                    <button className="btn btn-primary">
                        <Link href="/login">Login</Link>
                    </button>
                }
            </div>
        </div>
    );
};

export default Toolbar;