import React from 'react';
import http from "@/plugins/http";
import usePrivateStore from "@/store/privateStore";
import useLoginStore from "@/store/loginStore";
import useConversationStore from "@/store/conversationStore";
import {useRouter} from "next/navigation";

const UserCard = ({profile}) => {
    // Router
    const router = useRouter();

    // Zustand
    const {user} = usePrivateStore()
    const {isLoggedIn} = useLoginStore()
    const {conversations, setConversations} = useConversationStore()

    // Functions
    function navigate() {
        router.push("/user/"+profile._id)
    }

    async function startConversation() {
        if (!isLoggedIn) return alert("Login to start conversation")

        const token = user.token;
        const chatWith = profile._id;

        const data = {
            participant: chatWith
        }

        const res = await http.postAuth("/start-conversation", data, token)
        if(res.success) {
            setConversations(res.data)
            return router.push("/conversations")
        } else {
            return alert(res.message)
        }
    }

    return (
        <div className="flex flex-col items-center bg-base-100 p-4 rounded-box min-w-48 h-64 mt-3 mb-3 gap-3">
            <div className="avatar">
                <div class="avatar">
                    <div class="w-32 rounded-xl">
                        <img src={profile.picture} />
                    </div>
                </div>
            </div>
            <div className="text-xl">
                {profile.nickname}
            </div>
            {/*<div>
                Online
            </div>*/}
            <div className="flex gap-2">
                <button className="btn btn-primary min-w-16" onClick={navigate}>Info</button>
                {isLoggedIn ? <button className="btn btn-primary min-w-16" onClick={startConversation}>Chat</button> : ""}
            </div>
        </div>
    );
};

export default UserCard;