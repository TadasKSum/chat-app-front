"use client"

import React, {useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import http from "@/plugins/http";
import usePrivateStore from "@/store/privateStore";
import useLoginStore from "@/store/loginStore";
import useConversationStore from "@/store/conversationStore";
import Cookies from 'js-cookie';

const Page = () => {

    // States
    const [hidePassword, setHidePassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [rememberMe, setRememberMe] = useState(false)

    // Refs
    const userInput = useRef();
    const passInput = useRef();

    // Zustand
    const {user, setUser} = usePrivateStore()
    const {isLoggedIn, setIsLoggedIn} = useLoginStore()
    const {setConversations} = useConversationStore()

    // Router
    const router = useRouter()

    // Functions
    async function login() {
        setErrorMessage(null)
        setSuccessMessage(null)
        let newLogin = {
            username: userInput.current?.value,
            password: passInput.current?.value,
        }

        const res = await http.post('/login', newLogin)

        if (res.success) {
            setSuccessMessage(res.message)
            setUser({
                id: res.data.id,
                username: res.data.username,
                nickname: res.data.nickname,
                picture: res.data.picture,
                token: res.token,
                tags: res.data.tags,
                description: res.data.description,
            })
            setIsLoggedIn(true)
            // If checkbox is checked
            if (rememberMe) Cookies.set("chatToken", res.token);
            router.push("/profile")
        } else {
            setErrorMessage(res.message)
        }
    }

    const rememberCheckboxControl = (event) => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center p-20 gap-2 pages-height">
            <div className="flex w-1/2 flex-col gap-2 items-center grow-[2]">
                <h2 className="text-2xl text-center mb-3">Login</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-6">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                    </svg>
                    <input ref={userInput} type="text" className="grow" placeholder="Username"/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <button onClick={() => setHidePassword(!hidePassword)}>
                        {hidePassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
                            </svg>
                        }
                    </button>
                    <input
                        ref={passInput}
                        type={hidePassword ? "password" : "text"}
                        placeholder="Password"
                        className="grow"
                        maxLength="20"
                    />
                </label>
                <div className="form-control">
                    <label className="label cursor-pointer gap-3">
                        <span className="label-text">Remember me</span>
                        <input type="checkbox"
                               className="checkbox checkbox-primary"
                               checked={rememberMe}
                               onChange={rememberCheckboxControl}
                        />
                    </label>
                </div>
                {errorMessage && <div role="alert" className="alert min-w-lg max-w-fit alert-warning">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <span>{errorMessage}</span>
                </div>}
                {successMessage && <div role="alert" className="alert min-w-lg max-w-fit alert-success">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{successMessage}</span>
                </div>}
                <button className="btn btn-primary btn-wide" onClick={login}>Login</button>
            </div>
            <div className="w-1/2">
                <img src="/undraw_login_re_4vu2.svg" alt=""/>
            </div>
        </div>
    );
};

export default Page;