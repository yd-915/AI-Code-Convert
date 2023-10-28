import React, {useState} from 'react';

export const MainTop = () => {
    const [title, setTitle] = useState('Code Converter(Generator | Translator)');
    const [subtitle, setSubtitle] = useState('Code Converter AI | Convert Code or Natural Language To Programming Language Code');
    return (
        <div className="mt-2 flex flex-col items-center justify-center background-color text-white">
            <h2 className="hidden md:block lg:block text-xl md:text-3xl font-semibold">
                <span className="text-blue-500">AI</span> {title}
            </h2>
            <h3 className="mt-2 md:mt-2 text md:text-lg text-center leading-2 text-color-info-light">
                {subtitle}
            </h3>
        </div>
    );
};