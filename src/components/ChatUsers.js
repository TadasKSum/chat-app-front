import React from 'react';

const ChatUsers = ({user}) => {
    return (
        <div className="flex items-center gap-2 w-40">
            <div className="avatar online">
                <div className="rounded-full h-12 w-12">
                    <img
                        src={user.picture}
                        alt="Avatar Tailwind CSS Component"/>
                </div>
            </div>
            <div>
                <div className="font-bold">{user.username}</div>
                <div className="text-sm opacity-50">{user.status}</div>
            </div>
        </div>
    );
};

export default ChatUsers;