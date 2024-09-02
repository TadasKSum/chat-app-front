"use client"

import Cookies from "js-cookie";
import usePrivateStore from "@/store/privateStore";
import useLoginStore from "@/store/loginStore";
import useConversationStore from "@/store/conversationStore";
import http from "@/plugins/http";
import React, {useEffect} from "react";

export default function Home() {

    // Zustand
    const {setUser} = usePrivateStore();
    const {isLoggedIn, setIsLoggedIn} = useLoginStore()
    const {setConversations} = useConversationStore()

    // Functions
    async function autoLogin() {
        // Check if cookie exists
        const token = Cookies.get("chatToken");
        if (!token) return setIsLoggedIn(false)
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
            setConversations(res.conversations)
            Cookies.set("chatToken", res.token);
        }
    }

    useEffect(() => {
        if(!isLoggedIn) {
            autoLogin()
        }
    }, []);

    return (
        <main className="flex flex-col items-center p-10 pages-height">
            <div className="flex flex-col gap-2">
                <div className="w-1/2">
                    <img src="/undraw_welcome_cats_thqn.svg" alt=""/>
                </div>
                <div>
                    <h2 className="text-2xl">Welcome to C(h)at app!</h2>
                </div>
                <div className="divider"></div>
                <div className="flex gap-2 justify-between">
                    <div className="flex flex-col gap-1">
                        <div>
                            This is an app for cats, about cats and c(h)atting.
                        </div>
                        <div>
                            Register, login and chat with our users about your various hobbies.
                        </div>
                        <div>
                            And, or course - cats!
                        </div>
                        <div>
                            <img className="rounded-box" src="https://cattime.com/wp-content/uploads/sites/14/2015/05/adolescent-cats-e1556041232752.jpg" alt=""/>
                        </div>
                    </div>
                    <img className="w-1/3" src="/undraw_personal_text_re_vqj3.svg" alt=""/>
                </div>
            </div>
        </main>
    );
}
