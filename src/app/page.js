"use client"

import Image from "next/image";
import Cookies from "js-cookie";
import usePrivateStore from "@/store/privateStore";
import usePublicStore from "@/store/publicStore";
import http from "@/plugins/http";
import {useEffect} from "react";

export default function Home() {

    // Zustand
    const {setUser, setIsLoggedIn} = usePrivateStore();

    // Functions
    async function autoLogin() {
        // Check if cookie exists
        const token = Cookies.get("chatToken");
        if (!token) return
        // If yes make postAuth request
        const request = {
            type: "auto-login"
        }
        const res = await http.postAuth("/auto-login", request, token )
        if (res.success) {
            setUser({
                id: res.data.id,
                username: res.data.username,
                nickname: res.data.nickname,
                picture: res.data.picture,
                token: res.token,
            })
            setIsLoggedIn(true)
            Cookies.set("chatToken", res.token);
        }
    }

    useEffect(() => {
        autoLogin()
    }, []);

    return (
        <main className="flex flex-col items-center p-20 pages-height">
            <div>App</div>
        </main>
    );
}
