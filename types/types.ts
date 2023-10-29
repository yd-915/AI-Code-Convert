export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  option: string;
  outputNaturalLanguage: string;
}

export interface ChatBody {
  inputCode: string;
  outputNaturalLanguage: string;
  chatHistory?: ChatMsg[];
}

export interface ChatMsg {
  role: string;
  content: string;
}
