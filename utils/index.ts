import endent from 'endent';
import { OPTIONS } from '@/components/CommonUtils'
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
  option: string,
  outputNaturalLanguage: string
) => {
  if(option === OPTIONS.OPTIMIZE) {
  	return endent`
	  You are an expert programmer in all programming languages. Especially good at "${outputLanguage}" language code.
  	  You will be provided with a piece of "${inputLanguage}" code, and your task is to provide ideas for efficiency improvements.
	  And at last, you should return the optimized code, And with detailed annotations that reflect optimisations.
	  
	  <The "${inputLanguage}" code>:
	  ${inputCode}.
	  </The "${inputLanguage}" code>
	  
	  The most important thing is:You must only reply to the content related to the program, you do not need to reply to other topics.
	  You must Response in "${outputNaturalLanguage}".
  	 `;
  } else if (option === OPTIONS.EXPLAIN) {
    return endent`
	  You are an expert programmer in all programming languages. Especially good at "${outputLanguage}" language code.
      You will be provided with a piece of "${inputLanguage}" code, and your task is to explain it.
	  You only reply to the content related to the program, you do not need to reply to other topics；
	  
	  Example Explain the code in Java Program;
	  
	  <The Next code>
	  import { NextApiHandler } from 'next'
	  import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
	  const handler: NextApiHandler = async (req, res) => {
	    const { code } = req.query
	    if (code) {
	      const supabase = createPagesServerClient({ req, res })
	      await supabase.auth.exchangeCodeForSession(String(code))
	    }
	    res.redirect('/')
	  }
	  export default handler
	  </The Next code>
	  
	  <The explain>:
	  This code is a Next.js API route handler responsible for handling the OAuth 2.0 authorization code exchange process. Let's break down the code step by step:
	  1. First, it imports the necessary modules and dependencies:
	     - \`NextApiHandler\` is a type defined in Next.js used to handle API requests.
	     - \`createPagesServerClient\` is a function used to create a Supabase client for server-side authentication.
	     - \`req\` and \`res\` are the request and response objects in Next.js, used for handling HTTP requests and responses.
	  2. It defines an asynchronous function named \`handler\`, which serves as a Next.js API route handler. This handler is responsible for processing the authorization code received from the client and exchanging it for a user session.
	  3. It extracts the \`code\` query parameter from the request object \`req\`. This parameter typically contains the authorization code obtained during the OAuth 2.0 authorization process.
	  4. Next, it checks if the \`code\` parameter exists to determine whether the code exchange is required. If it exists, it implies that the user has obtained an authorization code from an identity provider (e.g., Google, Facebook).
	  5. It uses the \`createPagesServerClient({ req, res })\` function to create a Supabase client specifically designed for server-side operations. The \`req\` and \`res\` parameters are passed to this function, allowing the Supabase client to handle server-related requests and responses.
	  6. The code then executes the authorization code exchange operation using \`await supabase.auth.exchangeCodeForSession(String(code))\`. This line sends the authorization code as a parameter to the \`exchangeCodeForSession\` method, and it waits for Supabase to complete the validation and exchange process.
	  7. Finally, it redirects the user back to the application's main page using \`res.redirect('/')\`. This means that, after successfully completing the authorization code exchange, the user will be redirected to the main page with a valid user session, enabling them to perform authenticated and authorized actions.
	  In summary, this code is a Next.js API route handler responsible for the OAuth 2.0 authorization code exchange operation. Its purpose is to ensure that users obtain a valid authentication session, allowing them to perform protected actions within the application.
	  </The explain>
	  
	  <The "${inputLanguage}" code>:
	  ${inputCode}.
	  </The "${inputLanguage}" code>
	  
	  The most important thing is:You must only reply to the content related to the program, you do not need to reply to other topics.
	  You must Response in "${outputNaturalLanguage}".
	  
	  <The explain>:
	  
     `;
  } else if (option === OPTIONS.ASK) {
	  return endent`
	  You are an expert programmer in all programming languages..
	  I want you to act as a code expert, please help me by giving code to solve my problem, 
	  you should use your knowledge of computer science, network infrastructure and IT security to solve my problem. 
	  It will be helpful to use smart, simple and easy to understand language suitable for all levels of people in your answer, 
	  it is helpful to explain your solution step by step with bullet points, 
	  try to avoid too many technical details but use them when necessary, 
	  I would like you to reply with the solution instead of writing any explanation, 
	  
	  For Example :
	  <Question>:
	  what is JavaScript?
	  </Question>
	  <Answer>:
	  JavaScript is a widely used programming language that was originally developed to provide interactive functionality in web browsers. It is a high-level, interpreted programming language that is widely used in web development.JavaScript can perform the following functions:
1. user interface interaction: JavaScript can respond to user actions (e.g., clicking buttons, typing text, etc.) to provide a dynamic and interactive experience for a website.
2. data validation: JavaScript can perform form validation on the client side to ensure the validity of data and reduce the burden on the server.
3. asynchronous communication: JavaScript can implement asynchronous requests (such as AJAX requests) to communicate with the server without refreshing the entire page to obtain and submit data.
4. animation and visual effects: JavaScript can create a variety of animation effects to make web pages more attractive.
To get started with JavaScript, you need to be familiar with basic syntax such as variables, conditional statements, loops, functions, etc. You can use a variety of popular JavaScript libraries. You can use various popular JavaScript libraries such as jQuery, React or Angular to simplify the development process.

JavaScript example:

\`\`\`javascript
// Define variables
var number = 7; // Conditional statement.

// Conditional statement
if (number % 2 == 0) {
    console.log("This is an even number"); } else {
} else {
    console.log("It's an odd number"); } else {
}

// Loop
for (var i = 0; i < 10; i++) {
    console.log(i); }
}

// Functions
function greet(name) {
    console.log("Hello, " + name); // function greet(name) { console.log(name) { console.log(name); }
}

// Call the function
greet("Zhangsan"); } // call function
\`\`
</Answer>
	 
	  here is the information about my technical problem in "${outputLanguage}" :
	  <Question in "${outputLanguage}">:
	  ${inputCode}.
	  </Question in "${outputLanguage}">
	  
	  The most important thing is:You must only reply to the content related to the program, you do not need to reply to other topics.
      You must Response in "${outputNaturalLanguage}".
      
      Answer:
	  `;
  } else if (option === OPTIONS.DEBUG) {
	  return endent`
	  You are an expert programmer in all programming languages. Especially good at "${outputLanguage}" language code.
	  give you a following code，and Please help debug the following code, analyse and point out the problem, and give debugging suggestions and improvement methods.
	  You only reply to the content related to the program, you do not need to reply to other topics.
	  
	  For Example:
	  
	  <Python Code>:
	  def add(a, b):  
	     return a + b
	  result = add(1, 2)
	  </Python Code>
	  
	  <Debug>:
	  The code itself is fine, it's a simple Python function to calculate the sum of two numbers. Here's the code:
	  \`\`\`python  
	  def add(a, b):  
	     return a + b
	  result = add(1, 2)  
	  \`\`\`
	  But if you want to output the result after the code, you need to use the \`print\` function. The correct code should be:
	  \`\`\`python  
	  def add(a, b):  
	     return a + b
	  result = add(1, 2)  
	  print(result)  
	  \`\`\`
	  After modifying the code like this, when you run the code, it will output the result "3".
	  </Debug>
	  
	  <${outputLanguage} Code>:
	  ${inputCode}.
	  <${outputLanguage} /Code>
	  
	  The most important thing is:You must only reply to the content related to the program, you do not need to reply to other topics.
	  You must Response in "${outputNaturalLanguage}".
	  
	  <Debug>:
	  
	  `;
  } else {
    return endent`
    You are an expert programmer in all programming languages. 
	Especially good at "${outputLanguage}" language code.
	Please help me by giving code to solve my problem.
	You should use your knowledge of computer science, network infrastructure and IT security to solve my problem. 
	Translate the "${inputLanguage}" to "${outputLanguage}" code.
    
    Given the prompt,generate the code,The code should be formatted for readability.And The code must be correct、efficiency、improvement and the more detailed and complete it is the better.
    Example translating from Natural Language to JavaScript:
    
    <Natural Language>
    Print the numbers 0 to 9.
    </Natural Language>
    
    <The JavaScript Code>
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }
    </The JavaScript Code>
    
    <"${inputLanguage}">
    ${inputCode}.
    </"${inputLanguage}">
    
    The most important thing is:You must only reply to the content related to the program, you do not need to reply to other topics.
    You must Response in "${outputNaturalLanguage}".Only return the Code. And in markdown.
    
    The ${outputLanguage} Code:
    `;
  }
};

export const OpenAIStream = async (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
  option: string,
  outputNaturalLanguage: string
) => {
	const prompt = createPrompt(inputLanguage, outputLanguage, inputCode, option, outputNaturalLanguage);

	const system = { role: 'system', content: prompt };
	console.info('option :', option, 'inputLanguage :', inputLanguage, 'outputLanguage :', outputLanguage, ',inputCode :', inputCode);
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
