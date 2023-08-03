import { CodeBlock } from '@/components/CodeBlock';
import { LanguageSelect,languages } from '@/components/LanguageSelect';
import { TextBlock } from '@/components/TextBlock';
import { TranslateBody } from '@/types/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('Code Translator');
  const [subtitle, setSubtitle] = useState('Translate Code or Natural Language To Programming Language Code');
  const [inputLanguage, setInputLanguage] = useState<string>('Natural Language');
  const [outputLanguage, setOutputLanguage] = useState<string>('Python');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);

  const handleTranslate = async () => {
    const maxCodeLength = 16000;

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
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
      inputCode
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
    copyToClipboard(code);
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  useEffect(() => {
	  const isOutputLanguageInArray = languages.some(
	      (language) => language.value === outputLanguage
	  );
      if (hasTranslated && isOutputLanguageInArray) {
        handleTranslate();
      }
  }, [outputLanguage]);

  return (
    <>
      <Head>
        <title>AI Code Converter | AI Code Translator | AI Code Generator</title>
        <meta name="description" content="Use AI To Convert Code Or Generate Code From One Language To Another. AI Code Translator. Translate Code From Any Language To Another With A Click Of A Button."/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="keywords" content="AI Code Converter,Code Convert AI, Code Generate AI,Code Translator,AICodeHelper,free,online" />
		<link rel="canonical" href="https://aicodeconvert.com" />
        <link rel="icon" href="/code.png" />
		{/* Add the Google Analytics script tags here */}
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-Q03Q3VY7RV"></script>
		<script
		  dangerouslySetInnerHTML={{
			__html: `
			  window.dataLayer = window.dataLayer || [];
			  function gtag(){dataLayer.push(arguments);}
			  gtag('js', new Date());
			  gtag('config', 'G-Q03Q3VY7RV');
			`,
		  }}
		/>
		{/* baidu analytics */}
		<script src="/baidu-analytics.js" />
      </Head>
	  
	  <div className="h-100 flex justify-start items-center pl-10 pt-2 bg-[#0E1117]">
	  	<svg width="40" height="40" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
	  	    <path fill="#3b82f6" d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/>
	  	</svg>
	  	<h1 className="text-white font-bold text-2xl ml-1">
			<a href="https://aicodeconvert.com">AICodeConvert.com</a>
		</h1>
	  </div>
	  
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
		<div className="mt-2 flex flex-col items-center justify-center sm:mt-10">
          <h2 className="text-4xl font-bold"><span className="text-blue-500">AI</span> {title}</h2>
		  <h3 className="mt-5 text-xl text-center leading-2">{subtitle}</h3>
        </div>
		
        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">From</div>

            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => {
                setInputLanguage(value);
                setHasTranslated(false);
                // setInputCode('');
                // setOutputCode('');
              }}
            />

            {inputLanguage === 'Natural Language' ? (
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            ) : (
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            )}
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">TO</div>

            <LanguageSelect
              language={outputLanguage}
              onChange={(value) => {
                setOutputLanguage(value);
                setOutputCode('');
              }}
            />

            {outputLanguage === 'Natural Language' ? (
              <TextBlock text={outputCode} />
            ) : (
              <CodeBlock code={outputCode} />
            )}
          </div>
        </div>
		
		<div className="mt-5 text-center text-sm">
		  {loading
		    ? '...'// Generating
		    : hasTranslated
		    ? 'Output copied to clipboard!'
		    : 'Enter some code and click "Generate"'}
		</div>
		
		<div className="mt-5 flex items-center space-x-2">
		  <button
		    className="w-[140px] cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600 active:bg-blue-700"
		    onClick={() => handleTranslate()}
		    disabled={loading}
		  >
		    {loading ? 'Generating...' : 'Generate'}
		  </button>
		</div>
		<div id="git" className="flex justify-center mb-2 space-x-2 mt-4">
			<a href="https://base64.kr/en" className="text-gray cursor-pointer rounded-full">
				<div 
					className="items-center bg-repeat flex text-sm font-medium justify-center py-2 px-6 border border-solid rounded-full">
					<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					    <path fill="none" stroke="#6b7280" strokeLinecap="round" strokeWidth="1.5" d="m17 7.83l1.697 1.526c1.542 1.389 2.313 2.083 2.313 2.974c0 .89-.771 1.585-2.314 2.973L17 16.83M13.987 5L12 12.415l-1.987 7.415M7 7.83L5.304 9.356C3.76 10.745 2.99 11.44 2.99 12.33c0 .89.771 1.585 2.314 2.973L7 16.83"/>
					</svg>
					<p className="ml-2 text-white">Base64.kr</p>
				</div>
			</a>
		</div>
		<div id="git" className="flex justify-center mb-2 space-x-2 mt-2">
			<a href="https://github.com/JustAIGithub/AI-Code-Convert" className="text-gray cursor-pointer rounded-full">
				<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fill="#ffffff" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
				</svg>
			</a>
			<a href="https://twitter.com/AUDI_GUZZ" className="text-gray cursor-pointer rounded-full">
				<svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				    <path fill="#ffffff" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z"/>
				</svg>
			</a>
		</div>
	  </div>
    </>
  );
}
