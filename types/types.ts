import {scalarOptions} from "yaml";
import Str = scalarOptions.Str;

export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  option: string;
  outputNaturalLanguage: string;
  secret: string;
  random: string;
}

export interface ChatBody {
  inputCode: string;
  outputNaturalLanguage: string;
  chatHistory?: ChatMsg[];
  secret: string;
  random: string;
}

export interface ChatMsg {
  role: string;
  content: string;
}
