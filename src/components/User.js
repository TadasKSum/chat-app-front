import React from 'react';

const User = ({user}) => {
    return (
        <div className="flex grow items-center flex-col break-words rounded-lg mt-5 gap-3">
            <div className="avatar">
                <div className="w-40 rounded-full">
                    <img src={user.picture}/>
                </div>
            </div>
            <div className="text-2xl">{user.nickname}</div>
            <div>Username: {user.username}</div>
        </div>
    );
};

export default User;