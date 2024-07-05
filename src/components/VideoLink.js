import React from 'react';
import { FaYoutube, FaPlay } from 'react-icons/fa';

const VideoLink = (props) => {
  return (
    <div className="inline-block">
      <a
        className="group relative flex items-center gap-2 text-base text-noc-400 no-underline"
        href={props['href']}
        target="_blank"
        rel="noreferrer"
      >
        <FaYoutube />
        {props['data-title']}

        {props.children && (
          <div className="not-prose absolute top-0 hidden w-80 pt-10 group-hover:block">
            <div className="relative rounded-lg bg-noc-400 bg-opacity-50 p-4">
              <div className="overflow-hidden rounded">{props.children}</div>

              <FaPlay className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-noc-400" />
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

export default VideoLink;
