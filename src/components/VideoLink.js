import React from 'react';
import { FaYoutube } from 'react-icons/fa';

const VideoLink = (props) => {
  return (
    <div className="ml-6 inline-block">
      <a
        className="group relative flex items-center gap-2 text-base text-noc-400 no-underline"
        href={props['href']}
      >
        <FaYoutube />
        {props['data-title']}

        {props.children && (
          <div className="not-prose absolute top-0 hidden w-80 pt-10 group-hover:block">
            <div className="rounded-lg bg-noc-500 bg-opacity-50 p-4">
              {props.children}
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

export default VideoLink;
