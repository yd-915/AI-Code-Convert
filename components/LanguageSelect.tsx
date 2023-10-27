import type { FC } from 'react';
import { languages } from './Languages'

interface Props {
  language: string;
  onChange: (language: string) => void;
}

export const LanguageSelect: FC<Props> = ({ language, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <select
        className="flex-1 rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1F2937] text-color-info-light"
        value={language}
        onChange={handleChange}
      >
        {languages
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
      </select>
    </div>
  );
};
