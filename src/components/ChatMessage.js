"use client"

import React, {useEffect, useState} from 'react';
import usePrivateStore from "@/store/privateStore";
import useChatStore from "@/store/chatStore";
import socket from "@/plugins/socket";

const ChatMessage = ({message}) => {

    const [check, setCheck] = useState(false);

    const {user} = usePrivateStore()
    const {setChat} = useChatStore();

    useEffect(() => {
        if (user.id === message.senderId) {
            setCheck(true)
        }
    }, []);

    useEffect(() => {
        socket.on('message', (messages) => {
            setChat(messages)
        })
    }, []);

    function convertTimestamp(string) {
        const date = new Date(string);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const time = `${year}/${month}/${day} ${hours}:${minutes}`;

        return time;
    }

    function leaveLike() {
        const like = {
            id: message.id,
            like: user.username,
        }
        socket.emit("like", like)
    }

    return (
        <div className={`chat ${check ? 'chat-start' : 'chat-end'}`} >
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
            <div className={`chat-bubble text-white ${check ? 'bg-blue-500' : 'bg-green-500'}`}>
                {message.content}
            </div>
            <div className="flex items-center gap-1">
                {message.likes.length === 0 ? <span className="chat-footer flex opacity-50">No likes</span> : <span className="chat-footer flex opacity-50">Likes: {message.likes.length}</span>}
                <span className="cursor-pointer" onClick={leaveLike}>❤️</span>
            </div>
        </div>
    );
};

export default ChatMessage;