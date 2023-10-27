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
  
  const handleChange = (newValue: string) => {
    setInternalText(newValue);
    onChange(newValue);
  };
  
  useEffect(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }, []);

  return (
    <div className="relative">
	  <div>
	    <textarea
		  ref={textAreaRef}
	      className="w-full bg-[#1A1B26] p-4 text-base text-neutral-200 focus:outline-none"
          style={{
              minHeight: '100px',
              maxHeight: '400px',
          }}
	      value={internalText}
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