import { ChatBody } from '@/types/types';
import { ChatStream } from "@/utils/chatUtil";
import CryptoJS from "crypto-js";

export const config = {
    runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
    try {
        const {inputCode, outputNaturalLanguage, chatHistory, secret ,random } = (await req.json()) as ChatBody;
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || 'secret';
        const bytes = CryptoJS.AES.decrypt(secret, secretKey);
        const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedValue === random) {
            const stream = await ChatStream(
                inputCode,
                outputNaturalLanguage,
                chatHistory
            );
            return new Response(stream);
        } else {
            throw new Error('Invalid value chat');
        }
    } catch (error: any) {
        console.error(error);
        return new Response('Error', {status: 500});
    }
};

export default handler;
