import React, {useState} from 'react';

interface BaseCodeTopProps {
    title: string;
}

export const BaseCodeTop: React.FC<BaseCodeTopProps> = (props) => {
    return (
        <div className="mt-2 flex flex-col items-center justify-center background-color text-white">
            <h2 className="hidden md:block lg:block text-xl md:text-3xl font-semibold">
                {props.title}
            </h2>
        </div>
    );
};