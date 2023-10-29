import React, {useState, useEffect, useRef} from 'react';

import {ChatMsgBlock} from "@/components/ChatMsgBlock";
import {ChatBody, ChatMsg} from "@/types/types";
import {NaturalLanguageSelect} from "@/components/NaturalLanguageSelect";

function getChatHistory() {
    const existingData = localStorage.getItem('chatHistory');
    return existingData ? JSON.parse(existingData).map(transformToChatMsg) : [];
}

function transformToChatMsg(item: any) {
    return {
        role: item.role,
        content: item.content,
    } as ChatMsg;
}

function storeChatHistory(history: ChatMsg[]) {
    localStorage.setItem('chatHistory', JSON.stringify(history));
}

export const ChatContainer = () => {
    const [inputCode, setInputCode] = useState<string>('');
    const [outputCode, setOutputCode] = useState<string>('');
    const [outputNaturalLanguage, setOutputNaturalLanguage] = useState<string>('English');
    const [loading, setLoading] = useState<boolean>(false);
    const [chatHistory, setChatHistory] = useState<ChatMsg[]>([]);
    const [clearHisBtnName, setClearHisBtnName] = useState('Clear History');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        setChatHistory(getChatHistory());
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
        if (textAreaRef.current) {
            textAreaRef.current.addEventListener('input', handleTextAreaChange);
        }
        return () => {
            if (textAreaRef.current) {
                textAreaRef.current.removeEventListener('input', handleTextAreaChange);
            }
        };
    }, []);

    const clearHistory = () => {
        localStorage.clear();
        setClearHisBtnName('All History cleared.')
        setChatHistory([]);
        setTimeout(() => {
            setClearHisBtnName('Clear History');
        }, 2000);
    }

    const addMessageToHistory = (newMessage: ChatMsg) => {
        chatHistory?.push(newMessage)
        setChatHistory(chatHistory);
        storeChatHistory(chatHistory);
    };

    const handleChat = async () => {
        const maxCodeLength = 30000;
        if (!inputCode) {
            alert('Please enter some message.');
            return;
        }
        if (inputCode.length > maxCodeLength) {
            alert(
                `Please enter less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
            );
            return;
        }

        // Add the user's message to the history
        addMessageToHistory({role: 'user', content: inputCode});

        setLoading(true);
        setInputCode('');
        setOutputCode('');
        const controller = new AbortController();
        const body: ChatBody = {
            inputCode,
            outputNaturalLanguage,
            chatHistory
        };
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            setLoading(false);
            alert('Please try again later.');
            return;
        }
        const data = response.body;
        if (!data) {
            setLoading(false);
            alert('Something went wrong.');
            return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let code = '';
        while (!done) {
            const {value, done: doneReading} = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            code += chunkValue;
            setOutputCode((prevCode) => prevCode + chunkValue);
        }
        setLoading(false);

        // Add the user's message to the history
        addMessageToHistory({role: 'assistant', content: code});
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChat().then(() => {
                if (textAreaRef.current) {
                    textAreaRef.current.rows = 1;
                }
            });
        }
    };

    const handleTextAreaChange = () => {
        if (textAreaRef.current) {
            const minRows = 1;
            const maxRows = 3;
            textAreaRef.current.rows = minRows;
            const lineHeight = parseInt(getComputedStyle(textAreaRef.current).lineHeight);
            const textAreaHeight = textAreaRef.current.scrollHeight;

            if (textAreaHeight > lineHeight * maxRows) {
                textAreaRef.current.rows = maxRows;
                textAreaRef.current.style.overflowY = 'scroll';
            } else {
                textAreaRef.current.style.overflowY = 'hidden';
            }
        }
    };


    return (
        <div>
            <div className="mb-2">
                <NaturalLanguageSelect
                    language={outputNaturalLanguage}
                    onChange={(value) => {
                        setOutputNaturalLanguage(value);
                    }}
                />
            </div>
            <div className="mb-40">
                {chatHistory.map((message, index) => (
                    <ChatMsgBlock key={index} code={message.content} user={message.role === 'user'}/>
                ))}
                {loading ? (
                    <ChatMsgBlock code={outputCode} user={false}/>
                ) : (
                    ''
                )}
            </div>
            <div className="fixed background-color bottom-0 w-full md:w-3/5 lg:w-3/5 pr-6 md:pr-0 lg:pr-0">
                <div className="flex w-full items-center rounded-md bg-slate-900">
                    <textarea
                        ref={textAreaRef}
                        value={inputCode}
                        rows={1}
                        className="flex min-h-full w-full rounded-md border border-slate-300 p-2 text-base focus:outline-none focus:ring-1 border-slate-300/20 bg-slate-800 text-slate-200 placeholder-slate-400 focus:border-blue-600 focus:ring-blue-600"
                        placeholder="Send a message"
                        onChange={(e) => {
                            setInputCode(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                    ></textarea>
                    <div className="">
                        <button
                            className="inline-flex text-slate-200 hover:text-blue-600 sm:p-2"
                            onClick={() => {
                                handleChat();
                            }}
                        >
                            {loading ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="2" r="0" fill="#6366f1">
                                        <animate attributeName="r" begin="0" calcMode="spline" dur="1s"
                                                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                 repeatCount="indefinite" values="0;2;0;0"/>
                                    </circle>
                                    <circle cx="12" cy="2" r="0" fill="#6366f1" transform="rotate(45 12 12)">
                                        <animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s"
                                                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                 repeatCount="indefinite" values="0;2;0;0"/>
                                    </circle>
                                    <circle cx="12" cy="2" r="0" fill="#6366f1" transform="rotate(90 12 12)">
                                        <animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s"
                                                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                 repeatCount="indefinite" values="0;2;0;0"/>
                                    </circle>
                                    <circle cx="12" cy="2" r="0" fill="#6366f1" transform="rotate(135 12 12)">
                                        <animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s"
                                                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                 repeatCount="indefinite" values="0;2;0;0"/>
                                    </circle>
                                    <circle cx="12" cy="2" r="0" fill="#6366f1" transform="rotate(180 12 12)">
                                        <animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s"
                                                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                 repeatCount="indefinite" values="0;2;0;0"/>
                                    </circle>
                                    <circle cx="12" cy="2" r="0" fill="#6366f1" transform="rotate(225 12 12)">
                                        <animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s"
                                                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                 repeatCount="indefinite" values="0;2;0;0"/>
                                    </circle>
                                    <circle cx="12" cy="2" r="0" fill="#6366f1" transform="rotate(270 12 12)">
                                        <animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s"
                                                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                 repeatCount="indefinite" values="0;2;0;0"/>
                                    </circle>
                                    <circle cx="12" cy="2" r="0" fill="#6366f1" transform="rotate(315 12 12)">
                                        <animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s"
                                                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                 repeatCount="indefinite" values="0;2;0;0"/>
                                    </circle>
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#6366f1"
                                          d="M4.128 6.964c-.62-1.899 1.358-3.603 3.145-2.71L42.757 21.99c1.658.83 1.658 3.196 0 4.025L7.273 43.752c-1.787.893-3.765-.812-3.145-2.71l5.557-17.04L4.128 6.965Zm7.78 18.289L6.69 41.248l34.501-17.245L6.69 6.757l5.217 15.996H28.75a1.25 1.25 0 0 1 0 2.5H11.907Z"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-items-center items-center pt-2 pb-2">
                    <button
                        className="inline-flex text-sm text-color-info-light hover:text-blue-600 sm:p-2"
                        onClick={() => {
                            clearHistory();
                        }}
                    >
                        {clearHisBtnName}
                    </button>
                </div>
            </div>
        </div>
    );
};