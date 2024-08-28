import React from 'react';
import http from "@/plugins/http";
import usePrivateStore from "@/store/privateStore";
import useLoginStore from "@/store/loginStore";
import {useRouter} from "next/navigation";

const UserCard = ({profile}) => {
    // Router
    const router = useRouter();

    // Zustand
    const {user} = usePrivateStore()
    const {isLoggedIn} = useLoginStore()

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
            console.log(res)
        } else {
            console.log(res.message)
        }
    }

    return (
        <div className="flex justify-between flex-col items-center bg-base-100 p-4 rounded-box min-w-48 h-64 mt-3 mb-3 gap-3">
            <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
                    <img src={profile.picture}/>
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
                <button className="btn btn-primary min-w-16" onClick={startConversation}>Chat</button>
            </div>
        </div>
    );
};

export default UserCard;