import React from 'react';
import { FiPlay, FiPause, FiRefreshCw, FiExternalLink } from 'react-icons/fi';

const Example = (data) => {
  const ref = React.useRef(null);
  const [isLooping, setIsLooping] = React.useState(true);

  const applyStyle = () => {
    if (ref.current) {
      const p5Window = ref.current.contentWindow;
      p5Window.document.body.style.margin = '0';
      p5Window.document.body.style.overflow = 'hidden';
    }
  };

  const resetP5 = () => {
    if (ref.current) {
      const p5Window = ref.current.contentWindow;
      p5Window.location.reload();
      setIsLooping(true);
    }
  };

  const toggleLoop = () => {
    if (ref.current) {
      const p5Window = ref.current.contentWindow;
      if (isLooping) {
        p5Window.noLoop();
        setIsLooping(false);
      } else {
        p5Window.loop();
        setIsLooping(true);
      }
    }
  };

  return (
    <div className="not-prose my-8 max-w-fit">
      <div className="group relative">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-3 absolute top-4 right-4">
          <button
            className="flex items-center px-2 py-1 text-sm bg-gray-200 hover:bg-gray-100 rounded border border-gray-800"
            onClick={toggleLoop}
          >
            {isLooping ? (
              <>
                <FiPause className="h-3 w-3" />
                <span className="ml-1">Pause</span>
              </>
            ) : (
              <>
                <FiPlay className="h-3 w-3" />
                <span className="ml-1">Play</span>
              </>
            )}
          </button>

          <button
            className="flex items-center px-2 py-1 text-sm bg-gray-200 hover:bg-gray-100 rounded border border-gray-800"
            onClick={resetP5}
          >
            <FiRefreshCw className="h-3 w-3" />
            <span className="ml-1.5">Reset</span>
          </button>
        </div>

        <iframe
          ref={ref}
          className="shadow rounded border-none max-w-full w-[640px] h-[360px]"
          onLoad={applyStyle}
          loading="lazy"
          src={`/${data['data-example-path']}`}
          title={data['data-example-title']}
        ></iframe>
      </div>
      <div className="mt-3 lg:flex justify-between items-center">
        <h3 className="py-1 text-lg font-bold">{data['data-example-title']}</h3>
        <a
          href={data['data-p5-editor']}
          target="_blank"
          rel="noreferrer"
          className="flex items-center text-sm hover:underline"
        >
          Open in p5 Editor
          <FiExternalLink className="ml-1 text-gray-600" />
        </a>
      </div>
    </div>
  );
};

export default Example;
