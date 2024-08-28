import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className="mx-auto">
            <footer
                className="footer footer-center bg-base-100 text-base-content p-5 flex flex-wrap justify-center  md:justify-between ">
                <aside className="flex justify-between">
                    <Link className='text-gray-600 text-xs link-hover' href="/about-us">About Us</Link>
                    <Link className='text-gray-600 text-xs link-hover' href="/contacts">Contacts</Link>
                    <Link className='text-gray-600 text-xs link-hover' href="/rules">Rules</Link>
                </aside>
                <aside>
                    <p className='text-gray-400 text-xs'>Copyright © {new Date().getFullYear()} - All rights reserved by Chat App</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;