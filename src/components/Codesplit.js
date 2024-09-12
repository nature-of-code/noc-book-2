import React from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { RiFileCopyLine } from 'react-icons/ri';

const LANGUAGE_NAME_MAP = {
  javascript: 'JavaScript',
  html: 'HTML',
};

const Codesplit = (props) => {
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);

  const toggleAnswerHiddenStatus = () => {
    setIsAnswerVisible((lastState) => !lastState);
  };

  const copyRaw = () => {
    if (isCopied) return;
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;

    navigator.clipboard.writeText(props['data-raw']);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const displayedLanguageName =
    LANGUAGE_NAME_MAP[props['data-code-language']] ||
    props['data-code-language'];

  const containsBlank = !!props['data-contains-blank'];

  return (
    <div
      className={`pt-0 ${props.className} ${isAnswerVisible ? 'is-answer-visible' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="ml-4 rounded-b-md bg-noc-400 px-2 py-0.5 text-xs text-white">
          {displayedLanguageName}
        </div>

        <div className="hidden sm:flex">
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
            className="relative flex items-center rounded px-2.5 py-1.5 text-xs font-semibold hover:bg-gray-300"
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
