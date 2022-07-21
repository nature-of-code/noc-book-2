import React from 'react';

export default function Example({ path }) {
  const ref = React.useRef(null);

  const applyStyle = () => {
    if (ref.current) {
      const p5Window = ref.current.contentWindow;
      p5Window.document.body.style.margin = '0';
      p5Window.document.body.style.overflow = 'hidden';
    }
  };

  return (
    <div className="my-8">
      <div className="relative h-[360px] shadow mx-auto">
        <iframe
          ref={ref}
          className="absolute w-full h-full"
          onLoad={applyStyle}
          src={`/examples/${path}`}
          title={path}
        ></iframe>
      </div>
      <div className="py-3 flex justify-between items-center">
        <p className="m-0 font-bold">Example</p>
      </div>
    </div>
  );
}
