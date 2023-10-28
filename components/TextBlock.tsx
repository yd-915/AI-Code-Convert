import React, { useState, useEffect, useRef } from 'react';

interface Props {
  text: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const TextBlock: React.FC<Props> = ({
  text,
  editable = false,
  onChange = () => {},
}) => {
    const [internalText, setInternalText] = useState(text);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
    const handleClear = () => {
        setInternalText('');
    };

    const handleTextAreaChange = () => {
        if (textAreaRef.current) {
            const { scrollHeight, clientHeight, rows } = textAreaRef.current;
            const minRows = 2;
            const maxRows = 10;
            textAreaRef.current.rows = minRows; // Reset rows to the minimum

            while (textAreaRef.current.scrollHeight > textAreaRef.current.clientHeight && textAreaRef.current.rows < maxRows) {
                textAreaRef.current.rows += 1;
            }
        }
    };

    const handleChange = (newValue: string) => {
        setInternalText(newValue);
        onChange(newValue);
    };

    useEffect(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
            }
            if (textAreaRef.current) {
                textAreaRef.current.addEventListener('input', handleTextAreaChange);
            }
            return () => {
                if (textAreaRef.current) {
                    textAreaRef.current.removeEventListener('input', handleTextAreaChange);
                }
            };
            }, []
    );

    return (
        <div className="relative">
          <div>
            <textarea
              ref={textAreaRef}
              className="w-full bg-[#1A1B26] p-4 text-base text-neutral-200 focus:outline-none"
              value={internalText}
              rows={2}
              onChange={(e) => handleChange(e.target.value)}
              disabled={!editable}
              placeholder="Tip: sum code in Java"
            />
          </div>
          <button className="absolute top-0 right-0 z-10 rounded p-1 text-sm text-color-info-light"
            onClick={() => {
                handleClear();
            }}
          >Clear</button>
        </div>
  );
};