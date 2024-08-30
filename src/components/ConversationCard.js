import React from 'react';
import http from "@/plugins/http";
import usePrivateStore from "@/store/privateStore";
import useConversationStore from "@/store/conversationStore";
import {useRouter} from "next/navigation";

const ConversationCard = ({chat}) => {

    // Zustand
    const {user} = usePrivateStore();
    const {setConversations} = useConversationStore();

    // Router
    const router = useRouter();

    function convertTimestamp(string) {
        const date = new Date(string);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return time;
    }
    async function deleteConversation(conversationId) {
        if(confirm("Are you sure you want to delete conversation?")) {
            let chatId = conversationId;
            let token = user.token;

            const data = {
                chatId,
                request: "delete ThIs"
            }

            const res = await http.postAuth("/delete-conversation", data, token)
            if (res.success) {
                setConversations(res.data)
            }
        }
    }
    function navigatePage() {
        router.push("/talk/"+chat._id);
    }

    return (
        <div className="bg-base-100 border-base-300 rounded-box p-3 w-96 h-[250px] flex flex-col gap-2">
            <div>Started: {convertTimestamp(Number(chat.startDate))}</div>
            <div>Messages: <span className="badge badge-info">{chat.messages.length}</span></div>
            <div className="flex justify-between">
                <div className="flex flex-col items-center">
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <img
                                src={chat.participants[0].avatar}/>
                        </div>
                    </div>
                    <div>{chat.participants[0].name}</div>
                </div>
                <div className="divider divider-horizontal">AND</div>
                <div className="flex flex-col items-center">
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <img
                                src={chat.participants[1].avatar}/>
                        </div>
                    </div>
                    <div>{chat.participants[1].name}</div>
                </div>
            </div>
            <div className="flex justify-center gap-2">
                <button className="btn w-[80px] btn-primary" onClick={navigatePage}>Chat</button>
                <button className="btn w-[80px] btn-error" onClick={() => deleteConversation(chat._id)}>Delete</button>
            </div>
        </div>
    );
};

export default ConversationCard;