import React from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { RiFileCopyLine } from 'react-icons/ri';

const LanguageNameBadge = ({ language }) => {
  if (!language) return null;

  // Not displaying the language name when it's js
  if (language === 'javascript' || language === 'js') return null;

  const LANGUAGE_NAME_ALIAS = {
    html: 'HTML',
  };

  return (
    <div className="ml-4 rounded-b-md bg-noc-400 px-2 py-0.5 text-xs text-white">
      {LANGUAGE_NAME_ALIAS[language] || language}
    </div>
  );
};

const Codesplit = (props) => {
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);

  const containsBlank = !!props['data-contains-blank'];

  // Prevent copy feature when:
  // the snippet contains blanks and the answer is not visible
  const preventCopy = containsBlank && !isAnswerVisible;

  const toggleAnswerHiddenStatus = () => {
    setIsAnswerVisible((lastState) => !lastState);
  };

  const copyRaw = () => {
    if (preventCopy) return;
    if (isCopied) return;
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;

    navigator.clipboard.writeText(props['data-raw']);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div
      className={`pt-0 ${props.className} ${isAnswerVisible ? 'is-answer-visible' : ''}`}
    >
      <div className="flex items-start justify-between">
        <LanguageNameBadge language={props['data-code-language']} />

        <div className="ml-auto hidden sm:flex">
          {containsBlank && (
            <button
              className="flex items-center rounded px-2.5 py-1.5 text-xs font-semibold hover:bg-gray-300"
              onClick={toggleAnswerHiddenStatus}
            >
              {isAnswerVisible ? (
                <>
                  <HiOutlineEyeOff className="h-4 w-4" />
                  <span className="ml-1">Hide Answer</span>
                </>
              ) : (
                <>
                  <HiOutlineEye className="h-4 w-4" />
                  <span className="ml-1">Reveal Answer</span>
                </>
              )}
            </button>
          )}

          <button
            className={`first-letter relative flex items-center rounded px-2.5 py-1.5 text-xs font-semibold 
              ${preventCopy ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-300'}`}
            onClick={copyRaw}
          >
            <div
              className={`absolute inset-0 flex items-center justify-center rounded bg-noc-400 text-white transition-opacity ${isCopied ? 'opacity-100' : 'opacity-0'}`}
            >
              Copied!
            </div>
            <RiFileCopyLine className="h-4 w-4" />
            <span className="ml-1">Copy</span>
          </button>
        </div>
      </div>

      {props.children}
    </div>
  );
};

export default Codesplit;
