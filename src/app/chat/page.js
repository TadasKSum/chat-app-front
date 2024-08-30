"use client"

import React, {useEffect} from 'react';
import socket from "@/plugins/socket";
import usePrivateStore from "@/store/privateStore";
import useChatStore from "@/store/chatStore";
import socketDisconnect from "@/components/SocketDisconnect";

const Page = () => {
    // Zustand
    const {user} = usePrivateStore();
    const {chat, setChat, setChatOnline, chatUsers, setChatUsers} = useChatStore();

    // Chat Join
    useEffect(() => {
        connect()
        socket.on("users", (users) => {
            setChatUsers(users);
        })
    }, []);

    function connect() {
        const userId = user.id;
        socket.auth = {userId};
        setChatOnline(true)
        socket.connect();
    }

    return (
        <div className="flex flex-col items-center p-4 pages-height">
            <div className="flex flex-wrap justify-center gap-2 w-full component-height bg-base-100 rounded-box p-4">
                <div className="flex flex-col w-full gap-3">
                    <div className="w-full max-h-[66vh] grow-[13] flex overflow-auto gap-3">
                        <div className="bg-gray-900 rounded-box h-full p-3 flex flex-col grow-[9]">
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-14 rounded-full">
                                        <img
                                            alt="Tailwind CSS chat bubble component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                                    </div>
                                </div>
                                <div className="chat-header flex gap-2 items-center">
                                    <div>Name</div>
                                    <time className="text-xs opacity-50">Timestamp</time>
                                </div>
                                <div className="chat-bubble text-white bg-blue-500">
                                    Wow!
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-900 rounded-box h-full p-3 flex flex-col grow-[1]">
                            <div>Name1</div>
                        </div>
                    </div>
                    <div className="grow-[1] flex gap-3">
                        <div className="grow-[9]">
                            <textarea
                                className="textarea textarea-bordered w-full h-[100%] resize-none"
                                placeholder="Type your message here..."
                            ></textarea>
                        </div>
                        <div className="grow-[1] flex flex-col items-center justify-center gap-2">
                            <button className="btn btn-primary w-full">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default socketDisconnect(Page);