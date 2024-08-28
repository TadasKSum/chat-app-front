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

    return (
        <div className="flex flex-col items-center bg-base-100 rounded-box p-5 mt-5 gap-3">
            <div className="avatar">
                <div className="w-40 rounded-full">
                    <img src={user && user.picture}/>
                </div>
            </div>
            <div className="text-2xl">
                {user && user.nickname}
            </div>
        </div>
    );
};

export default Page;