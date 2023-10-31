import { TranslateBody } from '@/types/types';
import { OpenAIStream } from '@/utils';
import CryptoJS from "crypto-js";

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { inputLanguage, outputLanguage, inputCode, option, outputNaturalLanguage,secret,random } =
      (await req.json()) as TranslateBody;

    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || 'secret';
    const bytes = CryptoJS.AES.decrypt(secret, secretKey);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    if (decryptedValue === random) {
      console.info("valid random :", random)
      const stream = await OpenAIStream(
          inputLanguage,
          outputLanguage,
          inputCode,
          option,
          outputNaturalLanguage,
      );
      return new Response(stream);
    } else {
      throw new Error('Invalid value translate');
    }
  } catch (error: any) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
