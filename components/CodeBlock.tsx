import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import {vscodeDark} from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { FC, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({
  code,
  editable = true,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState<string>('Copy');

  const handleDownload = () => {
      const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `code.md`);
  };
  
  const handleCoffee = () => {
	  window.open("https://ko-fi.com/audi_guzz");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <div className="relative">
      <button
        className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-sm text-color-info-light hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
        {copyText}
      </button>
      <CodeMirror
		className="text-base"
        editable={editable}
        value={code}
		height="auto"
        minHeight="240px"
        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
        theme={vscodeDark}
		indentWithTab={true}
        onChange={(value) => onChange(value)}
      />
	<button
		className="absolute right-0 bottom-[-4] z-10 rounded p-1 text-sm text-color-info-light"
		onClick={handleDownload}>Download Code</button>
    </div>
  );
};
