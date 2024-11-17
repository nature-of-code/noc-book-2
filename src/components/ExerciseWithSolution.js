import React from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { HiOutlineLink } from 'react-icons/hi';

const ExerciseWithSolution = (props) => {
  const childrenWithoutP5Solution = props.children.filter(
    (child) => !child.props?.className?.includes('p5-solution'),
  );
  const solutions = childrenWithoutP5Solution.filter((child) => {
    return child.props?.className?.includes('solution');
  });

  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);

  const toggleAnswerHiddenStatus = () => {
    setIsAnswerVisible((lastState) => !lastState);
  };

  return (
    <div
      className={`callout relative ${isAnswerVisible ? 'is-answer-visible' : ''}`}
    >
      {/* bottons group on the top right */}
      <div className="absolute right-0 top-0 hidden sm:flex">
        {solutions.length && (
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

        {props.p5EditorUrl && (
          <a
            className="flex items-center rounded px-2.5 py-1.5 text-xs font-semibold text-gray-700 no-underline hover:bg-gray-300"
            target="_blank"
            rel="noopener noreferrer"
            href={props.p5EditorUrl}
          >
            <HiOutlineLink className="h-4 w-4" />
            <span className="ml-1">Suggested Answer</span>
          </a>
        )}
      </div>

      {childrenWithoutP5Solution}
    </div>
  );
};

export default ExerciseWithSolution;
