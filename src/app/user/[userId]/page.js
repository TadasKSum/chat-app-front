"use client"

import React, {useEffect, useState} from 'react';
import http from "@/plugins/http";
import usePrivateStore from "@/store/privateStore";
import useConversationStore from "@/store/conversationStore";
import useLoginStore from "@/store/loginStore";
import {useParams, useRouter} from "next/navigation";

const Page = () => {

    const [thisUser, setThisUser] = useState(null);

    const {userId} = useParams();
    const router = useRouter();

    const {user} = usePrivateStore();
    const {setConversations} = useConversationStore();
    const {isLoggedIn} = useLoginStore();

    useEffect(() => {
        fetchSingleUser()
    }, []);

    async function fetchSingleUser() {
        const res = await http.get("/single-user/"+userId);
        if (res.success) {
            setThisUser(res.data);
        }
    }

    function convertTimestamp(string) {
        const date = new Date(string);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const time = `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;

        return time;
    }

    async function startConversation() {
        if (!isLoggedIn) return alert("Login to start conversation")

        const token = user.token;
        const chatWith = thisUser._id;

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
        <div className="flex flex-col items-center p-5 gap-2 pages-height">
            <div className="flex justify-center rounded-box w-7/12 gap-3">
                <div className="flex flex-col items-center gap-3">
                    <div className="avatar">
                        <div className="w-40 rounded-full">
                            <img src={thisUser && thisUser.picture}/>
                        </div>
                    </div>
                    <div className="text-2xl">
                        {thisUser && thisUser.username}
                    </div>
                    <div>
                        Joined: {thisUser && convertTimestamp(thisUser.created)}
                    </div>
                </div>
            </div>
            <div className="flex gap-1">
                {thisUser && thisUser.tags.map((tag, index) => <div className="badge badge-accent" key={index}>{tag}</div>)}
            </div>
            <div className="flex gap-1">
                <button className="btn btn-primary" onClick={startConversation}>Start Conversation</button>
            </div>
            <div className="divider divider-primary"></div>
            <div>
                {thisUser && thisUser.description}
            </div>
        </div>
    );
};

export default Page;