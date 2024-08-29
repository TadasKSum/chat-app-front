"use client"

import React, {useEffect} from 'react';
import useConversationStore from "@/store/conversationStore";
import usePrivateStore from "@/store/privateStore";
import http from "@/plugins/http";
import ConversationCard from "@/components/ConversationCard";

const Page = () => {

    // Zustand
    const {conversations, setConversations} = useConversationStore();
    const {user} = usePrivateStore();

    useEffect(() => {
        fetchConversations()
    }, []);

    async function fetchConversations() {
        const token = user.token;
        const data = {
            request: "fetch me these"
        }
        const res = await http.postAuth("/get-conversations", data, token)
        if(res.success) {
            setConversations(res.data)
        }
    }

    return (
        <div className="flex flex-col items-center p-5 pages-height">
            <div className="flex flex-wrap justify-center gap-2 w-full component-height">
                {conversations.length === 0 ? <div>No conversations</div> : conversations.map((chat, index) => <ConversationCard key={index} chat={chat} />)}
            </div>
        </div>
    );
};

export default Page;