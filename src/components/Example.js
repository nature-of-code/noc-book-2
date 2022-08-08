import React from 'react';
import { FiPlay, FiPause, FiRefreshCw, FiExternalLink } from 'react-icons/fi';

export default function Example(data) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(0);
  const [isLooping, setIsLooping] = React.useState(true);

  const applyStyle = () => {
    if (ref.current) {
      const p5Window = ref.current.contentWindow;
      p5Window.document.body.style.margin = '0';
      p5Window.document.body.style.overflow = 'hidden';

      const p5Canvas = p5Window.document.querySelector('canvas');
      ref.current.style.height = `${p5Canvas.offsetHeight}px`;
      ref.current.style.width = `${p5Canvas.offsetWidth}px`;
      setWidth(p5Canvas.offsetWidth);
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
    <div
      className="my-8"
      style={{
        width: `${width}px`,
      }}
    >
      <h4 className="mb-4 text-lg font-bold">{data['data-example-title']}</h4>
      <iframe
        ref={ref}
        className="shadow"
        onLoad={applyStyle}
        src={`/${data['data-example-path']}`}
        title={data['data-example-title']}
      ></iframe>
      <div className="py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-1" onClick={resetP5}>
            <FiRefreshCw className="h-4 w-4" />
            <span className="ml-2">Reset</span>
          </button>
          {isLooping ? (
            <button className="flex items-center px-1" onClick={toggleLoop}>
              <FiPause className="h-4 w-4" />
              <span className="ml-1">Pause</span>
            </button>
          ) : (
            <button className="flex items-center px-1" onClick={toggleLoop}>
              <FiPlay className="h-4 w-4" />
              <span className="ml-1">Play</span>
            </button>
          )}
        </div>

        <a
          href={data['data-p5-editor']}
          target="_blank"
          rel="noreferrer"
          className="flex items-center text-sm"
        >
          Open in p5 Editor
          <FiExternalLink className="ml-1 text-gray-600" />
        </a>
      </div>
    </div>
  );
}
