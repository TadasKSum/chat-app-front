"use client"

import React, {useEffect, useRef} from 'react';
import usePrivateStore from "@/store/privateStore";
import useSingleTalk from "@/store/singleConversation";
import http from "@/plugins/http";
import {useParams} from "next/navigation";
import Message from "@/components/Message";
import AutoScroll from "@/components/AutoScroll";

const Page = () => {

    // Zustand
    const {talk, setTalk} = useSingleTalk();
    const {user} = usePrivateStore();

    const {chatId} = useParams();

    // Ref
    const chatInput = useRef();
    const bottomRef = useRef(null);

    useEffect(() => {
        fetchTalk(chatId)
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [])

    async function fetchTalk(id) {
        const token = user.token;
        const res = await http.getAuth(`/get-single-talk/${id}`, token)
        if(res.success) {
            setTalk(res.data)
        }
    }

    async function sendMessage() {
        if (chatInput.current.value === "" || chatInput.current.value === undefined || chatInput.current.value === null) return
        const token = user.token;
        const newMessage = {
            sender: user.username,
            senderId: user.id,
            content: chatInput.current?.value,
            date: Date.now(),
            avatar: user.picture,
            chatId: chatId
        }
        const res = await http.postAuth("/make-message", newMessage, token)
        if (res.success) {
            setTalk(res.data)
            chatInput.current.value = "";
        }
    }

    return (
        <div className="flex flex-col items-center p-5 pages-height">
            <div className="flex flex-wrap justify-center gap-2 w-full component-height bg-base-100 rounded-box p-4">
                <div className="flex flex-col w-full gap-3">
                    <div className="bg-gray-900 rounded-box w-full p-4 max-h-[68vh] grow-[13] flex flex-col overflow-auto" ref={bottomRef}>
                        <AutoScroll>
                            {talk && talk.messages.map((message, index) => <Message key={index} message={message} />)}
                        </AutoScroll>
                    </div>
                    <div className="grow-[1] flex gap-3">
                        <div className="grow-[9]">
                            <textarea
                                className="textarea textarea-bordered w-full h-[100%]"
                                placeholder="Type your message here..."
                                ref={chatInput}
                            ></textarea>
                        </div>
                        <div className="grow-[1] flex flex-col items-center justify-center">
                            <button className="btn btn-primary w-full" onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;