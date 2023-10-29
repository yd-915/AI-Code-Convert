import React, { useState, useEffect } from 'react';
import { FEATURES } from "@/components/CommonUtils";
import {languages} from "@/components/Languages";

export const MainFeature = () => {
    const [host, setHost] = useState("");
    useEffect(() => {
        const currentDomain = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;
        if (port === '80' || port === '443' || port === '') {
            setHost(protocol + "//" + currentDomain + "/");
        } else {
            setHost(protocol + "//" + currentDomain + ":" + port + "/");
        }
    }, []);
    return (
        <div className="pl-4 pr-4 pt-8 pb-8 md:pt-10 md:pb-36 md:p-y-20 md:pl-48 md:pr-48 mt-32 bg-black flex-row justify-center items-center text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">✨ Product Features</h2>
            <div className="mt-3 md:mt-6 text-color-info-light text-center text-lg font-semibold">Support {FEATURES.length}+ Features</div>
            <div className="mt-3 md:mt-6 grid w-full text-center grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-3">
                {
                    FEATURES.map((feature, index) => (
                        <a key={index}
                            className="cursor-pointer rounded-lg background-color text-color-info-light hover:border-blue-600 border border-transparent transition duration-200 ease-in-out"
                            href={feature.canonical}
                        >
                        <div key={index} className="flex w-full items-center justify-between px-4 py-6">
                                <div
                                    className="flex items-center justify-start gap-2 text-slate-900 text-color-info-light"
                                >
                                    <h3 className="inline-flex text-base font-semibold tracking-wide">{feature.title}</h3>
                                </div>
                                <div className="text-slate-900">
                                    <svg width="24" height="24" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#ffffff" d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L754.752 480z"/>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    ))
                }
            </div>
        </div>
    );
};