import React, {useEffect, useState} from 'react';
import {LanguageSelect} from "@/components/LanguageSelect";
import {NaturalLanguageSelect} from "@/components/NaturalLanguageSelect";
import {TextBlock} from "@/components/TextBlock";
import {TranslateBody} from "@/types/types";
import {ChatMsgBlock} from "@/components/ChatMsgBlock";
import {CodeBlock} from "@/components/CodeBlock";

export const MainCode = () => {
    const [option, setOption] = useState('');
    const [inputLanguage, setInputLanguage] = useState<string>('Natural Language');
    const [outputLanguage, setOutputLanguage] = useState<string>('-- Select --');
    const [outputNaturalLanguage, setOutputNaturalLanguage] = useState<string>('English');
    const [inputCode, setInputCode] = useState<string>('');
    const [convertBtnName, setConvertBtnName] = useState<string>('Generate');
    const [outputCode, setOutputCode] = useState<string>(
        `# **Usage instructions**  :
Enter your question or code in the input box below, then click the button you want to execute.

## For example input: sum code in java;
Here's a simple Java program that calculates and prints the sum:
\`\`\`java
int sum = 0;
for (int i = 1; i <= 10; i++) {
  sum += i;
}
System.out.println("The sum is: " + sum);
\`\`\`

`);
    const [loading, setLoading] = useState<boolean>(false);
    const [userConvert, setUserConvert] = useState<boolean>(false);
    const [userAsk, setUserAsk] = useState<boolean>(false);
    const [userDebug, setUserDebug] = useState<boolean>(false);
    const [userOptimize, setUserOptimize] = useState<boolean>(false);
    const [userExplain, setUserExplain] = useState<boolean>(false);
    const [hasTranslated, setHasTranslated] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const resetOtherOption = () => {
        setUserConvert(false);
        setUserAsk(false);
        setUserDebug(false);
        setUserOptimize(false);
        setUserExplain(false);
    };

    const handleTranslate = async (userAsk: boolean, option: string) => {
        // window.scrollTo(0, 180);
        const maxCodeLength = 30000;

        if (!inputCode) {
            alert('Please enter some code.');
            return;
        }

        if(outputLanguage === '-- Select --') {
            alert('Please select the program languages you want to.');
            return;
        }

        if (inputLanguage === outputLanguage) {
            alert('Please select different languages.');
            return;
        }

        if (inputCode.length > maxCodeLength) {
            alert(
                `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
            );
            return;
        }

        setLoading(true);
        setOutputCode('');

        const controller = new AbortController();
        const body: TranslateBody = {
            inputLanguage,
            outputLanguage,
            inputCode,
            option,
            outputNaturalLanguage
        };

        const response = await fetch('/api/translate', {
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
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);

            code += chunkValue;

            setOutputCode((prevCode) => prevCode + chunkValue);
        }

        setLoading(false);
        setHasTranslated(true);
        resetOtherOption();
    };
    useEffect(() => {
        if(inputLanguage === 'Natural Language') {
            setConvertBtnName('Convert');
        } else {
            setConvertBtnName('Convert');
        }
    }, [inputLanguage]);
    return (
        <div className="flex h-full items-center justify-center background-color text-neutral-100 px-2">
            <div className="flex-row items-center justify-center w-full md:w-3/5 lg:w-3/5">
                <div className="flex h-full flex-col justify-center">
                    <div>
                        <div className="mt-1 mb-2 flex space-x-2">
                            <div className="text-center text-lg font-semibold text-color-info-light">TO</div>
                            <div className="flex-1">
                                <LanguageSelect
                                    language={outputLanguage}
                                    onChange={(value) => {
                                        setOutputLanguage(value);
                                        setOutputCode('');
                                    }}
                                />
                            </div>
                            <div>
                                <NaturalLanguageSelect
                                    language={outputNaturalLanguage}
                                    onChange={(value) => {
                                        setOutputNaturalLanguage(value);
                                    }}
                                />
                            </div>
                        </div>
                        {edit ? (
                            <CodeBlock code={outputCode} />
                        ) : (
                            <ChatMsgBlock code={outputCode} user = {false} />
                        )}
                        <button className="text-right w-full text-sm text-color-info-light hover:text-blue-500" onClick={()=> setEdit(!edit)}>
                            {edit ? (
                                <svg className="inline-block" width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" stroke="#3b82f6" strokeLinejoin="round" strokeWidth="4">
                                        <path d="M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z"/>
                                        <path d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"/>
                                    </g>
                                </svg>
                                ) : (
                                <svg className="inline-block" width="24" height="24" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#3b82f6" d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"/>
                                    <path fill="#3b82f6" d="m469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"/>
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="mt-8 flex flex-col justify-center">
                        <LanguageSelect
                            language={inputLanguage}
                            onChange={(value) => {
                                setInputLanguage(value);
                                setHasTranslated(false);
                            }}
                        />
                        <TextBlock
                            text={inputCode}
                            editable={!loading}
                            onChange={(value) => {
                                setInputCode(value);
                                setHasTranslated(false);
                            }}
                        />
                    </div>
                    <div className="mt-2 flex items-center space-x-1 flex-wrap justify-center">
                        <button
                            className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#4c81ec] px-4 py-2 font-semibold hover:bg-blue-600 active:bg-blue-700"
                            onClick={() => {
                                setOption('convert');
                                setUserConvert(true);
                                handleTranslate(false, 'convert');
                            }}
                            disabled={loading}
                        >
                            {loading && userConvert ? 'Loading' : convertBtnName}
                        </button>
                        <button
                            className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#6269e7] hover:bg-blue-600 px-4 py-2 font-semibold"
                            onClick={() => {
                                setOption('ask');
                                setUserAsk(true);
                                handleTranslate(true, 'ask');
                            }}
                            disabled={loading}
                        >
                            {loading && userAsk ? 'Loading' : 'Ask'}
                        </button>
                        <button
                            className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#6156ff] hover:bg-blue-600 px-4 py-2 font-semibold"
                            onClick={() => {
                                setOption('debug');
                                setUserDebug(true);
                                handleTranslate(true, 'debug');
                            }}
                            disabled={loading}
                        >
                            {loading && userDebug ? 'Loading' : 'Debug'}
                        </button>
                        <button
                            className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#8262ec] hover:bg-[#9b5eed] to-red-400 px-4 py-2 font-semibold"
                            onClick={() => {
                                setOption('optimize');
                                setUserOptimize(true);
                                handleTranslate(true, 'optimize');
                            }}
                            disabled={loading}
                        >
                            {loading && userOptimize ? 'Loading' : 'Optimize'}
                        </button>
                        <button
                            className="mt-2 w-[110px] cursor-pointer rounded-full bg-[#9b5eed] hover:bg-[#c856e5] px-4 py-2 font-semibold"
                            onClick={() => {
                                setOption('explain');
                                setUserExplain(true);
                                handleTranslate(true, 'explain');
                            }}
                            disabled={loading}
                        >
                            {loading && userExplain ? 'Loading' : 'Explain'}
                        </button>
                        <a href="https://ko-fi.com/audi_guzz" className="mt-2 px-2 bg-[#f6db4b] cursor-pointer rounded-full mr-4 py-1">
                            <div className="flex justify-center items-center">
                                <p className="ml-2 mr-2 text-black font-semibold">Buy me a Coffee</p>
                                <svg width="30" height="30" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#eab308" d="M208 80H32a8 8 0 0 0-8 8v48a96.3 96.3 0 0 0 32.54 72H32a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16h-24.54a96.59 96.59 0 0 0 27-40.09A40 40 0 0 0 248 128v-8a40 40 0 0 0-40-40Zm24 48a24 24 0 0 1-17.2 23a95.78 95.78 0 0 0 1.2-15V97.38A24 24 0 0 1 232 120ZM112 56V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Zm32 0V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Zm-64 0V24a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0Z"/>
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};