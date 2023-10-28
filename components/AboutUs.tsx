import React from 'react';

export const AboutUs = () => {
    return (
        <div className="pl-6 pr-6 mt-80 md:pl-20 md:pr-20 background-color">
            <div id="about" className="text-color-info-light">
                <div className="text-2xl">About Us</div>
                <ul className="mt-4 list-disc list-inside">
                    <li className="mb-2">AICodeConvert(AI Code Converter | Code Converter AI) simplifies coding with AI by integrating AI Code Translator and AI Code Generator. </li>
                    <li className="mb-2">It efficiently translates existing code into different programming languages (AI Code Translator) and automatically generates high-quality code snippets and templates (AI Code Generator). </li>
                    <li className="mb-2">This powerful combination makes AICodeConvert an indispensable tool for developers,
                        providing a convenient and intelligent coding experience.</li>
                    <li className="mb-2">All for free(AI Code Convert | AI Code Converter).</li>
                    <li className="mb-2">Your Best AI Code Helper.</li>
                </ul>
            </div>
            <div id="contact" className="text-color-info-light pt-4">
                <div className="text-2xl">Contact</div>
                <div className="flex justify-start items-center mb-2 space-y-2 mt-2 flex-wrap">
                    <a href="https://ko-fi.com/audi_guzz" className="px-2 bg-[#f6db4b] cursor-pointer rounded-full mr-4 py-1">
                        <div className="flex justify-center items-center">
                            <p className="ml-2 mr-2 text-black font-bold">Buy me a Coffee</p>
                            <svg width="30" height="30" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#eab308" d="M208 80H32a8 8 0 0 0-8 8v48a96.3 96.3 0 0 0 32.54 72H32a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16h-24.54a96.59 96.59 0 0 0 27-40.09A40 40 0 0 0 248 128v-8a40 40 0 0 0-40-40Zm24 48a24 24 0 0 1-17.2 23a95.78 95.78 0 0 0 1.2-15V97.38A24 24 0 0 1 232 120ZM112 56V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Zm32 0V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Zm-64 0V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Z"/>
                            </svg>
                        </div>
                    </a>
                    <a href="https://twitter.com/AUDI_GUZZ" className="text-gray cursor-pointer mr-4">
                        <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645c0 138.72-105.583 298.558-298.558 298.558c-59.452 0-114.68-17.219-161.137-47.106c8.447.974 16.568 1.299 25.34 1.299c49.055 0 94.213-16.568 130.274-44.832c-46.132-.975-84.792-31.188-98.112-72.772c6.498.974 12.995 1.624 19.818 1.624c9.421 0 18.843-1.3 27.614-3.573c-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319c-28.264-18.843-46.781-51.005-46.781-87.391c0-19.492 5.197-37.36 14.294-52.954c51.655 63.675 129.3 105.258 216.365 109.807c-1.624-7.797-2.599-15.918-2.599-24.04c0-57.828 46.782-104.934 104.934-104.934c30.213 0 57.502 12.67 76.67 33.137c23.715-4.548 46.456-13.32 66.599-25.34c-7.798 24.366-24.366 44.833-46.132 57.827c21.117-2.273 41.584-8.122 60.426-16.243c-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                        </svg>
                    </a>
                    <a href="https://www.producthunt.com/products/aicodeconvert#aicodeconvert" target="_blank">
                        <img src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=540327&theme=light"
                             alt="AICodeConvert - Generate&#0032;Code&#0032;or&#0032;Natural&#0032;Language&#0032;To&#0032;Another&#0032;Language&#0032;Code | Product Hunt"
                             width="200" height="45" />
                    </a>
                </div>
                <div>
                    Mail: enqueueit@gmail.com
                </div>
            </div>
        </div>
    );
};