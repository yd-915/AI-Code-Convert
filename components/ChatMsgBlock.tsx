import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {a11yDark} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import copy from 'clipboard-copy';
import {AdsChat} from "@/components/AdsChat";

interface Props {
    code: string;
    user: boolean;
}

export const ChatMsgBlock: React.FC<Props> = ({code, user}) => {
    const [copyText, setCopyText] = useState('Copy');
    const [isCopied, setIsCopied] = useState(false);
    const handleCopyCode = (codeToCopy: string) => {
        copy(codeToCopy);
        setCopyText('Copied!');
        setTimeout(() => {
            setCopyText('Copy');
        }, 2000);
    };

    const handleCopyAll = (allText: string) => {
        copy(allText);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div>
            <div
                className={`flex items-start p-4 text-slate-400 ${user ? 'bg-slate-800 bg-opacity-90' : 'bg-slate-800 bg-opacity-50'}`}>
                <div className="mr-4">
                    {user ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#0ea5e9"
                                  d="M12 17c3.663 0 6.866 1.575 8.608 3.925l-1.842.871C17.348 20.116 14.848 19 12.001 19c-2.848 0-5.347 1.116-6.765 2.796l-1.841-.872C5.137 18.574 8.339 17 12 17Zm0-15a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z"/>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none">
                                <path d="M0 0h24v24H0z"/>
                                <path fill="#6366f1" d="M14.62 2.662a1.5 1.5 0 0 1 1.04 1.85l-4.431 15.787a1.5 1.5 0 0 1-2.889-.81L12.771 3.7a1.5 1.5 0 0 1 1.85-1.039ZM7.56 6.697a1.5 1.5 0 0 1 0 2.12L4.38 12l3.182 3.182a1.5 1.5 0 1 1-2.122 2.121L1.197 13.06a1.5 1.5 0 0 1 0-2.12l4.242-4.243a1.5 1.5 0 0 1 2.122 0Zm8.88 2.12a1.5 1.5 0 1 1 2.12-2.12l4.243 4.242a1.5 1.5 0 0 1 0 2.121l-4.242 4.243a1.5 1.5 0 1 1-2.122-2.121L19.621 12L16.44 8.818Z"/>
                            </g>
                        </svg>
                    )}
                </div>
                <div className="flex-grow text-base leading-6">
                    <ReactMarkdown
                        components={{
                            code: ({node, className, children, ...props}) => {
                                const match = /language-(\w+)/.exec(className || '');
                                if (match) {
                                    const codeToCopy = String(children).replace(/\n$/, '');
                                    return (
                                        <div style={{position: 'relative'}}>
                                            <SyntaxHighlighter
                                                style={a11yDark}
                                                language={match[1]}
                                                customStyle={{fontSize: '14px'}}
                                                PreTag="div"
                                                children={codeToCopy}
                                            />
                                            <button
                                                className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-sm text-color-info-light hover:bg-[#2D2E3A] active-bg-[#2D2E3A]"
                                                onClick={() => handleCopyCode(codeToCopy)}
                                            >
                                                {copyText}
                                            </button>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            },
                        }}
                    >
                        {code}
                    </ReactMarkdown>
                </div>
                <div className="ml-auto">
                    <button
                        className="p-1"
                        onClick={() => handleCopyAll(code)}
                    >
                        {isCopied ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#b7bbc3"
                                      d="M5 18h14v2H5v-2zm4.6-2.7L5 10.7l2-1.9l2.6 2.6L17 4l2 2l-9.4 9.3z"/>
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" stroke="#c7c9cc" strokeWidth="1.5">
                                    <path
                                        d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16v-5Z"/>
                                    <path
                                        d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h4a3 3 0 0 1 3 3"/>
                                </g>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {code.length > 800 ? (
                <AdsChat />
            ) : ('')}
        </div>
    );
};
