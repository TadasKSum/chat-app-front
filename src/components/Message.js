"use client"

import React, {useEffect, useState} from 'react';
import usePrivateStore from "@/store/privateStore";

const Message = ({message}) => {

    const [check, setCheck] = useState(false);

    const {user} = usePrivateStore()

    useEffect(() => {
        if (user.id === message.senderId) {
            setCheck(true)
        }
    }, []);

    function convertTimestamp(string) {
        const date = new Date(string);

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const time = `${hours}:${minutes}`;

        return time;
    }

    return (
        <div className={`chat ${check ? 'chat-start' : 'chat-end'}`}>
            <div className="chat-image avatar">
                <div className="w-14 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={message.avatar}/>
                </div>
            </div>
            <div className="chat-header flex gap-2 items-center">
                <div>{message.sender}</div>
                <time className="text-xs opacity-50">{convertTimestamp(message.time)}</time>
            </div>
            <div className="chat-bubble">
                {message.content}
            </div>
        </div>
    );
};

export default Message;