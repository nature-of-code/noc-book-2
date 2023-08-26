import React from 'react';
import { debounce } from 'lodash-es';
import { FiExternalLink } from 'react-icons/fi';
import {
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineRefresh,
} from 'react-icons/hi';

// Set a height limit for embedded sketch
const EMBED_MAX_HEIGHT = 432;

const Example = (data) => {
  const ref = React.useRef(null);
  const [loaded, setLoaded] = React.useState(false);
  const [isLooping, setIsLooping] = React.useState(!data.pauseAtBeginning);
  const [aspectRatio, setAspectRatio] = React.useState(8 / 3);
  const [canvasWidth, setCanvasWidth] = React.useState(768);

  const adjustFrame = (canvas) => {
    setAspectRatio(canvas.width / canvas.height);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    setLoaded(true);
  };

  const handleLoad = () => {
    if (ref.current) {
      const p5Window = ref.current.contentWindow;
      p5Window.document.body.style.margin = '0';
      p5Window.document.body.style.overflow = 'hidden';

      const p5Canvas = p5Window.document.querySelector('canvas');

      if (data.pauseAtBeginning) {
        p5Window.noLoop();
        setIsLooping(false);
      }

      // if the canvas is already created, adjust it.
      if (p5Canvas) {
        adjustFrame(p5Canvas);
      } else {
        // otherwise, wait for the canvas to be created by p5.js
        const setupFunc = p5Window.setup;
        p5Window.setup = () => {
          setupFunc();
          adjustFrame(p5Window.document.querySelector('canvas'));
        };
      }
    }
  };

  const reset = () => {
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

  // Fix for: iframe's load event triggered before component being mounted
  // reference: https://github.com/facebook/react/issues/6541
  React.useEffect(() => {
    if (ref.current) {
      ref.current.src = `/${data['data-example-path']}`;
    }
  }, [data]);

  const handleWindowResize = () => {
    if (ref.current) {
      setCanvasWidth(ref.current.offsetWidth);
    }
  };

  React.useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', debounce(handleWindowResize, 500));

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  React.useEffect(() => {
    // start and stop the p5 example loop based on visibility
    const curr = ref.current;
    if (!curr || !loaded || !isLooping) return;

    const intersectionCallback = (entries) => {
      const p5Window = curr.contentWindow;
      const [entry] = entries;
      entry.isIntersecting ? p5Window.loop() : p5Window.noLoop();
    };

    const observer = new IntersectionObserver(intersectionCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    });

    observer.observe(curr);

    return () => observer.unobserve(curr);
  }, [ref, isLooping, loaded]);

  return (
    <div
      className="not-prose my-4 clear-both rounded overflow-hidden border bg-gray-100"
      style={{
        maxWidth: EMBED_MAX_HEIGHT * aspectRatio,
      }}
    >
      <div className="bg-white relative rounded-t overflow-hidden">
        <div
          className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${
            loaded ? 'opacity-0' : ' opacity-100'
          }`}
        >
          Loading sketch ...
        </div>
        <iframe
          ref={ref}
          className={`border-none w-full transition-opacity ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            aspectRatio,
          }}
          loading="lazy"
          onLoad={handleLoad}
          src={`/${data['data-example-path']}`}
          title={data['data-example-title']}
        ></iframe>
      </div>

      <div className="flex border-t justify-between items-center">
        <div className="flex">
          <button
            className="flex items-center px-2.5 py-1.5 text-sm hover:bg-gray-200 border-r"
            onClick={reset}
          >
            <HiOutlineRefresh className="h-[15px] w-[15px]" />
            {canvasWidth > 320 && <span className="ml-1.5">Reset</span>}
          </button>

          <button
            className="flex items-center px-2.5 py-1.5 text-sm hover:bg-gray-200 border-r"
            onClick={toggleLoop}
          >
            {isLooping ? (
              <>
                <HiOutlinePause className="h-4 w-4" />
                {canvasWidth > 320 && <span className="ml-1">Pause</span>}
              </>
            ) : (
              <>
                <HiOutlinePlay className="h-4 w-4" />
                {canvasWidth > 320 && <span className="ml-1">Play</span>}
              </>
            )}
          </button>
        </div>

        <a
          href={data['data-p5-editor']}
          target="_blank"
          rel="noreferrer"
          className="px-2.5 flex items-center text-[0.8rem] hover:underline"
        >
          {canvasWidth > 360
            ? 'Open in Web Editor'
            : canvasWidth > 180
            ? 'Web Editor'
            : 'Editor'}
          <FiExternalLink className="ml-1 text-gray-500" />
        </a>
      </div>
    </div>
  );
};

export default Example;
