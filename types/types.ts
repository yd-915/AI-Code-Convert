export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  option: string;
}

export interface TranslateResponse {
  code: string;
}
