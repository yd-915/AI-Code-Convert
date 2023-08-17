import endent from 'endent';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
  option: string
) => {
  if(option === 'optimize') {
  	return endent`
  	  You will be provided with a piece of "${inputLanguage}" code, and your task is to provide ideas for efficiency improvements.
	  And at last, you should return the optimized code, And with detailed annotations that reflect optimisations.
	  
	  the code:
	  ${inputCode}
	  
  	 `;
  } else if (option === 'explain') {
    return endent`
      You will be provided with a piece of "${inputLanguage}" code, and your task is to explain it in a concise way.
	  
	  the code:
	  ${inputCode}
	  
     `;
  } else if (option === 'convert' && inputLanguage === 'Natural Language') {
    return endent`
    You are an expert programmer in all programming languages. Translate the natural language to "${outputLanguage}" code.
	Do not include \`\`\`.
	Given the prompt,generate the code,The code should be formatted for readability.And The code must be correct and the more detailed and complete it is the better.
    Example translating from natural language to JavaScript:

    Natural language:
    Print the numbers 0 to 9.

    JavaScript code:
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }

    Natural language:
    ${inputCode}

    ${outputLanguage} code (no \`\`\`):
    `;
  } else {
    return endent`
      You are an expert programmer in all programming languages. Translate the "${inputLanguage}" code to "${outputLanguage}" code. 
	  Do not include \`\`\`.
	  Given the prompt,generate the code,The code should be formatted for readability.And The code must be correct and the more detailed and complete it is the better.
      Example translating from JavaScript to Python:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Python code:
      for i in range(10):
        print(i)
      
      ${inputLanguage} code:
      ${inputCode}

      ${outputLanguage} code (no \`\`\`):
     `;
  }
};

export const OpenAIStream = async (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
  option: string
) => {
	const prompt = createPrompt(inputLanguage, outputLanguage, inputCode, option);

	const system = { role: 'system', content: prompt };
	console.info('system : ', system);
	// use openai 
	const url = "https://api.openai.com/v1/chat/completions";
	const apiKeysString = process.env.NEXT_PUBLIC_OPENAI_API_KEY_ARRAY || "";
	const keyArray = apiKeysString.split(',');
	const model = "gpt-3.5-turbo-16k";

	const getNextApiKey = () => {
		const now = new Date();
		const seconds = Math.floor(now.getTime() / 1000);
		let currentKeyIndex = seconds % keyArray.length;
		let curKey = keyArray[currentKeyIndex];
		console.info(`use key: ${curKey}, keyIndex: ${currentKeyIndex}`);
		return curKey;
	};
	const key = getNextApiKey();
  // use fake
  // const url = "https://ai.fakeopen.com/v1/chat/completions";
  // const key = "pk-this-is-a-real-free-pool-token-for-everyone";
  // const model = "gpt-4";
  // use api2d
  // const url = "https://oa.api2d.net/v1/chat/completions";
  // const key = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  // const model = "gpt-3.5-turbo-16k";
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: [system],
      temperature: 0,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenAI API returned an error: ${
        decoder.decode(result?.value) || statusText
      }`,
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
