"use client"

import React, {useEffect} from 'react';
import usePrivateStore from "@/store/privateStore";
import useConversationStore from "@/store/conversationStore";

import User from "@/components/User";
import ProfileSettings from "@/components/ProfileSettings";
import http from "@/plugins/http";

const Page = () => {

    //zustand
    const {user, setUser} = usePrivateStore();
    const {setConversations} = useConversationStore();

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
            return setConversations(res.data)
        }
    }

    async function addDescription() {
        let desc = prompt("Enter a description");
        if (desc === "") return;
        const token = user.token;
        let data = {
            description: desc
        }
        const res = await http.postAuth("/add-description", data, token)
        if(res.success) {
            return setUser({description: res.data.description})
        }
    }

    return (
        <div className="flex flex-col items-center p-5 gap-2 pages-height">
            <div role="tablist" className="tabs tabs-lifted p-2 w-9/12">
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Profile"
                    defaultChecked
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <User user={user}/>
                </div>
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Description"
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="flex flex-col gap-3">
                        <div className="h-[20rem] w-full bg-gray-900 rounded-box p-3">
                            {user.description}
                        </div>
                        <div className="flex justify-end">
                            <button className="btn btn-primary" onClick={addDescription}>Edit</button>
                        </div>
                    </div>
                </div>
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Settings"
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="sm:flex w-full ">
                        <User user={user}/>
                        <div className="divider divider-primary md:divider-horizontal"></div>
                        <ProfileSettings/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;