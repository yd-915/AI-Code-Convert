import React, { useState } from 'react';
import { languages } from '@/components/Languages';

export const LanguageSupport = () => {
    const [showAll, setShowAll] = useState(false);
    const initialItemsToShow = 50; // Initial number of items to show on mobile
    const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
    const [showMoreLabel, setShowMoreLabel] = useState('Show More');

    const toggleShowAll = () => {
        setShowAll(!showAll);
        setItemsToShow(showAll ? initialItemsToShow : languages.length);
        setShowMoreLabel(showAll ? 'Show More' : 'Hide More');
    };

    const visibleLanguages = showAll
        ? languages
        : languages.slice(0, itemsToShow);

    return (
        <div className="p-4 md:pl-48 md:pr-48 mt-20 background-color flex-row justify-center items-center text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Languages Supported</h2>
            <div className="mt-3 md:mt-6 text-color-info-light text-center text-lg font-semibold">Convert code across {languages.filter((language) => language.src && language.alt).length}+ programming languages</div>
            <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
                {visibleLanguages
                    .filter((language) => language.src && language.alt)
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((icon, index) => (
                        <div key={index} className="flex flex-col items-center bg-white py-4 rounded-lg shadow-2xl">
                            <img src={icon.src} alt={icon.alt} width="56" height="56" />
                            <h3 className="mt-2 pl-1 pr-1">{icon.alt}</h3>
                        </div>
                    ))}
            </div>
            {languages.length > initialItemsToShow && (
                <div className="mt-4">
                    <button
                        onClick={toggleShowAll}
                        className="text-color-info-light underline cursor-pointer"
                    >
                        {showMoreLabel}
                    </button>
                </div>
            )}
        </div>
    );
};