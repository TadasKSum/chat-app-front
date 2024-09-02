"use client"

import React from 'react';
import http from "@/plugins/http";
import usePrivateStore from "@/store/privateStore";

const User = () => {

    const {user, setUser} = usePrivateStore()

    async function addTag() {
        let tag = prompt("Type tag you want to add:")

        if (tag === "") return

        let token = user.token
        let data = {
            tag: tag,
        }

        const res = await http.postAuth("/add-tag", data, token);
        if (res.success) {
            return setUser({tags: res.data.tags})
        }
    }

    return (
        <div className="flex rounded-lg gap-3">
            <div className="flex grow-[1] flex-col items-center break-words gap-3 p-2">
                <div className="avatar">
                    <div className="w-40 rounded-full">
                        <img src={user.picture}/>
                    </div>
                </div>
                <div className="text-2xl">{user.nickname}</div>
                <div>Username: {user.username}</div>
                <div className="flex flex-wrap gap-2 max-w-80 justify-center">
                    {user.tags && user.tags.map((tag, index) => <div key={index} className="badge badge-accent">{tag}</div>)}
                </div>
                <div className="flex justify-center">
                    <button className="btn btn-primary" onClick={addTag}>Add Tag</button>
                </div>
            </div>
        </div>
    );
};

export default User;