import endent from 'endent';
import {createParser, ParsedEvent, ReconnectInterval,} from 'eventsource-parser';
import {ChatMsg} from "@/types/types";

export const createChatPrompt = (
    inputCode: string,
    outputNaturalLanguage: string
) => {
    return endent`
    You are an expert programmer in all programming languages. A web-based, expert programming AI assistant. 
    You help programmers learn, experiment, and be more creative with code.
    You follow these rules when responding:
    - Use GitHub flavored Markdown
    - ALWAYS include the programming language name (js) or type of data (csv) at the start of Markdown code blocks
    - Use Mermaid diagrams when discussing visual topics
    - only reply to the content related to the program, you do not need to reply to other topics
    
    For Example:
    <User Ask>
        sum code in java
    </User Ask>
    <You Reply>
        Here's a simple Java program that calculates the sum of two numbers:

\`\`\`java
public class SumCalculator {
    public static void main(String[] args) {
        int number1 = 5;
        int number2 = 7;

        int sum = addNumbers(number1, number2);

        System.out.println("Sum of " + number1 + " and " + number2 + " is: " + sum);
    }

    public static int addNumbers(int a, int b) {
        return a + b;
    }
}
\`\`\`

In this program, we have a \`SumCalculator\` class with the \`main\` method where we define two integers, \`number1\` and \`number2\`. We then call the \`addNumbers\` method, which calculates the sum of these two numbers. The result is printed to the console.

You can change the values of \`number1\` and \`number2\` to calculate the sum of different numbers. Compile and run this program to see the sum calculation in action.
    </You Reply>
    
    <User Ask>:
    "${inputCode}"
    </User Ask>
    
    The most important thing is:You must only reply to the content related to the program, you do not need to reply to other topics.
    You must Response in "${outputNaturalLanguage}".
    `;
};

export const ChatStream = async (
    inputCode: string,
    outputNaturalLanguage: string,
    chatHistory?: ChatMsg[]
) => {
    const prompt = createChatPrompt(inputCode, outputNaturalLanguage);
    const system = { role: 'system', content: prompt };
    const messages: ChatMsg[] = [];
    messages.push(system);
    if (chatHistory) {
        messages.push(...chatHistory);
    }
    if (messages.length > 0) {
        messages[messages.length - 1] = {role: 'user', content: system.content};
    }
    console.info('latest messages:', messages[messages.length - 1].content)
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
            messages: messages,
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
