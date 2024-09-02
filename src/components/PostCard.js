import React from 'react';

const PostCard = () => {
    return (
        <div className="hero bg-base-200 rounded-box">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="https://cdn.britannica.com/36/234736-050-4AC5B6D5/Scottish-fold-cat.jpg"
                    className="max-w-sm rounded-lg shadow-2xl"/>
                <div className="flex flex-col gap-3">
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <div className="flex gap-3 items-center">
                        <div className="avatar">
                            <div
                                className="w-12 rounded-full ring-primary ring-offset-base-100 ring ring-offset-1">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="italic">by: Strange Author</div>
                            <div className="text-xs text-stone-200">Created: 2024-09-12</div>
                            <div className="flex flex-wrap gap-1">
                                <div className="badge badge-accent">accent</div>
                                <div className="badge badge-accent">accent</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-primary">Read</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;