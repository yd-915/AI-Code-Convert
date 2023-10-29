import React, { useEffect, useState } from 'react';
import { ChatContainer } from "@/components/ChatContainer";

interface BaseChatProps {
    option: string;
}
export const BaseChat: React.FC<BaseChatProps> = (props) => {
    return (
        <div className="flex h-full items-center justify-center background-color text-neutral-100 px-2">
            <div className="flex-row items-center justify-center w-full md:w-3/5 lg:w-3/5">
                <div className="flex h-full flex-col justify-center">
                    <div>
                        <ChatContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};