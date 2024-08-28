"use client"

import React, {useEffect} from 'react';
import http from "@/plugins/http";
import usePublicStore from "@/store/publicStore";
import usePrivateStore from "@/store/privateStore";
import UserCard from "@/components/UserCard";

const Page = () => {
    // Zustand
    const {users, setUsers} = usePublicStore();
    const {user} = usePrivateStore()

    useEffect(() => {
        fetchAllUsers()
    }, []);

    async function fetchAllUsers() {
        const res = await http.get("/all-users")
        const filterData = res.data.filter(profile => profile._id !== user.id)
        setUsers(filterData)
    }

    return (
        <div className="sm:flex p-5 gap-2 pages-height flex-wrap">
            {users && users.map((user) => <UserCard key={user._id} profile={user} />)}
        </div>
    );
};

export default Page;