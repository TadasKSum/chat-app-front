"use client"

import React, {useEffect, useState} from 'react';
import http from "@/plugins/http";
import {useParams} from "next/navigation";

const Page = () => {

    const [user, setUser] = useState(null);

    const {userId} = useParams();

    useEffect(() => {
        fetchSingleUser()
    }, []);

    async function fetchSingleUser() {
        const res = await http.get("/single-user/"+userId);
        if (res.success) {
            setUser(res.data);
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

    return (
        <div className="flex flex-col items-center p-5 gap-2 pages-height">
            <div className="flex justify-center rounded-box w-7/12 gap-3">
                <div className="flex flex-col items-center gap-3">
                    <div className="avatar">
                        <div className="w-40 rounded-full">
                            <img src={user && user.picture}/>
                        </div>
                    </div>
                    <div className="text-2xl">
                        {user && user.nickname}
                    </div>
                    <div>
                        Joined: {user && convertTimestamp(user.created)}
                    </div>
                </div>
            </div>
            <div className="flex gap-1">
                {user && user.tags.map((tag, index) => <div className="badge badge-accent" key={index}>{tag}</div>)}
            </div>
            <div className="flex gap-1">
                <button className="btn btn-primary">Start Conversation</button>
            </div>
            <div className="divider divider-primary"></div>
            <div>
                {user && user.description}
            </div>
        </div>
    );
};

export default Page;