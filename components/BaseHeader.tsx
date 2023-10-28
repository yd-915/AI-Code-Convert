import React from 'react';

export const BaseHeader = () => {
    return (
        <div className="h-100 py-2 flex justify-between items-center pl-2 pr-2 md:pl-10 md:pr-10 pt-2 background-color border-b-2 border-dotted border-[#24354b]">
            <div className="flex items-center">
                <svg width="35" height="35" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#3b82f6" d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/>
                </svg>
                <h1 className="text-white text-lg font-semibold ml-1">
                    <a href="https://www.aicodeconvert.com">AICodeConvert.com</a>
                </h1>
            </div>
            <div className="flex items-center hidden md:block lg:block">
                <a href="https://blog.aicodeconvert.com" className="text-blue-500 text mr-1 md:mr-4 lg:mr-4">Blog</a>
                <a href="#about" className="text-white text mr-1 md:mr-4 lg:mr-4">About Us</a>
                <a href="#contact" className="text-white text mr-1 md:mr-4 lg:mr-4">Contact</a>
            </div>
        </div>
    );
};