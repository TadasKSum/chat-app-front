"use client"

import React, {useEffect} from 'react';
import usePrivateStore from "@/store/privateStore";
import useConversationStore from "@/store/conversationStore";

import User from "@/components/User";
import ProfileSettings from "@/components/ProfileSettings";
import http from "@/plugins/http";

const Page = () => {

    //zustand
    const {user} = usePrivateStore();
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

    return (
        <div className="flex flex-col items-center p-5 gap-2 pages-height">
            <div role="tablist" className="tabs tabs-lifted p-2 w-11/12">
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
                    Tab content 2
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