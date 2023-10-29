import { ChatBody } from '@/types/types';
import { ChatStream } from "@/utils/chatUtil";

export const config = {
    runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
    try {
        const {inputCode, outputNaturalLanguage, chatHistory} = (await req.json()) as ChatBody;
        const stream = await ChatStream(
            inputCode,
            outputNaturalLanguage,
            chatHistory
        );
        return new Response(stream);
    } catch (error: any) {
        console.error(error);
        return new Response('Error', {status: 500});
    }
};

export default handler;
