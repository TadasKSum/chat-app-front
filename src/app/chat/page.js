"use client"

import React, {useEffect, useRef} from 'react';
import socket from "@/plugins/socket";
import usePrivateStore from "@/store/privateStore";
import useChatStore from "@/store/chatStore";
import socketDisconnect from "@/components/SocketDisconnect";
import ChatUsers from "@/components/ChatUsers";
import ChatMessage from "@/components/ChatMessage";

const Page = () => {
    // Zustand
    const {user} = usePrivateStore();
    const {chat, setChat, setChatOnline, chatUsers, setChatUsers} = useChatStore();

    // Ref
    const chatInput = useRef()

    // Chat Join
    useEffect(() => {
        connect()
        socket.on("users", (users) => {
            setChatUsers(users);
        })
        socket.on("message", (messages) => {
            setChat(messages)
        })
    }, []);

    function connect() {
        const userId = user.id;
        socket.auth = {userId};
        setChatOnline(true)
        socket.connect();
    }

    function sendMessage() {
        const newChat = {
            senderId: user.id,
            sender: user.username,
            avatar: user.picture,
            content: chatInput.current?.value,
            time: Date.now(),
        }
        socket.emit("message", newChat);
        chatInput.current.value = "";
    }

    return (
        <div className="flex flex-col items-center p-4 pages-height">
            <div className="flex flex-wrap justify-center gap-2 w-full component-height bg-base-100 rounded-box p-4">
                <div className="flex flex-col w-full gap-3">
                    <div className="w-full max-h-[66vh] grow-[13] flex overflow-auto gap-3">
                        <div className="bg-gray-900 rounded-box h-full p-3 flex flex-col grow-[15]">
                            {chat && chat.map(message => <ChatMessage key={message.id} message={message} />)}
                        </div>
                        <div className="bg-gray-900 rounded-box h-full p-3 flex flex-col gap-2 overflow-y-scroll">
                            {chatUsers && chatUsers.map(user => <ChatUsers key={user.userId} user={user} />)}
                        </div>
                    </div>
                    <div className="grow-[1] flex gap-3">
                        <div className="grow-[9]">
                            <textarea
                                className="textarea textarea-bordered bg-gray-900 w-full h-[100%] resize-none"
                                placeholder="Type your message here..."
                                ref={chatInput}
                            ></textarea>
                        </div>
                        <div className="grow-[1] flex flex-col items-center justify-center gap-2">
                            <button className="btn btn-primary w-full" onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default socketDisconnect(Page);