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
      alert('OpenAI key has expired.');
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
	
	  const currentPath = window.location.pathname;
	  const convertRegex = /^\/convert-code-from-(\w+)-to-(\w+)$/;
	  const translateRegex = /^\/translate-code-from-(\w+)-to-(\w+)$/;
	  const generateRegex = /^\/generate-code-from-(\w+)-to-(\w+)$/;

	  let fromLang = '';
	  let toLang = '';
	  let preName = '';
	  let preAction = '';
	  if (convertRegex.test(currentPath)) {
		const match = currentPath.match(convertRegex);
		if (match) {
		  fromLang = match[1];
		  toLang = match[2];
		  preName = 'Code Convertor';
		  preAction = 'Convert';
		}
	  } else if (translateRegex.test(currentPath)) {
		const match = currentPath.match(translateRegex);
		if (match) {
		  fromLang = match[1];
		  toLang = match[2];
		  preName = 'Code Translator';
		  preAction = 'Translate';
		}
	  } else if(generateRegex.test(currentPath)) {
		  const match = currentPath.match(translateRegex);
		  if (match) {
		    fromLang = match[1];
		    toLang = match[2];
		    preName = 'Code Generator';
		    preAction = 'Generate';
		  }
	  }

	  if (fromLang && toLang) {
		setTitle(`${preName}`);
		setSubtitle(`${preAction} Code From ${fromLang} To ${toLang} Online Free With AI`);
	  } else {
		// 如果路径不匹配任何前缀，则设置默认文本内容
		setTitle('Code Translator');
		setSubtitle('Translate Code or Natural Language To Programming Language Code');
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
	  	<h1 className="text-white font-bold text-2xl"><span className="text-blue-500 ml-2">AI</span>CodeConvert.com</h1>
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
			<a href="https://base64.kr" className="text-gray cursor-pointer rounded-full">
				<div 
					className="items-center bg-repeat flex text-sm font-medium justify-center py-2 px-6 border border-solid rounded-full">
					<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					    <path fill="none" stroke="#6b7280" strokeLinecap="round" strokeWidth="1.5" d="m17 7.83l1.697 1.526c1.542 1.389 2.313 2.083 2.313 2.974c0 .89-.771 1.585-2.314 2.973L17 16.83M13.987 5L12 12.415l-1.987 7.415M7 7.83L5.304 9.356C3.76 10.745 2.99 11.44 2.99 12.33c0 .89.771 1.585 2.314 2.973L7 16.83"/>
					</svg>
					<p className="ml-2 text-white">Visit Base64.kr</p>
				</div>
			</a>
			<a href="https://spokengpt.com" className="text-gray-500 cursor-pointer rounded-full">
				<div 
					className="items-center bg-repeat flex text-sm font-medium justify-center py-2 px-6 border border-solid rounded-full">
					<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					    <path fill="none" stroke="#0ea5e9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16M8 9v6m12-5v4M4 10v4m12-7v10"/>
					</svg>
					<p className="ml-2 text-white">Visit SpokenGPT</p>
				</div>
			</a>
		</div>
		<div id="git" className="flex justify-center mb-4 space-x-2 mt-2">
			<a href="https://github.com/JustAIGithub/AI-Code-Convert" className="text-gray cursor-pointer rounded-full">
				<div 
					className="items-center bg-repeat flex text-sm font-medium justify-center py-2 px-6 border border-solid rounded-full">
					<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					    <path fill="#ffffff" d="M5.884 18.653c-.3-.2-.558-.456-.86-.816a50.59 50.59 0 0 1-.466-.579c-.463-.575-.755-.841-1.056-.95a1 1 0 1 1 .675-1.882c.752.27 1.261.735 1.947 1.588c-.094-.117.34.427.433.539c.19.227.33.365.44.438c.204.137.588.196 1.15.14c.024-.382.094-.753.202-1.096c-2.968-.725-4.648-2.64-4.648-6.396c0-1.238.37-2.355 1.058-3.291c-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.583c.081-.024.127-.034.208-.047c.803-.123 1.937.17 3.415 1.097a11.731 11.731 0 0 1 2.687-.308c.912 0 1.819.103 2.684.308c1.477-.933 2.614-1.227 3.422-1.097c.085.014.158.032.218.051a1 1 0 0 1 .616.58c.487 1.215.52 2.296.302 3.19c.691.936 1.058 2.045 1.058 3.292c0 3.758-1.674 5.666-4.642 6.393c.125.415.19.878.19 1.38c0 .664-.002 1.299-.007 2.01c0 .19-.002.394-.005.706a1 1 0 0 1-.018 1.957c-1.14.228-1.984-.532-1.984-1.524l.002-.447l.005-.705c.005-.707.008-1.338.008-1.997c0-.697-.184-1.152-.426-1.361c-.661-.57-.326-1.654.541-1.751c2.966-.334 4.336-1.483 4.336-4.66c0-.955-.312-1.745-.913-2.405a1 1 0 0 1-.189-1.044c.166-.415.236-.957.095-1.614l-.01.002c-.491.14-1.11.44-1.858.95a1 1 0 0 1-.833.135a9.626 9.626 0 0 0-2.592-.35c-.89 0-1.772.12-2.592.35a1 1 0 0 1-.829-.133c-.753-.507-1.374-.807-1.87-.947c-.143.653-.072 1.194.093 1.607a1 1 0 0 1-.189 1.044c-.597.656-.913 1.459-.913 2.404c0 3.172 1.371 4.33 4.322 4.66c.865.098 1.202 1.178.545 1.749c-.193.167-.43.732-.43 1.364v3.149c0 .986-.834 1.726-1.96 1.529a1 1 0 0 1-.04-1.963v-.99c-.91.062-1.661-.087-2.254-.484Z"/>
					</svg>
					<p className="ml-2 text-white">Star On Github</p>
				</div>
			</a>
		</div>
	  </div>
    </>
  );
}
